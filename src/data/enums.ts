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
  REGULATE = 'regulate', // -1 to 1 scale
  SUPPORT = 'support'    // 0 to 1 scale
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
  MENTAL = 'mental',
  DIGESTIVE = 'digestive',
  VITALITY = 'vitality',
  RECOVERY = 'recovery'
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
