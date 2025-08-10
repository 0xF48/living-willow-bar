'use client';
import { useState, useCallback, useRef, useEffect } from 'react';
import { calculateDerivedEffects, buildSystemPrompt } from '@/data/survey';
import { DrinkId, ConversationResponse, CONFIG, HealthMatrix, BodySystems, SurveyOption, OptionType, WELCOME_QUESTIONS, BodySystemType, WELCOME_TITLES, BODY_SYSTEM_MATRIX_MAPPING, BodySystem, AI_CONFIG } from '@/data/enums';
import { calculateDrinkMatch, DRINKS } from '@/data/drinks';
import _ from 'lodash'

// Global state to persist across component unmounts/remounts
let persistedSurveyState: {
  currentQuestion: string;
  currentOptions: SurveyOption[];
  currentTitle: string;
  textResponse: string;
  conversation: ConversationResponse[];
  healthMatrix: HealthMatrix | null;
  accumulatedMatrix: HealthMatrix | null;
  recommendedDrink: DrinkId | null;
  isLoading: boolean;
  error: string | null;
  conversationComplete: boolean;
  sessionStarted: boolean;
  sortedDrinks: { drinkId: DrinkId, score: number }[];
  aiMessages: Array<{ role: 'user' | 'assistant', content: string }>;
  sessionId: string;
  startTime: number;
} | null = null;


interface UseSurveyReturn {
  currentQuestion: string;
  currentTitle: string,
  currentOptions: SurveyOption[];
  sortedDrinks: { drinkId: DrinkId, score: number }[];
  isLoading: boolean;
  error: string | null;
  conversation: ConversationResponse[];
  conversationComplete: boolean;
  recommendedDrink: DrinkId | null;
  toggleCurrentOptionSelect: (optionId: string) => void;
  setCurrentTextResponse: (text: string) => void;
  submitResponse: () => void;
  resetSurvey: () => void;
}




function startQuestion() {
  return WELCOME_QUESTIONS[0] // Use first question to avoid hydration mismatch
}





function startOptions(): SurveyOption[] {
  return Object.keys(BodySystems).map((key: any) => {

    //@ts-ignore
    const bodySystem = BodySystems[key] as BodySystemType

    return {
      id: key,
      type: OptionType.BODY_SYSTEM,
      title: bodySystem.title,
      description: bodySystem.description,
      icon: bodySystem.emoji,
      selected: false
    }
  })

}

function startTitle() {
  return WELCOME_TITLES[0] // Use first title to avoid hydration mismatch
}






