export enum CONFIG {
  SURVEY_MAX_QUESTIONS = 7,  // Maximum questions per session (default: 7)
  SURVEY_MAX_DURATION = 300000, // 5 minutes in milliseconds
  SURVEY_MIN_CONFIDENCE = 0.6,
  DRINK_MATCH_THRESHOLD = 0.3, // Minimum score to show as match
  ROUNDED = 'rounded-2xl'
}

export enum STYLE {
  BUTTON = CONFIG.ROUNDED + ' flex items-center justify-center gap-2 transition-shadow transision-colors p-4 px-6 hover:ring-4 min-h-16',
  BUTTON_DISABLED = 'bg-gray-300 text-gray-500 cursor-not-allowed !ring-0',
  BUTTON_ENABLED = 'cursor-pointer',
  BUTTON_LOADING = 'bg-gray-400 text-white cursor-wait !ring-0',
  BLACK = STYLE.BUTTON_ENABLED + ' bg-black text-white ring-black/20',
  SLATE = STYLE.BUTTON_ENABLED + ' bg-slate-50 ring-yellow-200 text-black hover:bg-yellow-50',
  SLATE_SELECTED = STYLE.BUTTON_ENABLED + ' bg-yellow-100 ring-yellow-300 ring-4 text-black ',
  BLUE = STYLE.BUTTON_ENABLED + ' bg-blue-500 text-white ring-blue-200',
  BUTTON_BLUE_SHADOW = 'drop-shadow shadow-xl shadow-blue-200',
  ORANGE = STYLE.BUTTON_ENABLED + ' bg-orange-300 text-black ring-orange-200',
  YELLOW = STYLE.BUTTON_ENABLED + ' ring-yellow-400 ring-3 bg-yellow-200'
}

export const ENTRY_PROMPTS = [
  "Welcome! I'm here to help find your perfect wellness elixir. How are you feeling in your body right now?",
  "Hi! I'm your wellness guide. What's bringing you here today - what would you like support with?",
  "Hello! Let's find an elixir that matches your current needs. How would you describe your energy and mood today?"
]

export const ENTRY_HEADERS = [
  'Welcome!',
  'Hey There!'
]


// Ingredient enum for all elixir ingredients
export enum Ingredient {
  // Base ingredients
  CACAO = 'cacao',
  OAT_MILK = 'oat-milk',
  YERBA_MATE = 'yerba-mate',
  BAOBAB = 'baobab',
  BEET_KVASS = 'beet-kvass',
  GREEN_TEA = 'green-tea',
  COCONUT_WATER = 'coconut-water',
  GINGER_FIZZ = 'ginger-fizz',
  MINERAL_WATER = 'mineral-water',

  // Spices
  CHILTEPIN = 'chiltepin',
  ANNATTO = 'annatto',
  ALLSPICE = 'allspice',
  VANILLA = 'vanilla',

  // Sweeteners
  PILONCILLO = 'piloncillo',
  AGAVE = 'agave',

  // Minerals/Salts
  MAYAN_SUN_SALT = 'mayan-sun-salt',
  BOLIVIAN_ROSE_SALT = 'bolivian-rose-salt',
  SRI_LANKAN_BLACK_SALT = 'sri-lankan-black-salt',

  // Herbs
  LEMONGRASS = 'lemongrass',
  CITRUS_PEEL = 'citrus-peel',
  PANDAN_LEAF = 'pandan-leaf',
  NETTLE = 'nettle',
  SPRUCE_TIPS = 'spruce-tips',
  PEPPERMINT = 'peppermint',

  // Roots
  GINGER = 'ginger',
  LICORICE_ROOT = 'licorice-root',

  // Fruits & Berries
  TAMARIND = 'tamarind',
  LEMON_JUICE = 'lemon-juice',
  SCHIZANDRA_BERRY = 'schizandra-berry',
  TART_CHERRY = 'tart-cherry',
  HAWTHORN_BERRIES = 'hawthorn-berries',
  LIME_ZEST = 'lime-zest',
  LINGONBERRY = 'lingonberry',
  JUNIPER_BERRIES = 'juniper-berries',

  // Flowers
  JASMINE_FLOWER = 'jasmine-flower',
  CHRYSANTHEMUM = 'chrysanthemum',
  ROSE_PETALS = 'rose-petals',

