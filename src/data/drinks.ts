import { DrinkId, Ingredient, BodySystem } from './enums';
import { INGREDIENTS } from './ingredients';

// Drink data interface
interface DrinkData {
  name: string;
  emoji: string;
  baseDrink: string;
  flavorProfile: string;
  effects: string;
  baseIngredients: Ingredient[];
  boost: Ingredient;
  boostEffects: string[];
  systemTargets: BodySystem[];
  // Effects matrix: [energy, stress, inflammation, digestion, circulation, immunity, hydration, detox]
  // Same format as IngredientData for direct health matrix matching
  effectsMatrix: [number, number, number, number, number, number, number, number];
}

// Helper function to calculate drink effects matrix from ingredients
const calculateDrinkEffects = (baseIngredients: Ingredient[], boost: Ingredient): [number, number, number, number, number, number, number, number] => {
  const allIngredients = [...baseIngredients, boost];
  const effects: [number, number, number, number, number, number, number, number] = [0, 0, 0, 0, 0, 0, 0, 0];
  
  // Sum effects from all ingredients with boost ingredient weighted higher (1.5x)
  allIngredients.forEach((ingredient, index) => {
    const ingredientData = INGREDIENTS[ingredient];
    const weight = ingredient === boost ? 1.5 : 1; // Boost ingredients have higher impact
    
    for (let i = 0; i < 8; i++) {
      effects[i] += ingredientData.effects[i] * weight;
    }
  });
  
  // Normalize by number of ingredients to prevent overwhelming effects from complex formulas
  const normalizer = allIngredients.length * 0.8; // Slight reduction to keep effects reasonable
  return effects.map(effect => Math.round((effect / normalizer) * 100) / 100) as [number, number, number, number, number, number, number, number];
};

