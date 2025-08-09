import { BodySystem, EffectType } from './enums';

// Survey response interface for AI-driven conversations
export interface SurveyResponse {
  sessionId: string;
  timestamp: number;
  responses: ConversationResponse[];
  healthMatrix: HealthMatrix;
  recommendedDrink?: string;
  conversationComplete: boolean;
}

// Individual conversation exchange
export interface ConversationResponse {
  question: string;
  answer: string;
  questionType: 'open' | 'multiple_choice';
  options?: string[];
  aiAnalysis?: string; // AI's interpretation of the response
}

// Health matrix derived from conversation
export interface HealthMatrix {
  // Core regulatory effects (-1 to 1)
  energy: number;        // CNS stimulation/sedation
  stress: number;        // HPA axis calm/anxiety
  inflammation: number;  // anti/pro inflammatory
  digestion: number;     // gut stimulation/suppression  
  circulation: number;   // vasodilation/constriction
  
  // Core support effects (0 to 1)
  immunity: number;      // immune system support
  hydration: number;     // fluid/electrolyte needs
  detox: number;         // detoxification support
  
  // Derived effects (calculated)
  mood?: number;         // stress * 0.6 + energy * 0.4
  vitality?: number;     // energy * 0.4 + circulation * 0.3 + detox * 0.3
  stamina?: number;      // energy * 0.5 + circulation * 0.3 + hydration * 0.2
  
  // Confidence scores for each effect (0-1)
  confidence: {
    energy: number;
    stress: number;
    inflammation: number;
    digestion: number;
    circulation: number;
    immunity: number;
    hydration: number;
    detox: number;
  };
}

// Survey session configuration
export interface SurveyConfig {
  maxQuestions: number;        // Maximum questions per session (default: 7)
  maxDuration: number;         // Maximum duration in minutes (default: 5)
  minConfidence: number;       // Minimum confidence to make recommendation (default: 0.6)
  systemMapping: Record<BodySystem, EffectType[]>; // Body system to effects mapping
}

// Default survey configuration
export const DEFAULT_SURVEY_CONFIG: SurveyConfig = {
  maxQuestions: 7,
  maxDuration: 5,
  minConfidence: 0.6,
  systemMapping: {
    [BodySystem.MENTAL]: [EffectType.ENERGY, EffectType.STRESS],
    [BodySystem.DIGESTIVE]: [EffectType.DIGESTION],
    [BodySystem.VITALITY]: [EffectType.ENERGY, EffectType.CIRCULATION, EffectType.IMMUNITY],
    [BodySystem.RECOVERY]: [EffectType.HYDRATION, EffectType.DETOX, EffectType.INFLAMMATION]
  }
};

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