  // Seeds
  FENNEL_SEED = 'fennel-seed',

  // Bark
  ASPEN_BARK = 'aspen-bark',

  // Adaptogens (categorized separately as they're special)
  RHODIOLA = 'rhodiola',

  // Boost ingredients (special herbal enhancers)
  ASHWAGANDHA = 'ashwagandha',
  TULSI = 'tulsi',
  MORINGA = 'moringa',
  PURPLE_WILLOW = 'purple-willow',
  KAVA = 'kava',
  GYNOSTEMMA = 'gynostemma',
  CHAGA = 'chaga',
  LEMON_BALM = 'lemon-balm'
}

// Flavor profile types (array indices)
export enum FlavorType {
  SWEET = 0,
  SOUR = 1,
  BITTER = 2,
  SALTY = 3,
  UMAMI = 4,
  SPICY = 5,
  ASTRINGENT = 6,
  AROMATIC = 7,
  EARTHY = 8,
  WOODY = 9
}

// Core effect types (array indices)
export enum EffectType {
  // Regulatory effects (-1 to 1)
  ENERGY = 0,
  STRESS = 1,
  INFLAMMATION = 2,
  DIGESTION = 3,
  CIRCULATION = 4,

  // Support effects (0 to 1)
  IMMUNITY = 5,
  HYDRATION = 6,
  DETOX = 7
}

// Effect mode classification
export enum EffectMode {
  REGULATE, // -1 to 1 scale
  SUPPORT    // 0 to 1 scale
}

// Effect mode mapping
export const EFFECT_MODES: Record<EffectType, EffectMode> = {
  [EffectType.ENERGY]: EffectMode.REGULATE,
  [EffectType.STRESS]: EffectMode.REGULATE,
  [EffectType.INFLAMMATION]: EffectMode.REGULATE,
  [EffectType.DIGESTION]: EffectMode.REGULATE,
  [EffectType.CIRCULATION]: EffectMode.REGULATE,
  [EffectType.IMMUNITY]: EffectMode.SUPPORT,
  [EffectType.HYDRATION]: EffectMode.SUPPORT,
  [EffectType.DETOX]: EffectMode.SUPPORT
}



// Body system categories for survey mapping
export enum BodySystem {
  MENTAL = 'MENTAL',
  DIGESTIVE = 'DIGESTIVE',
  VITALITY = 'VITALITY',
  RECOVERY = 'RECOVERY'
}





export const BodySystems: Record<BodySystem, BodySystemType> = {
  [BodySystem.MENTAL]: {
    title: 'Mental & Emotional',
    description: 'stress, anxiety, focus, or mood',
    emoji: '🧠',
    effects: [EffectType.ENERGY, EffectType.STRESS],
  },
  [BodySystem.DIGESTIVE]: {
    title: 'Digestive & Gut Health',
    description: 'bloating, discomfort, or digestive issues',
    emoji: '🌿',
    effects: [EffectType.DIGESTION, EffectType.INFLAMMATION]
  },
  [BodySystem.VITALITY]: {
    title: 'Physical Energy & Circulation',
    description: 'fatigue, stamina, or feeling sluggish',
    emoji: '❤️',
    effects: [EffectType.ENERGY, EffectType.CIRCULATION, EffectType.IMMUNITY],
  },
  [BodySystem.RECOVERY]: {
    title: 'Recovery & Detox',
    description: 'feeling run down, dehydrated, or needing cleansing',
    emoji: '💧',
    effects: [EffectType.HYDRATION, EffectType.DETOX, EffectType.INFLAMMATION]
  }
}

export const EMPTY_HEALTH_MATRIX: HealthMatrix = {
  energy: 0,
  stress: 0,
  inflammation: 0,
  digestion: 0,
  circulation: 0,
  immunity: 0,
  hydration: 0,
  detox: 0,
  confidence: {
    energy: 0,
    stress: 0,
    inflammation: 0,
    digestion: 0,
    circulation: 0,
    immunity: 0,
    hydration: 0,
    detox: 0,
  }
}

