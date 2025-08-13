import { EffectType, HealthMatrix, BODY_SYSTEM_MATRIX_MAPPING, EMPTY_HEALTH_MATRIX, DrinkId } from './enums';
import { DRINKS } from './drinks';
import { AIResponseDataType } from '@/hooks/useSurvey';




const AI_RESPONSE_EXAMPLE: AIResponseDataType = {
  healthMatrix: EMPTY_HEALTH_MATRIX,
  //@ts-ignore
  drinkId: DrinkId.BAOBAB_VITAL_BREW,
  systemMessage: '[you can add a response for developer if you think the system prompt should be revised.]',
  surveyForm: {
    header: 'follow up header text',
    prompt: 'Okay got it. How intense is your stress?',
    options: [
      {
        emoji: '[emoji1]',
        text: 'stressed out',
        hint: 'some optional hint if you think its nessesary'
      },
      {
        emoji: '[emoji2]',
        text: 'somewhat stressed',
      },
      {
        emoji: '[emoji3]',
        text: 'not stressed',
      }
    ]
  }
}

// Build complete system prompt with all static data
export const buildSystemPrompt = (): string => {
  // Get drinks data with effects matrices
  const drinksData = Object.entries(DRINKS).map(([id, drink]) => ({
    id,
    name: drink.name,
    effectsMatrix: drink.effectsMatrix
  }));

  const systemPrompt = `
  Your job is to triage users with the perfect health drink - "elxir" - thats right for them out of the available drinks by giving them a simple survey. 
  You must do this in a smart way to triage to the correct drink based on what the user is feeling in their body / mind.
  Imagine you something like a blend between a doctor and a bartender.
  Each drink has specific effects which are computed from its ingredients.
  These effects form a health matrix that you need to compute with each response.
  The drinks will be matched from the matrix that you compute and suggested to the user.
  !!!Respond ONLY in JSON!!

  BODY SYSTEMS & MATRIX MAPPINGS:
  ${JSON.stringify(BODY_SYSTEM_MATRIX_MAPPING, null, 2)}

  AVAILABLE DRINKS:
  ${JSON.stringify(drinksData, null, 2)}

  RESPONSE EXAMPLE:
  ${JSON.stringify(AI_RESPONSE_EXAMPLE, null, 2)}

  IMPORTANT RULES:
  - If you are certain that there is a particular drink that is the best option, or use is abusing the chat, you may send back "drinkId" instead of "surveyForm" where "drinkId" is id of drink, this will terminate the survey and end the chat.
  - The user is prompted with an interface which will contain a question and options for them to select.
  - They can also chose a custom response.
  - The initial prompt will be something like "Welcome! I'm here to help find your perfect wellness elixir. How are you feeling in your body right now?" and the user will need to select 1 or more out of the 4 available body systems or chose a custom response.
  - You will get data indicating which system, and you can already start computing the health matrix.
  - Users may enter anything they want in the custom response, ignore any responses that are not relevant.
  - Users may ignore the prompt and enter custom text like "what drink gives me most energy", in these scenarios just send back drinkId to terminate the survey
  - Dont do more than 7 survey steps.
  - Always return a healthMatrix after each question, this will be used to rank and suggest the drinks, for example after first response if user selects "MENTAL" body system, you can fill out the health matrix to 
  - ALWAYS provide exactly 2-4 options in the options array - NEVER return null
  - Keep questions short and concise
  - Focus on distinguishing between drinks that you think will best fit based on previous answers
  - Ask about intensity, timing, symptoms, or preferences
  - Example good question: "How intense is your stress?" with options: ["Mild tension", "Moderate anxiety", "High stress", "Overwhelming"]
  - !!!Please respond ONLY in JSON or you will BREAK the APP :)!!!
`;

  // Debug: Log system prompt
  console.log('=== SYSTEM PROMPT (BUILT IN SURVEY.TS) ===');
  console.log(systemPrompt);
  console.log('==========================================');

  return systemPrompt;
};

// Helper functions for survey processing
export const calculateDerivedEffects = (matrix: HealthMatrix): void => {
  matrix.mood = matrix.stress * 0.6 + matrix.energy * 0.4;
  matrix.vitality = matrix.energy * 0.4 + matrix.circulation * 0.3 + matrix.detox * 0.3;
  matrix.stamina = matrix.energy * 0.5 + matrix.circulation * 0.3 + matrix.hydration * 0.2;
};

export const getOverallConfidence = (matrix: HealthMatrix): number => {
  const confidenceValues = Object.values(matrix.confidence);
  return confidenceValues.reduce((sum, val) => sum + val, 0) / confidenceValues.length;
};

export const getPrimaryNeed = (matrix: HealthMatrix): EffectType => {
  const effects = [
    { type: EffectType.ENERGY, value: Math.abs(matrix.energy), confidence: matrix.confidence.energy },
    { type: EffectType.STRESS, value: Math.abs(matrix.stress), confidence: matrix.confidence.stress },
    { type: EffectType.INFLAMMATION, value: Math.abs(matrix.inflammation), confidence: matrix.confidence.inflammation },
    { type: EffectType.DIGESTION, value: Math.abs(matrix.digestion), confidence: matrix.confidence.digestion },
    { type: EffectType.CIRCULATION, value: Math.abs(matrix.circulation), confidence: matrix.confidence.circulation },
    { type: EffectType.IMMUNITY, value: matrix.immunity, confidence: matrix.confidence.immunity },
    { type: EffectType.HYDRATION, value: matrix.hydration, confidence: matrix.confidence.hydration },
    { type: EffectType.DETOX, value: matrix.detox, confidence: matrix.confidence.detox }
  ];

  // Weight by both effect strength and confidence
  const weightedEffects = effects.map(effect => ({
    ...effect,
    weightedScore: effect.value * effect.confidence
  }));

  return weightedEffects.sort((a, b) => b.weightedScore - a.weightedScore)[0].type;
};