export enum CONFIG {
  SURVEY_MAX_QUESTIONS = 7,  // Maximum questions per session (default: 7)
  SURVEY_MAX_DURATION = 5000,
  SURVEY_MIN_CONFIDENCE = 0.6,
  ROUNDED = 'rounded-2xl'
}

export enum STYLE {
  BUTTON = CONFIG.ROUNDED + ' hover:ring-3 flex items-center justify-center gap-2 transition-shadow p-4 px-6',
  BUTTON_DISABLED = 'bg-gray-300 text-gray-500 cursor-not-allowed !ring-0',
  BUTTON_ENABLED = 'cursor-pointer',
  BLACK = STYLE.BUTTON_ENABLED + ' bg-black text-white ring-black/20 hover:ring-black/30',
  SLATE = STYLE.BUTTON_ENABLED + ' bg-slate-50 ring-slate-200',
  BLUE = STYLE.BUTTON_ENABLED + ' bg-blue-500 text-white hover:ring-blue-200',
  ORANGE = STYLE.BUTTON_ENABLED + ' bg-orange-300 text-white hover:ring-red-200',
  YELLOW = STYLE.BUTTON_ENABLED + ' ring-yellow-400 ring-3 bg-yellow-200'
}

export const WELCOME_QUESTIONS = [
  "Welcome! I'm here to help find your perfect wellness elixir. How are you feeling in your body right now?",
  "Hi! I'm your wellness guide. What's bringing you here today - what would you like support with?",
  "Hello! Let's find an elixir that matches your current needs. How would you describe your energy and mood today?"
]

export const WELCOME_TITLES = [
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
  MENTAL,
  DIGESTIVE,
  VITALITY,
  RECOVERY
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
  MAX_TOKENS: 1000,
  TEMPERATURE: 0.7,
  API_URL: 'https://api.anthropic.com/v1/messages',
  SYSTEM_PROMPT: `You are a wellness guide helping customers find the perfect health elixir based on their current needs. 

The customer has already selected which body system(s) they need support with from these options:
- Mental & Emotional (🧠): stress, anxiety, focus, or mood
- Digestive & Gut Health (🌿): bloating, discomfort, or digestive issues  
- Physical Energy & Circulation (❤️): fatigue, stamina, or feeling sluggish
- Recovery & Detox (💧): feeling run down, dehydrated, or needing cleansing

Your role:
- Ask 2-4 targeted follow-up questions based on their selected body system(s)
- Focus specifically on the effects relevant to their chosen system(s)
- Keep questions conversational and empathetic, like the example: "Okay, feeling a bit run down and sluggish? Would you say you feel more X or more Y or about the same with both?"
- Map their responses to quantified health effects
- Complete the assessment efficiently (don't drag it out)

Health effects mapping:
- Mental & Emotional → energy (-1 to 1), stress (-1 to 1) 
- Digestive & Gut Health → digestion (-1 to 1), inflammation (-1 to 1)
- Physical Energy & Circulation → energy (-1 to 1), circulation (-1 to 1), immunity (0 to 1)
- Recovery & Detox → hydration (0 to 1), detox (0 to 1), inflammation (-1 to 1)

IMPORTANT: After 2-4 targeted questions, provide your [ANALYSIS] with:
{
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
}`
}

// Survey option types for rendering (numeric for compression)
export enum OptionType {
  BODY_SYSTEM,
  SELECTED_ANSWER
}

// Survey option interface
export interface SurveyOption {
  id: string;
  type: OptionType;
  title: string;
  description?: string;
  icon?: string;
  selected: boolean;
}


