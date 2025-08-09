'use client';
import { useState, useCallback, useRef } from 'react';
import { calculateDerivedEffects } from '@/data/survey';
import { DrinkId, ConversationResponse, CONFIG, HealthMatrix, BodySystems, SurveyOption, OptionType, WELCOME_QUESTIONS, BodySystemType, WELCOME_TITLES } from '@/data/enums';
import { calculateDrinkMatch } from '@/data/drinks';
import _ from 'lodash'


interface UseSurveyReturn {
  currentQuestion: string;
  currentTitle: string,
  currentOptions: SurveyOption[];
  sortedDrinks: DrinkId[] | null;
  isLoading: boolean;
  error: string | null;
  toggleCurrentOptionSelect: (optionId: string) => void;
  setCurrentTextResponse: (text: string) => void;
  submitResponse: () => void;
  resetSurvey: () => void;
}




function startQuestion() {
  return WELCOME_QUESTIONS[Math.floor(Math.random() * WELCOME_QUESTIONS.length)]
}





function startOptions(): SurveyOption[] {
  return Object.keys(BodySystems).map((key: any) => {


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
  return WELCOME_TITLES[Math.floor(Math.random() * WELCOME_TITLES.length)]
}






export function useSurvey(): UseSurveyReturn {
  // State


  const [currentQuestion, setCurrentQuestion] = useState<string>(startQuestion);
  const [currentOptions, setCurrentOptions] = useState<SurveyOption[]>(startOptions)
  const [currentTitle, setCurrentTitle] = useState<string>(startTitle)
  const [tsextResponse, setTextResponse] = useState<string>('')


  const [conversation, setConversation] = useState<ConversationResponse[]>([]);
  const [healthMatrix, setHealthMatrix] = useState<HealthMatrix | null>(null);
  const [recommendedDrink, setRecommendedDrink] = useState<DrinkId | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationComplete, setConversationComplete] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);

  const [sortedDrinks, setSortedDrinks] = useState([])

  const toggleCurrentOptionSelect = (id: string) => {
    const i = _.findIndex(currentOptions, { id })

    currentOptions[i] = {
      ...currentOptions[i],
      selected: !currentOptions[i].selected
    }

    setCurrentOptions(currentOptions.concat([]))
  }


  const setCurrentTextResponse = (text: string) => {

  }

  // Refs
  const sessionId = useRef<string>('');
  const startTime = useRef<number>(0);

  // Call Claude API through Next.js API route
  const callClaudeAPI = async (messages: any[]): Promise<string> => {
    const response = await fetch('/api/survey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.response;
  };

  // Parse AI response for health matrix
  const parseHealthMatrix = (aiResponse: string): HealthMatrix | null => {
    try {
      const analysisMatch = aiResponse.match(/\[ANALYSIS\]([\s\S]*?)$/);
      if (!analysisMatch) return null;

      const analysisText = analysisMatch[1].trim();
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) return null;

      const parsed = JSON.parse(jsonMatch[0]);

      const matrix: HealthMatrix = {
        energy: parsed.energy || 0,
        stress: parsed.stress || 0,
        inflammation: parsed.inflammation || 0,
        digestion: parsed.digestion || 0,
        circulation: parsed.circulation || 0,
        immunity: parsed.immunity || 0,
        hydration: parsed.hydration || 0,
        detox: parsed.detox || 0,
        confidence: {
          energy: parsed.confidence?.energy || 0,
          stress: parsed.confidence?.stress || 0,
          inflammation: parsed.confidence?.inflammation || 0,
          digestion: parsed.confidence?.digestion || 0,
          circulation: parsed.confidence?.circulation || 0,
          immunity: parsed.confidence?.immunity || 0,
          hydration: parsed.confidence?.hydration || 0,
          detox: parsed.confidence?.detox || 0,
        }
      };

      calculateDerivedEffects(matrix);
      return matrix;
    } catch (error) {
      console.error('Failed to parse health matrix:', error);
      return null;
    }
  };

  // Recommend drink based on health matrix using effects matching
  const recommendDrink = (matrix: HealthMatrix): DrinkId => {
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

    // Sort by score and return best match
    drinkScores.sort((a, b) => b.score - a.score);
    return drinkScores[0].drinkId;
  };

  // Submit response
  const submitResponse = useCallback(async () => {
    if (!sessionStarted || conversationComplete) return;

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

      // Add current response to conversation
      const newConversationItem: ConversationResponse = {
        question: currentQuestion,
        answer: response,
        questionType: isMultipleChoice ? 'multiple_choice' : 'open'
      };

      const updatedConversation = [...conversation, newConversationItem];
      setConversation(updatedConversation);

      // Build messages for Claude API
      const messages = [
        {
          role: 'user',
          content: `Question ${updatedConversation.length}: "${currentQuestion}"\nUser Response: "${response}"\n\nConversation history: ${JSON.stringify(updatedConversation.slice(-3))}\n\nPlease ask the next question or complete the assessment if you have enough information.`
        }
      ];

      // Call Claude API
      const aiResponse = await callClaudeAPI(messages);

      // Parse health matrix if conversation is complete
      const parsedMatrix = parseHealthMatrix(aiResponse);
      if (parsedMatrix) {
        setHealthMatrix(parsedMatrix);
        const drink = recommendDrink(parsedMatrix);
        setRecommendedDrink(drink);
        setConversationComplete(true);
      }

      // Extract next question (remove [ANALYSIS] section)
      const nextQuestion = aiResponse.split('[ANALYSIS]')[0].trim();
      setCurrentQuestion(nextQuestion || 'Thank you for completing the assessment!');

    } catch (error) {
      console.error('Survey error:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [currentQuestion, conversation, conversationComplete, sessionStarted]);

  // Reset survey
  const resetSurvey = useCallback(() => {
    setCurrentQuestion('');
    setConversation([]);
    setHealthMatrix(null);
    setRecommendedDrink(null);
    setError(null);
    setConversationComplete(false);
    setSessionStarted(false);
    sessionId.current = '';
    startTime.current = 0;
  }, []);

  return {
    currentQuestion,
    currentOptions,
    currentTitle,
    sortedDrinks,
    isLoading,
    error,
    toggleCurrentOptionSelect,
    setCurrentTextResponse,
    resetSurvey,
    submitResponse

  };
}