export function useSurvey(): UseSurveyReturn {
  // Initialize state from persisted state or defaults
  const [currentQuestion, setCurrentQuestion] = useState<string>(() =>
    persistedSurveyState?.currentQuestion ?? startQuestion());
  const [currentOptions, setCurrentOptions] = useState<SurveyOption[]>(() =>
    persistedSurveyState?.currentOptions ?? startOptions())
  const [currentTitle, setCurrentTitle] = useState<string>(() =>
    persistedSurveyState?.currentTitle ?? startTitle())
  const [textResponse, setTextResponse] = useState<string>(() =>
    persistedSurveyState?.textResponse ?? '')

  const [conversation, setConversation] = useState<ConversationResponse[]>(() =>
    persistedSurveyState?.conversation ?? []);
  const [healthMatrix, setHealthMatrix] = useState<HealthMatrix | null>(() =>
    persistedSurveyState?.healthMatrix ?? null);
  const [accumulatedMatrix, setAccumulatedMatrix] = useState<HealthMatrix | null>(() =>
    persistedSurveyState?.accumulatedMatrix ?? null);
  const [recommendedDrink, setRecommendedDrink] = useState<DrinkId | null>(() =>
    persistedSurveyState?.recommendedDrink ?? null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(() =>
    persistedSurveyState?.error ?? null);
  const [conversationComplete, setConversationComplete] = useState(() =>
    persistedSurveyState?.conversationComplete ?? false);
  const [sessionStarted, setSessionStarted] = useState(() =>
    persistedSurveyState?.sessionStarted ?? false);

  const [sortedDrinks, setSortedDrinks] = useState<{ drinkId: DrinkId, score: number }[]>(() =>
    persistedSurveyState?.sortedDrinks ?? [])

  // Refs
  const sessionId = useRef<string>(persistedSurveyState?.sessionId ?? '');
  const startTime = useRef<number>(persistedSurveyState?.startTime ?? 0);
  const aiMessages = useRef<Array<{ role: 'user' | 'assistant', content: string }>>(persistedSurveyState?.aiMessages ?? []);

  // Persist state changes
  useEffect(() => {
    persistedSurveyState = {
      currentQuestion,
      currentOptions,
      currentTitle,
      textResponse,
      conversation,
      healthMatrix,
      accumulatedMatrix,
      recommendedDrink,
      isLoading,
      error,
      conversationComplete,
      sessionStarted,
      sortedDrinks,
      aiMessages: aiMessages.current,
      sessionId: sessionId.current,
      startTime: startTime.current,
    };
  }, [currentQuestion, currentOptions, currentTitle, textResponse, conversation, healthMatrix, accumulatedMatrix, recommendedDrink, isLoading, error, conversationComplete, sessionStarted, sortedDrinks]);

  const toggleCurrentOptionSelect = (id: string) => {
    const i = _.findIndex(currentOptions, { id })

    currentOptions[i] = {
      ...currentOptions[i],
      selected: !currentOptions[i].selected
    }

    setCurrentOptions(currentOptions.concat([]))
  }


  const setCurrentTextResponse = (text: string) => {
    setTextResponse(text)
  }


  // Call Claude API through Next.js API route
  const callClaudeAPI = async (messages: any[], systemPrompt: string): Promise<string> => {
    const response = await fetch('/api/survey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages, systemPrompt })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.response;
  };

  // Helper function to validate health matrix structure
  const validateHealthMatrix = (matrix: any): matrix is HealthMatrix => {
    const requiredFields = ['energy', 'stress', 'inflammation', 'digestion', 'circulation', 'immunity', 'hydration', 'detox'];
    const confidenceFields = ['energy', 'stress', 'inflammation', 'digestion', 'circulation', 'immunity', 'hydration', 'detox'];

    if (!matrix || typeof matrix !== 'object') return false;

    // Check main fields
    for (const field of requiredFields) {
      if (typeof matrix[field] !== 'number') return false;
    }

    // Check confidence object
    if (!matrix.confidence || typeof matrix.confidence !== 'object') return false;
    for (const field of confidenceFields) {
      if (typeof matrix.confidence[field] !== 'number') return false;
    }

    return true;
  };

  // Rank all drinks based on accumulated health matrix
  const rankDrinks = (matrix: HealthMatrix): { drinkId: DrinkId, score: number }[] => {
    // Convert health matrix to effects array format
    const healthArray: [number, number, number, number, number, number, number, number] = [
      matrix.energy,
      matrix.stress,
      matrix.inflammation,
      matrix.digestion,
      matrix.circulation,
      matrix.immunity,
      matrix.hydration,
      matrix.detox
    ];

    // Calculate match scores for all drinks
    const drinkScores = Object.values(DrinkId).map(drinkId => ({
      drinkId,
      score: calculateDrinkMatch(drinkId, healthArray)
    }));

    // Sort by score descending
    drinkScores.sort((a, b) => b.score - a.score);
    return drinkScores;
  };

  // Get top recommendation
  const recommendDrink = (matrix: HealthMatrix): DrinkId => {
    const rankedDrinks = rankDrinks(matrix);
    return rankedDrinks[0].drinkId;
  };


  // Submit response
  const submitResponse = useCallback(async () => {
    // Start session if not already started
    if (!sessionStarted) {
      setSessionStarted(true);
      startTime.current = Date.now();
    }

    if (conversationComplete) return;

    setIsLoading(true);
    setError(null);

    try {
      // Check session timeout
      const elapsed = (Date.now() - startTime.current); // milliseconds
      if (elapsed > CONFIG.SURVEY_MAX_DURATION) {
        throw new Error('Session timeout - please start a new survey');
      }

      // Check question limit
      if (conversation.length >= CONFIG.SURVEY_MAX_QUESTIONS) {
        setConversationComplete(true);
        setIsLoading(false);
        return;
      }

      // Collect selected options and custom text
      const selectedOptions = currentOptions.filter(opt => opt.selected);
      const selectedTitles = selectedOptions.map(opt => opt.title);
      const hasCustomText = textResponse.trim().length > 0;

      // Build combined response string
      let combinedResponse = '';
      if (selectedTitles.length > 0) {
        combinedResponse = selectedTitles.join(', ');
      }
      if (hasCustomText) {
        combinedResponse += (combinedResponse ? '. ' : '') + textResponse.trim();
      }

      // Add current response to conversation
      const newConversationItem: ConversationResponse = {
        question: currentQuestion,
        answer: combinedResponse,
        questionType: 'open'
      };

      const updatedConversation = [...conversation, newConversationItem];
      setConversation(updatedConversation);

      // Prepare JSON data for AI request (only user response data)
      const requestData = {
        selectedOptions: selectedTitles,
        customText: hasCustomText ? textResponse.trim() : null,
        conversationHistory: updatedConversation,
        currentDrinkRankings: sortedDrinks.slice(0, 5).map(drink => ({
          drinkId: drink.drinkId,
          name: drink.drinkId.replace(/-/g, ' '),
          score: drink.score
        }))
      };

      // Debug: Log AI input JSON
      console.log('=== AI INPUT JSON ===');
      console.log('Request Data:', JSON.stringify(requestData, null, 2));
      console.log('=====================');

      // Add current user message to conversation history
      const currentUserMessage = {
        role: 'user' as const,
        content: JSON.stringify(requestData)
      };

      aiMessages.current.push(currentUserMessage);

      // Debug: Log full conversation history being sent
      console.log('=== AI MESSAGES HISTORY ===');
      console.log('Messages being sent:', JSON.stringify(aiMessages.current, null, 2));
      console.log('===========================');

      // Call Claude API with full conversation history
      const systemPrompt = buildSystemPrompt();
      const aiResponseText = await callClaudeAPI(aiMessages.current, systemPrompt);

      // Parse JSON response with error handling
      let aiResponse;
      try {
        aiResponse = JSON.parse(aiResponseText);
        console.log('=== AI OUTPUT JSON ===');
        console.log('Parsed Response:', aiResponse);
        console.log('======================');
      } catch (parseError) {
        console.error('=== JSON PARSE ERROR ===');
        console.error('Parse Error:', parseError);
        console.error('Raw AI Response:', aiResponseText);
        console.error('========================');
        throw new Error(`AI response is not valid JSON: ${aiResponseText}`);
      }

      // Add AI's response to conversation history
      const aiResponseMessage = {
        role: 'assistant' as const,
        content: aiResponseText
      };

      aiMessages.current.push(aiResponseMessage);

      // Process AI response
      const healthMatrix = aiResponse.healthMatrix;
      if (!healthMatrix || !validateHealthMatrix(healthMatrix)) {
        throw new Error('AI response missing or invalid healthMatrix');
      }

      // Update health matrix and rank drinks
      setHealthMatrix(healthMatrix);
      setAccumulatedMatrix(healthMatrix);

      // Rank drinks based on current matrix
      const rankedDrinks = rankDrinks(healthMatrix);
      setSortedDrinks(rankedDrinks);

      // Set next question
      setCurrentQuestion(aiResponse.question || 'Thank you for completing the assessment!');

      // Check if conversation is complete
      if (aiResponse.isComplete) {
        const drink = recommendDrink(healthMatrix);
        setRecommendedDrink(drink);
        setConversationComplete(true);
      } else {
        // Handle follow-up question options
        if (aiResponse.options && aiResponse.options.length > 0) {
          // AI provided specific options - convert to SurveyOption format
          const aiOptions: SurveyOption[] = aiResponse.options.map((option: string, index: number) => ({
            id: `AI_OPTION_${index}`,
            type: OptionType.SELECTED_ANSWER,
            title: option,
            icon: ['🤔', '💭', '✨', '🎯', '💡'][index % 5],
            selected: false
          }));

          console.log('Using AI-provided options:', aiOptions);
          setCurrentOptions(aiOptions);
        } else {
          // No options provided - clear for open text input
          console.log('No AI options provided - using open text input');
          setCurrentOptions([]);
        }

        // Clear text response
        setTextResponse('');
        // Update title for follow-up question
        setCurrentTitle('Follow-up Question');
      }

    } catch (error) {
      console.error('Survey error:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [currentQuestion, currentOptions, textResponse, conversation, conversationComplete, sessionStarted, sortedDrinks]);

  // Reset survey
  const resetSurvey = useCallback(() => {
    setCurrentQuestion(startQuestion());
    setCurrentOptions(startOptions());
    setCurrentTitle(startTitle());
    setTextResponse('');
    setConversation([]);
    setHealthMatrix(null);
    setAccumulatedMatrix(null);
    setRecommendedDrink(null);
    setError(null);
    setConversationComplete(false);
    setSessionStarted(false);
    setSortedDrinks([]);
    sessionId.current = '';
    startTime.current = 0;
    aiMessages.current = [];
    // Clear persisted state
    persistedSurveyState = null;
  }, []);

  return {
    currentQuestion,
    currentOptions,
    currentTitle,
    sortedDrinks,
    isLoading,
    error,
    conversation,
    conversationComplete,
    recommendedDrink,
    toggleCurrentOptionSelect,
    setCurrentTextResponse,
    resetSurvey,
    submitResponse

  };
}