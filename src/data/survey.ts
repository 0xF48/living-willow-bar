import { BodySystem, EffectType, HealthMatrix } from './enums';

// Sample conversation starters by category
export const CONVERSATION_STARTERS = {
  welcome: [
    "Welcome! I'm here to help find your perfect wellness elixir. How are you feeling in your body right now?",
    "Hi! I'm your wellness guide. What's bringing you here today - what would you like support with?",
    "Hello! Let's find an elixir that matches your current needs. How would you describe your energy and mood today?"
  ],

  followUp: {
    stress: [
      "On a scale of overwhelming to manageable, how would you describe your stress level?",
      "What's contributing most to your stress right now - work, relationships, or physical tension?",
      "Do you feel more mentally anxious or physically tense?"
    ],

    energy: [
      "Is this more of a tired-but-wired feeling, or genuinely low energy?",
      "When did you last feel truly energized and alert?",
      "Are you looking for gentle sustained energy or a more noticeable boost?"
    ],

    digestion: [
      "Is this more like bloating and discomfort, or sharp pain and nausea?",
      "Does this happen after meals, or is it more constant throughout the day?",
      "Are you looking for something soothing or something to stimulate digestion?"
    ],

    physical: [
      "Is this more about cardiovascular stamina or muscular endurance?",
      "Do you feel like you need better circulation or more overall vitality?",
      "Are you experiencing any stiffness or inflammation alongside the fatigue?"
    ]
  }
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