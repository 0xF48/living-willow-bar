import { Ingredient, EffectType } from './enums';

// Ingredient data interface
interface IngredientData {
  name: string;
  // Flavor profile: [sweet, sour, bitter, salty, umami, spicy, astringent, aromatic, earthy, woody] (0-10 scale)
  flavorProfile: [number, number, number, number, number, number, number, number, number, number];
  // Effects: [energy, stress, inflammation, digestion, circulation, immunity, hydration, detox]
  // Regulatory effects use -1 to 1 scale, Support effects use 0 to 1 scale
  effects: [number, number, number, number, number, number, number, number];
}

export const INGREDIENTS: Record<Ingredient, IngredientData> = {
  [Ingredient.CACAO]: {
    name: "Cacao",
    flavorProfile: [2, 0, 8, 0, 1, 0, 3, 4, 6, 2],
    effects: [0, 0, 0.3, 0, 0.4, 0.1, 0, 0]
  },

  [Ingredient.OAT_MILK]: {
    name: "Oat Milk",
    flavorProfile: [4, 0, 0, 0, 0, 0, 0, 1, 2, 0],
    effects: [0, 0, 0, 0, 0, 0, 0.1, 0]
  },

  [Ingredient.CHILTEPIN]: {
    name: "Chiltepín",
    flavorProfile: [1, 0, 2, 0, 0, 9, 1, 6, 3, 1],
    effects: [0.1, 0, 0, 0, 0.2, 0, 0, 0]
  },

  [Ingredient.ANNATTO]: {
    name: "Annatto",
    flavorProfile: [1, 0, 3, 0, 1, 2, 1, 4, 5, 3],
    effects: [0, 0, 0.1, 0, 0, 0, 0, 0]
  },

  [Ingredient.ALLSPICE]: {
    name: "Allspice",
    flavorProfile: [3, 0, 2, 0, 0, 4, 2, 8, 3, 5],
    effects: [0, 0, 0.3, 0.2, 0, 0, 0, 0]
  },

  [Ingredient.VANILLA]: {
    name: "Vanilla",
    flavorProfile: [6, 0, 1, 0, 0, 0, 0, 9, 1, 2],
    effects: [0, 0.1, 0, 0, 0, 0, 0, 0]
  },

  [Ingredient.PILONCILLO]: {
    name: "Piloncillo",
    flavorProfile: [8, 0, 1, 0, 1, 0, 0, 3, 4, 2],
    effects: [0, 0, 0, 0.1, 0, 0, 0.2, 0]
  },

  [Ingredient.MAYAN_SUN_SALT]: {
    name: "Mayan Sun Salt",
    flavorProfile: [0, 0, 0, 9, 0, 0, 0, 1, 2, 0],
    effects: [0, 0, 0, 0, 0, 0, 0.3, 0]
  },

  [Ingredient.ASHWAGANDHA]: {
    name: "Ashwagandha Root",
    flavorProfile: [0, 0, 7, 0, 2, 0, 4, 3, 8, 6],
    effects: [0, 0.8, 0.4, 0, 0.3, 0.2, 0, 0.2]
  },

  [Ingredient.YERBA_MATE]: {
    name: "Yerba Maté",
    flavorProfile: [1, 0, 6, 0, 1, 0, 3, 4, 7, 2],
    effects: [0.6, 0, 0.2, 0, 0.3, 0.1, 0, 0.1]
  },

  [Ingredient.LEMONGRASS]: {
    name: "Lemongrass",
    flavorProfile: [2, 4, 1, 0, 0, 0, 1, 8, 2, 1],
    effects: [0, 0.1, 0.2, 0.3, 0, 0, 0, 0]
  },

  [Ingredient.CITRUS_PEEL]: {
    name: "Citrus Peel",
    flavorProfile: [1, 6, 4, 0, 0, 0, 3, 9, 0, 0],
    effects: [0.1, 0, 0.1, 0.3, 0, 0.1, 0, 0.1]
  },

  [Ingredient.AGAVE]: {
    name: "Agave",
    flavorProfile: [7, 0, 0, 0, 0, 0, 0, 2, 2, 0],
    effects: [0, 0, 0, 0, 0, 0, 0.2, 0]
  },

  [Ingredient.BOLIVIAN_ROSE_SALT]: {
    name: "Bolivian Rose Salt",
    flavorProfile: [0, 0, 0, 8, 1, 0, 0, 2, 3, 0],
    effects: [0, 0, 0, 0, 0, 0, 0.3, 0]
  },

  [Ingredient.TULSI]: {
    name: "Tulsi (Holy Basil)",
    flavorProfile: [2, 0, 3, 0, 0, 1, 2, 7, 4, 2],
    effects: [0, 0.6, 0.3, 0.2, 0.2, 0.3, 0, 0.4]
  },

  [Ingredient.BAOBAB]: {
    name: "Baobab",
    flavorProfile: [3, 5, 1, 0, 0, 0, 4, 3, 2, 1],
    effects: [0, 0, 0.2, 0.3, 0, 0.4, 0.5, 0.3]
  },

  [Ingredient.TAMARIND]: {
    name: "Tamarind",
    flavorProfile: [4, 8, 1, 0, 1, 0, 3, 4, 2, 1],
    effects: [0, 0, 0.2, 0.4, 0, 0, 0, 0]
  },

  [Ingredient.LEMON_JUICE]: {
    name: "Lemon Juice",
    flavorProfile: [1, 9, 1, 0, 0, 0, 2, 6, 0, 0],
    effects: [0, 0, 0.1, 0, 0, 0.2, 0.1, 0.3]
  },

  [Ingredient.COCONUT_WATER]: {
    name: "Coconut Water",
    flavorProfile: [5, 0, 0, 1, 0, 0, 0, 2, 1, 0],
    effects: [0, 0, 0, 0, 0.2, 0, 0.6, 0]
  },

  [Ingredient.GINGER]: {
    name: "Ginger",
    flavorProfile: [1, 0, 2, 0, 0, 7, 1, 6, 4, 2],
    effects: [0.1, 0, 0.4, 0.5, 0.3, 0.1, 0, 0.1]
  },

  [Ingredient.MORINGA]: {
    name: "Moringa Leaf",
    flavorProfile: [1, 0, 5, 0, 3, 1, 4, 3, 7, 2],
    effects: [0, 0, 0.4, 0, 0.3, 0.5, 0, 0.2]
  },

  [Ingredient.BEET_KVASS]: {
    name: "Beet Kvass",
    flavorProfile: [3, 4, 1, 2, 3, 0, 1, 2, 6, 0],
    effects: [0, 0, 0.2, 0.4, 0, 0.2, 0, 0.6]
  },

  [Ingredient.SCHIZANDRA_BERRY]: {
    name: "Schizandra Berry",
    flavorProfile: [4, 6, 3, 2, 1, 2, 5, 4, 2, 1],
    effects: [0, 0.3, 0.3, 0, 0.2, 0.2, 0, 0.1]
  },

  [Ingredient.RHODIOLA]: {
    name: "Rhodiola",
    flavorProfile: [0, 1, 6, 0, 1, 0, 4, 2, 7, 3],
    effects: [0.2, 0.7, 0.2, 0, 0.4, 0.1, 0, 0.1]
  },

  [Ingredient.TART_CHERRY]: {
    name: "Tart Cherry",
    flavorProfile: [4, 7, 1, 0, 0, 0, 3, 5, 0, 0],
    effects: [0, 0, 0.4, 0.1, 0, 0.1, 0, 0]
  },

  [Ingredient.PURPLE_WILLOW]: {
    name: "Purple Willow",
    flavorProfile: [0, 0, 8, 0, 0, 0, 6, 2, 5, 8],
    effects: [0, 0, 0.8, 0, 0.4, 0, 0, 0.2]
  },

  [Ingredient.PANDAN_LEAF]: {
    name: "Pandan Leaf",
    flavorProfile: [3, 0, 1, 0, 0, 0, 1, 7, 3, 1],
    effects: [0, 0.2, 0, 0, 0, 0, 0, 0.1]
  },

  [Ingredient.JASMINE_FLOWER]: {
    name: "Jasmine Flower",
    flavorProfile: [2, 0, 1, 0, 0, 0, 0, 9, 0, 0],
    effects: [0, 0.3, 0, 0, 0, 0, 0, 0.1]
  },

  [Ingredient.GINGER_FIZZ]: {
    name: "Ginger Fizz",
    flavorProfile: [2, 0, 1, 0, 0, 6, 0, 5, 3, 1],
    effects: [0.1, 0, 0.2, 0.4, 0.1, 0, 0, 0]
  },

  [Ingredient.SRI_LANKAN_BLACK_SALT]: {
    name: "Sri Lankan Black Salt",
    flavorProfile: [0, 0, 1, 8, 3, 0, 0, 2, 4, 0],
    effects: [0, 0, 0, 0.1, 0, 0, 0.1, 0]
  },

  [Ingredient.KAVA]: {
    name: "Kava",
    flavorProfile: [0, 0, 7, 0, 2, 1, 6, 2, 8, 4],
    effects: [-0.2, 0.8, 0.1, 0.3, 0, 0, 0, 0]
  },

  [Ingredient.GREEN_TEA]: {
    name: "Green Tea",
    flavorProfile: [1, 0, 5, 0, 3, 0, 4, 4, 6, 2],
    effects: [0.4, 0, 0.3, 0, 0.2, 0.2, 0, 0.4]
  },

  [Ingredient.CHRYSANTHEMUM]: {
    name: "Chrysanthemum",
    flavorProfile: [2, 0, 3, 0, 0, 0, 2, 6, 1, 0],
    effects: [0, 0.3, 0.3, 0, 0, 0.1, 0, 0.1]
  },

  [Ingredient.HAWTHORN_BERRIES]: {
    name: "Hawthorn Berries",
    flavorProfile: [3, 4, 2, 0, 0, 0, 5, 3, 2, 1],
    effects: [0, 0, 0.2, 0.3, 0.4, 0, 0, 0]
  },

  [Ingredient.LIME_ZEST]: {
    name: "Lime Zest",
    flavorProfile: [0, 8, 3, 0, 0, 0, 2, 9, 0, 0],
    effects: [0, 0, 0.1, 0.2, 0, 0, 0, 0.1]
  },

  [Ingredient.GYNOSTEMMA]: {
    name: "Gynostemma",
    flavorProfile: [2, 0, 4, 0, 1, 0, 3, 2, 6, 2],
    effects: [0.3, 0, 0.2, 0, 0.5, 0.3, 0, 0.2]
  },

  [Ingredient.ASPEN_BARK]: {
    name: "Aspen Bark",
    flavorProfile: [0, 0, 7, 0, 0, 0, 6, 1, 4, 9],
    effects: [0, 0, 0.6, 0, 0.1, 0, 0, 0.1]
  },

  [Ingredient.LINGONBERRY]: {
    name: "Lingonberry",
    flavorProfile: [2, 6, 2, 0, 0, 0, 4, 3, 1, 0],
    effects: [0, 0, 0.3, 0.2, 0, 0.2, 0, 0]
  },

  [Ingredient.JUNIPER_BERRIES]: {
    name: "Juniper Berries",
    flavorProfile: [1, 0, 4, 0, 0, 2, 3, 7, 3, 4],
    effects: [0, 0, 0.2, 0, 0.1, 0.1, 0, 0.2]
  },

  [Ingredient.NETTLE]: {
    name: "Nettle",
    flavorProfile: [0, 0, 5, 1, 3, 0, 4, 2, 8, 1],
    effects: [0, 0, 0.3, 0.2, 0, 0.2, 0, 0.1]
  },

  [Ingredient.SPRUCE_TIPS]: {
    name: "Spruce Tips",
    flavorProfile: [0, 2, 4, 0, 0, 0, 3, 6, 3, 7],
    effects: [0, 0, 0.2, 0.1, 0.3, 0.1, 0, 0]
  },

  [Ingredient.CHAGA]: {
    name: "Chaga Mushroom",
    flavorProfile: [0, 0, 6, 0, 2, 0, 4, 1, 8, 6],
    effects: [0, 0, 0.4, 0, 0.2, 0.6, 0, 0.5]
  },

  [Ingredient.PEPPERMINT]: {
    name: "Peppermint",
    flavorProfile: [1, 0, 1, 0, 0, 3, 2, 9, 0, 0],
    effects: [0.1, 0.4, 0.2, 0.2, 0.3, 0, 0, 0]
  },

  [Ingredient.LICORICE_ROOT]: {
    name: "Licorice Root",
    flavorProfile: [8, 0, 2, 0, 1, 0, 1, 4, 3, 2],
    effects: [0, 0.3, 0.3, 0.3, 0, 0.1, 0, 0]
  },

  [Ingredient.ROSE_PETALS]: {
    name: "Rose Petals",
    flavorProfile: [3, 0, 1, 0, 0, 0, 2, 8, 0, 0],
    effects: [0, 0.2, 0.2, 0.1, 0, 0, 0, 0]
  },

  [Ingredient.FENNEL_SEED]: {
    name: "Fennel Seed",
    flavorProfile: [4, 0, 2, 0, 0, 2, 1, 7, 2, 1],
    effects: [0, 0, 0.1, 0.4, 0, 0, 0, 0]
  },

  [Ingredient.MINERAL_WATER]: {
    name: "Mineral Water",
    flavorProfile: [0, 0, 0, 1, 0, 0, 0, 0, 2, 0],
    effects: [0, 0, 0, 0, 0, 0, 0.4, 0]
  },

  [Ingredient.LEMON_BALM]: {
    name: "Lemon Balm",
    flavorProfile: [2, 1, 2, 0, 0, 0, 1, 7, 2, 0],
    effects: [0, 0.5, 0.2, 0.1, 0, 0.1, 0, 0.3]
  }
};

// Helper function to get ingredient data
export const getIngredient = (ingredient: Ingredient): IngredientData => {
  return INGREDIENTS[ingredient];
};

// Helper function to get flavor profile value
export const getFlavorValue = (ingredient: Ingredient, flavorIndex: number): number => {
  return INGREDIENTS[ingredient].flavorProfile[flavorIndex];
};

// Helper function to get effect value
export const getEffectValue = (ingredient: Ingredient, effectIndex: EffectType): number => {
  return INGREDIENTS[ingredient].effects[effectIndex];
};