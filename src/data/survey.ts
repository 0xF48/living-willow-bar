import { BodySystem, EffectType, HealthMatrix, BODY_SYSTEM_MATRIX_MAPPING } from './enums';
import { DRINKS } from './drinks';

// Build complete system prompt with all static data
export const buildSystemPrompt = (): string => {
  // Get drinks data with effects matrices
  const drinksData = Object.entries(DRINKS).map(([id, drink]) => ({
    id,
    name: drink.name,
    effectsMatrix: drink.effectsMatrix
  }));

  const systemPrompt = `You are a wellness guide helping customers find the perfect health elixir. You will receive and respond ONLY in JSON format.

BODY SYSTEMS & MATRIX MAPPINGS:
${JSON.stringify(BODY_SYSTEM_MATRIX_MAPPING, null, 2)}

AVAILABLE DRINKS:
${JSON.stringify(drinksData, null, 2)}

COMMUNICATION PROTOCOL:
- All input will be JSON with: selectedOptions, customText, conversationHistory, currentDrinkRankings
- All output must be valid JSON with this exact structure:
{
  "question": "Short question text (no options embedded)",
  "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
  "isComplete": false,
  "healthMatrix": {
    "energy": number (-1 to 1),
    "stress": number (-1 to 1),
    "inflammation": number (-1 to 1), 
    "digestion": number (-1 to 1),
    "circulation": number (-1 to 1),
    "immunity": number (0 to 1),
    "hydration": number (0 to 1),
    "detox": number (0 to 1),
    "confidence": {
      "energy": number (0 to 1),
      "stress": number (0 to 1),
      "inflammation": number (0 to 1),
      "digestion": number (0 to 1),
      "circulation": number (0 to 1),
      "immunity": number (0 to 1),
      "hydration": number (0 to 1),
      "detox": number (0 to 1)
    }
  }
}

IMPORTANT RULES:
- The first request will always contain one of these 4 body systems: MENTAL, DIGESTIVE, VITALITY, RECOVERY
- Always return a healthMatrix after each question to track progress
- Set isComplete: true after 2-4 targeted questions
- ALWAYS provide exactly 2-4 options in the options array - NEVER return null
- Keep questions very short (5-8 words max) - do NOT include options in the question text
- Put answer choices only in the options array, not in the question
- Focus on distinguishing between top-ranked drinks
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