const DRINKS_BASE: Record<DrinkId, Omit<DrinkData, 'effectsMatrix'>> = {
  [DrinkId.SPIRIT_CACAO]: {
    name: "Spirit Cacao",
    emoji: "🫘",
    baseDrink: "Cacao melted in warmed oat milk, whisked with chiltepín, annatto, allspice, vanilla, piloncillo and a pinch of Mayan sun salt.",
    flavorProfile: "Rich, warming chocolate with subtle spice and natural sweetness",
    effects: "Elevates mood and promotes immunity. Allspice's eugenol provides anti-inflammatory and digestive benefits. Piloncillo helps stabilize blood sugar better than refined sweeteners.",
    baseIngredients: [
      Ingredient.CACAO,
      Ingredient.OAT_MILK,
      Ingredient.CHILTEPIN,
      Ingredient.ANNATTO,
      Ingredient.ALLSPICE,
      Ingredient.VANILLA,
      Ingredient.PILONCILLO,
      Ingredient.MAYAN_SUN_SALT
    ],
    boost: Ingredient.ASHWAGANDHA,
    boostEffects: [
      "A calming adaptogen that reduces anxiety and helps lower cortisol",
      "Harmonizes cacao's stimulating clarity with steady calm",
      "Perfect for concentration, creativity, or ritual",
      "Creates a composed, receptive state"
    ],
    systemTargets: [BodySystem.MENTAL]
  },

  [DrinkId.MOUNTAIN_LEAF_ELIXIR]: {
    name: "Mountain Leaf Elixir",
    emoji: "🍋",
    baseDrink: "Yerba maté steeped with lemongrass and citrus peel, lightly sweetened with agave and finished with Bolivian rose salt.",
    flavorProfile: "Crisp and citrusy with grassy undertones, balanced bitterness with zesty lift",
    effects: "Provides clean, focused energy boost with refreshing mental lift",
    baseIngredients: [
      Ingredient.YERBA_MATE,
      Ingredient.LEMONGRASS,
      Ingredient.CITRUS_PEEL,
      Ingredient.AGAVE,
      Ingredient.BOLIVIAN_ROSE_SALT
    ],
    boost: Ingredient.TULSI,
    boostEffects: [
      "Enhances immune function and mental clarity",
      "Softens caffeine edge with natural adaptogenic calm",
      "Supports focused energy, immune resilience and emotional steadiness"
    ],
    systemTargets: [BodySystem.MENTAL]
  },

  [DrinkId.BAOBAB_VITAL_BREW]: {
    name: "Baobab Vital Brew",
    emoji: "🥭",
    baseDrink: "Baobab blended with tamarind, fresh lemon juice, coconut water, and grated ginger.",
    flavorProfile: "Tangy and tropical with tamarind sourness and ginger heat - bold and bright",
    effects: "Revitalizes with vitamin C and electrolytes, supporting hydration and immunity",
    baseIngredients: [
      Ingredient.BAOBAB,
      Ingredient.TAMARIND,
      Ingredient.LEMON_JUICE,
      Ingredient.COCONUT_WATER,
      Ingredient.GINGER
    ],
    boost: Ingredient.MORINGA,
    boostEffects: [
      "Rich in vitamins, minerals and antioxidants",
      "Deepens nutritional impact for whole-body vitality",
      "Earthy green notes balance tartness of tamarind and citrus",
      "Creates potent elixir for hydration, immunity, and anti-inflammatory support"
    ],
    systemTargets: [BodySystem.RECOVERY]
  },

  [DrinkId.STEPPE_ROOT_BREW]: {
    name: "Steppe Root Brew",
    emoji: "🍒",
    baseDrink: "Fermented beet kvass mixed with schizandra berry, rhodiola, and tart cherry.",
    flavorProfile: "Earthy, tangy, and slightly fizzy with wild berry finish",
    effects: "Strengthens resilience, boosts stamina, and aids detoxification",
    baseIngredients: [
      Ingredient.BEET_KVASS,
      Ingredient.SCHIZANDRA_BERRY,
      Ingredient.RHODIOLA,
      Ingredient.TART_CHERRY
    ],
    boost: Ingredient.PURPLE_WILLOW,
    boostEffects: [
      "Contains salicin (precursor to aspirin) for anti-inflammatory support",
      "Enhances detoxifying properties of beet kvass and tart cherry",
      "Stimulates blood flow and oxygen delivery",
      "Adds woody undertone that deepens wild forest character"
    ],
    systemTargets: [BodySystem.VITALITY]
  },

  [DrinkId.FOREST_PANDAN_FIZZ]: {
    name: "Forest Pandan Fizz",
    emoji: "🎋",
    baseDrink: "Pandan leaf, jasmine flower, and lemongrass steeped, mixed with coconut water and ginger fizz. Finished with Sri Lankan black salt.",
    flavorProfile: "Light, floral, and bubbly with pandan and jasmine balanced by ginger sparkle",
    effects: "Uplifts mood with calming florals and gentle digestive support",
    baseIngredients: [
      Ingredient.PANDAN_LEAF,
      Ingredient.JASMINE_FLOWER,
      Ingredient.LEMONGRASS,
      Ingredient.COCONUT_WATER,
      Ingredient.GINGER_FIZZ,
      Ingredient.SRI_LANKAN_BLACK_SALT
    ],
    boost: Ingredient.KAVA,
    boostEffects: [
      "Traditionally used to ease tension and enhance meditative clarity",
      "Deepens relaxation and quiets the mind",
      "Creates harmonious balance of uplift and tranquility",
      "Enhances peaceful clarity alongside digestive benefits"
    ],
    systemTargets: [BodySystem.DIGESTIVE]
  },

  [DrinkId.JADE_MIST_INFUSION]: {
    name: "Jade Mist Infusion",
    emoji: "🍈",
    baseDrink: "Green tea infused with chrysanthemum, hawthorn berries, and lime zest.",
    flavorProfile: "Grassy tea base uplifted by floral and citrus accents",
    effects: "Enhances alertness and longevity while gently detoxifying and hydrating",
    baseIngredients: [
      Ingredient.GREEN_TEA,
      Ingredient.CHRYSANTHEMUM,
      Ingredient.HAWTHORN_BERRIES,
      Ingredient.LIME_ZEST
    ],
    boost: Ingredient.GYNOSTEMMA,
    boostEffects: [
      "Known for increasing vitality and adaptability",
      "Supports cardiovascular and metabolic health",
      "Strengthens body's resilience to stress",
      "Creates refreshing experience promoting lasting energy and well-being"
    ],
    systemTargets: [BodySystem.VITALITY]
  },

  [DrinkId.ASPEN_GROVE_TONIC]: {
    name: "Aspen Grove Tonic",
    emoji: "🌳",
    baseDrink: "Aspen bark tea infused with lingonberry, juniper berries, nettle, and spruce tips.",
    flavorProfile: "Crisp, lightly bitter, and forest-fresh - evokes snowmelt streams through alpine groves",
    effects: "Gently eases inflammation, stimulates circulation, and supports detox",
    baseIngredients: [
      Ingredient.ASPEN_BARK,
      Ingredient.LINGONBERRY,
      Ingredient.JUNIPER_BERRIES,
      Ingredient.NETTLE,
      Ingredient.SPRUCE_TIPS
    ],
    boost: Ingredient.CHAGA,
    boostEffects: [
      "Forest-born adaptogen rich in antioxidants and betulinic acid",
      "Deepens anti-inflammatory and immune-enhancing properties",
      "Complements aspen's natural salicylates for cellular regeneration",
      "Creates tonic of strength and renewal"
    ],
    systemTargets: [BodySystem.RECOVERY]
  },

  [DrinkId.DESERT_BLOOM_TISANE]: {
    name: "Desert Bloom Tisane",
    emoji: "🍃",
    baseDrink: "Peppermint, licorice root, rose petals, and fennel seed steeped in mineral water.",
    flavorProfile: "Cooling and fragrant with sweet licorice and fresh mint over delicate herbal base",
    effects: "Calms digestion and nervous system while gently hydrating and cooling",
    baseIngredients: [
      Ingredient.PEPPERMINT,
      Ingredient.LICORICE_ROOT,
      Ingredient.ROSE_PETALS,
      Ingredient.FENNEL_SEED,
      Ingredient.MINERAL_WATER
    ],
    boost: Ingredient.LEMON_BALM,
    boostEffects: [
      "Offers gentle citrus-mint aroma",
      "Deepens calming effect on digestive and nervous systems",
      "Blends seamlessly with peppermint and rose",
      "Creates serene, fragrant infusion"
    ],
    systemTargets: [BodySystem.DIGESTIVE]
  }
};

