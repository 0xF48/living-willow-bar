'use client';
import { useState, useCallback, useRef, createContext, ReactNode, useContext } from 'react';
import { buildSystemPrompt } from '@/data/survey';
import { DrinkId, ConversationResponse, CONFIG, HealthMatrix, BodySystems, SurveyOption, OptionType, BodySystemType, ENTRY_HEADERS, ENTRY_PROMPTS } from '@/data/enums';
import { calculateDrinkMatch, DrinkData, DRINKS, getDrink } from '@/data/drinks';
import _ from 'lodash'
import { randomItem } from './util';



export interface UseSurveyReturn {
  currentForm: SurveyForm,
  submitForm: (response: SurveyResponse) => void;
  responseList: SurveyResponse[];
  isLoading: boolean;
  error: string | null;
  healthMatrix: HealthMatrix | null;
  resetSurvey: () => void;
}



export interface AIResponseDataType {
  surveyForm: SurveyForm,
  healthMatrix: HealthMatrix
}





function entryForm(): SurveyForm {
  return {
    header: randomItem(ENTRY_HEADERS),
    prompt: randomItem(ENTRY_PROMPTS),
    options: Object.keys(BodySystems).map((key: any) => {
      //@ts-ignore
      const bodySystem = BodySystems[key]
      return {
        text: bodySystem.title,
        hint: bodySystem.description,
        emoji: bodySystem.emoji
      }
    })
  }
}

const ENTRY_FORM = entryForm()
export type DrinkRanking = { drinkId: DrinkId, score: number }

// Rank all drinks based on accumulated health matrix
export const rankDrinks = (matrix: HealthMatrix | null): DrinkRanking[] => {

  if (!matrix) {
    return Object.values(DrinkId).map(drinkId => ({
      drinkId,
      score: 0
    }))
  }

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

export const sortDrinks = (matrix: HealthMatrix) => {
  if (!matrix) {
    return DRINKS
  }
}



export type SurveyResponse = {
  prompt: string,
  response: string
}


export type SurveyForm = {
  header: string,
  prompt: string,
  options: SurveyOption[],
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



function formatResponseListIntoMessages(responseList: SurveyResponse[]): any[] {
  let messages: any[] = []
  responseList.forEach(({ response, prompt }) => {
    messages.push({
      role: "assistant",
      content: prompt
    })
    messages.push({
      role: "user",
      content: response
    })
  })

  return messages
}

export function useSurveyInternal(): UseSurveyReturn {

  const [healthMatrix, setHealthMatrix] = useState<HealthMatrix | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [responseList, setResponseList] = useState<SurveyResponse[]>([])
  const [currentForm, setCurrentForm] = useState<SurveyForm>(ENTRY_FORM)


  const submitForm = useCallback(async (response: SurveyResponse) => {

    setIsLoading(true);
    setError(null);

    try {

      // Check question limit
      if (responseList.length >= CONFIG.SURVEY_MAX_QUESTIONS) {
        setIsLoading(false);
        return;
      }

      const newResponseList = responseList.concat([response])

      // Debug: Log AI input JSON
      console.log('=== newResponseList ===');
      console.log(newResponseList);
      console.log('=====================');


      setResponseList(newResponseList)

      // Call Claude API with full conversation history
      const systemPrompt = buildSystemPrompt();

      console.log('=== newResponseList formatted ===');
      console.log(formatResponseListIntoMessages(newResponseList));
      console.log('=====================');

      const aiResponseText = await callClaudeAPI(formatResponseListIntoMessages(newResponseList), systemPrompt);

      // Parse JSON response with error handling
      let aiResponse: AIResponseDataType
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

      setCurrentForm(aiResponse.surveyForm)

      // Process AI response
      const healthMatrix = aiResponse.healthMatrix;
      console.log('=== AI HEALTH MATRIX ===');
      console.log('Health Matrix:', healthMatrix);
      console.log('========================');

      if (!healthMatrix || !validateHealthMatrix(healthMatrix)) {
        console.error('Invalid health matrix:', healthMatrix);
        throw new Error('AI response missing or invalid healthMatrix');
      }

      setHealthMatrix(healthMatrix)


    } catch (error) {
      console.error('Survey error:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [responseList]);



  // Reset survey
  const resetSurvey = useCallback(() => {
    setHealthMatrix(null);
    setCurrentForm(ENTRY_FORM);
    setError(null);
    setResponseList([])
  }, []);


  return {
    currentForm,
    submitForm,
    responseList,
    healthMatrix,
    isLoading,
    error,
    resetSurvey
  };
}



export const computeMatchCount = (healthMatrix: HealthMatrix | null) => {
  if (healthMatrix == null) {
    return 0
  }
  return rankDrinks(healthMatrix).filter(({ score }) => {
    return score > CONFIG.DRINK_MATCH_THRESHOLD
  }).length

}


export const computeTopMatch = (healthMatrix: HealthMatrix | null): DrinkRanking | null => {
  if (healthMatrix == null) {
    return null
  }
  const rankedDrinks = rankDrinks(healthMatrix);
  return rankedDrinks[0]
}


const SurveyContext = createContext<UseSurveyReturn | undefined>(undefined);


export function SurveyProvider({ children }: { children: ReactNode }) {
  const survey = useSurveyInternal()
  return <SurveyContext.Provider value={survey}>
    {children}
  </SurveyContext.Provider>
}


export function useSurvey(): UseSurveyReturn {
  const context = useContext(SurveyContext);
  if (context === undefined) {
    throw new Error('useSurvey must be used within an SurveyProvider');
  }
  return context;
}