// Body system to health matrix mapping
export const BODY_SYSTEM_MATRIX_MAPPING = {
  [BodySystem.MENTAL]: {
    energy: 0.3,
    stress: 0.7,
    inflammation: 0,
    digestion: 0,
    circulation: 0,
    immunity: 0,
    hydration: 0,
    detox: 0,
    confidence: {
      energy: 0.6,
      stress: 0.8,
      inflammation: 0.3,
      digestion: 0.3,
      circulation: 0.3,
      immunity: 0.3,
      hydration: 0.3,
      detox: 0.3,
    }
  },
  [BodySystem.DIGESTIVE]: {
    energy: 0,
    stress: 0,
    inflammation: 0.5,
    digestion: 0.7,
    circulation: 0,
    immunity: 0,
    hydration: 0,
    detox: 0,
    confidence: {
      energy: 0.3,
      stress: 0.3,
      inflammation: 0.7,
      digestion: 0.8,
      circulation: 0.3,
      immunity: 0.3,
      hydration: 0.3,
      detox: 0.3,
    }
  },
  [BodySystem.VITALITY]: {
    energy: 0.6,
    stress: 0,
    inflammation: 0,
    digestion: 0,
    circulation: 0.6,
    immunity: 0.4,
    hydration: 0,
    detox: 0,
    confidence: {
      energy: 0.8,
      stress: 0.3,
      inflammation: 0.3,
      digestion: 0.3,
      circulation: 0.7,
      immunity: 0.6,
      hydration: 0.3,
      detox: 0.3,
    }
  },
  [BodySystem.RECOVERY]: {
    energy: 0,
    stress: 0,
    inflammation: 0.4,
    digestion: 0,
    circulation: 0,
    immunity: 0,
    hydration: 0.6,
    detox: 0.5,
    confidence: {
      energy: 0.3,
      stress: 0.3,
      inflammation: 0.6,
      digestion: 0.3,
      circulation: 0.3,
      immunity: 0.3,
      hydration: 0.8,
      detox: 0.7,
    }
  }
}

export type BodySystemType = {
  title: string;
  emoji: string;
  description: string;
  effects: EffectType[];
}

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
  maxQuestions: number;
  maxDuration: number;         // Maximum duration in minutes (default: 5)
  minConfidence: number;       // Minimum confidence to make recommendation (default: 0.6)
}

// Drink IDs
export enum DrinkId {
  SPIRIT_CACAO = 'spirit-cacao',
  MOUNTAIN_LEAF_ELIXIR = 'mountain-leaf-elixir',
  BAOBAB_VITAL_BREW = 'baobab-vital-brew',
  STEPPE_ROOT_BREW = 'steppe-root-brew',
  FOREST_PANDAN_FIZZ = 'forest-pandan-fizz',
  JADE_MIST_INFUSION = 'jade-mist-infusion',
  ASPEN_GROVE_TONIC = 'aspen-grove-tonic',
  DESERT_BLOOM_TISANE = 'desert-bloom-tisane'
}

// Helper functions for type safety
export const getEffectMode = (effect: EffectType): EffectMode => {
  return EFFECT_MODES[effect];
}

export const isRegulatoryEffect = (effect: EffectType): boolean => {
  return EFFECT_MODES[effect] === EffectMode.REGULATE;
}

export const isSupportEffect = (effect: EffectType): boolean => {
  return EFFECT_MODES[effect] === EffectMode.SUPPORT;
}







export enum Nav {
  RECEIPT,
  ORDER,
  MENU,
  SURVEY
}

export const NAV_COLORS = {
  [Nav.RECEIPT]: 'bg-yellow text-black',
  [Nav.ORDER]: 'bg-green text-black',
  [Nav.MENU]: 'bg-black text-white',
  [Nav.SURVEY]: 'bg-white text-black'
}

export const NAV_LABELS = {
  [Nav.RECEIPT]: 'receipt',
  [Nav.ORDER]: 'order',
  [Nav.MENU]: 'menu',
  [Nav.SURVEY]: 'survey',
}

// Claude AI Configuration
export const AI_CONFIG = {
  MODEL: 'claude-3-haiku-20240307', // Cheapest Claude model
  MAX_TOKENS: 1500,
  TEMPERATURE: 0.7,
  API_URL: 'https://api.anthropic.com/v1/messages'
}

// Survey option types for rendering (numeric for compression)
export enum OptionType {
  BODY_SYSTEM,
  SELECTED_ANSWER
}

// Survey option interface
export interface SurveyOption {
  text?: string | null;
  hint?: string | null;
  emoji?: string | null;
}