// Calculate and add effects matrices to all drinks
export const DRINKS: Record<DrinkId, DrinkData> = Object.fromEntries(
  Object.entries(DRINKS_BASE).map(([drinkId, drinkData]) => [
    drinkId,
    {
      ...drinkData,
      effectsMatrix: calculateDrinkEffects(drinkData.baseIngredients, drinkData.boost)
    }
  ])
) as Record<DrinkId, DrinkData>;

// Helper function to get drink data
export const getDrink = (drinkId: DrinkId): DrinkData => {
  return DRINKS[drinkId];
};

// Helper function to get all ingredients for a drink (base + boost)
export const getAllIngredientsForDrink = (drinkId: DrinkId): Ingredient[] => {
  const drink = DRINKS[drinkId];
  return [...drink.baseIngredients, drink.boost];
};

// Helper function to get drinks by body system target
export const getDrinksBySystem = (system: BodySystem): DrinkId[] => {
  return Object.entries(DRINKS)
    .filter(([_, drink]) => drink.systemTargets.includes(system))
    .map(([drinkId, _]) => drinkId as DrinkId);
};

// Helper function to get drink effects matrix
export const getDrinkEffects = (drinkId: DrinkId): [number, number, number, number, number, number, number, number] => {
  return DRINKS[drinkId].effectsMatrix;
};

// Helper function to calculate drink similarity to health matrix
export const calculateDrinkMatch = (
  drinkId: DrinkId, 
  healthMatrix: [number, number, number, number, number, number, number, number]
): number => {
  const drinkEffects = getDrinkEffects(drinkId);
  let similarity = 0;
  
  // Calculate similarity score based on how well drink effects match health needs
  for (let i = 0; i < 8; i++) {
    const need = Math.abs(healthMatrix[i]);
    const provision = Math.abs(drinkEffects[i]);
    
    // If there's a need and the drink provides it, add to similarity
    if (need > 0 && provision > 0) {
      similarity += Math.min(need, provision) * 2; // Bonus for matching needs
    }
    // Slight penalty if drink provides strong effect when there's no need
    else if (need === 0 && provision > 0.3) {
      similarity -= provision * 0.1;
    }
  }
  
  return Math.max(0, similarity); // Ensure non-negative score
};