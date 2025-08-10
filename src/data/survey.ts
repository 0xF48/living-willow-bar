import { BodySystem, EffectType, HealthMatrix, BODY_SYSTEM_MATRIX_MAPPING, EMPTY_HEALTH_MATRIX } from './enums';
import { DRINKS } from './drinks';
import { AIResponseDataType } from '@/hooks/useSurvey';



const AI_RESPONSE_EXAMPLE: AIResponseDataType = {
  healthMatrix: EMPTY_HEALTH_MATRIX,
  surveyForm: {
    header: 'follow up',
    prompt: 'How intense is your stress?',
    options: [
      {
        emoji: '[emoji1]',
        text: 'option A',
        hint: 'a hint'
      },
      {
        emoji: '[emoji2]',
        text: 'option B',
        hint: 'a hint'
      },
      {
        emoji: '[emoji3]',
        text: 'option C',
        hint: 'a hint'
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

  const systemPrompt = `You are a wellness guide helping customers find the perfect health elixir. You will respond ONLY in JSON format.

BODY SYSTEMS & MATRIX MAPPINGS:
${JSON.stringify(BODY_SYSTEM_MATRIX_MAPPING, null, 2)}

AVAILABLE DRINKS:
${JSON.stringify(drinksData, null, 2)}

JSON RESPONSE FORMAT EXAMPLE:
${JSON.stringify(AI_RESPONSE_EXAMPLE, null, 2)}

IMPORTANT RULES:
- input will be sent as mixed.
- JSON output format should be as follows:
- Always return a healthMatrix after each question to track progress
- ALWAYS provide exactly 2-4 options in the options array - NEVER return null
- Keep questions short and concise
- Put answer choices only in the options array, not in the question
- Focus on distinguishing between drinks that you think will best fit based on previous answers
- Ask about intensity, timing, symptoms, or preferences
- Example good question: "How intense is your stress?" with options: ["Mild tension", "Moderate anxiety", "High stress", "Overwhelming"]`;

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