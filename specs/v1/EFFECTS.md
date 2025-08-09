# Elixir Effects Analysis


---

**Spirit Cacao**

* Energy & Alertness: Moderate
* Calm & Stress Relief: Strong
* Immunity & Vitality: Strong
* Hydration & Electrolytes: Light
* Anti-inflammatory & Pain Relief: Strong
* Digestive Support: Moderate
* Mood Lift: Strong
* Stamina & Endurance: Moderate

---

**Mountain Leaf Elixir**

* Energy & Alertness: Strong
* Calm & Stress Relief: Strong
* Immunity & Vitality: Moderate
* Hydration & Electrolytes: Light
* Mood Lift: Moderate
* Stamina & Endurance: Moderate

---

**Baobab Vital Brew**

* Energy & Alertness: Moderate
* Immunity & Vitality: Very Strong
* Hydration & Electrolytes: Very Strong
* Anti-inflammatory & Pain Relief: Strong
* Digestive Support: Light
* Mood Lift: Light
* Stamina & Endurance: Light
* Detoxification & Cleansing: Moderate

---

**Steppe Root Brew**

* Energy & Alertness: Moderate
* Calm & Stress Relief: Light
* Immunity & Vitality: Moderate
* Hydration & Electrolytes: Moderate
* Anti-inflammatory & Pain Relief: Strong
* Digestive Support: Light
* Mood Lift: Light
* Stamina & Endurance: Strong
* Detoxification & Cleansing: Strong

---

**Forest Pandan Fizz**

* Calm & Stress Relief: Very Strong
* Immunity & Vitality: Light
* Hydration & Electrolytes: Light
* Mood Lift: Strong
* Stamina & Endurance: Very Strong

---

**Jade Mist Infusion**

* Energy & Alertness: Strong
* Calm & Stress Relief: Light
* Immunity & Vitality: Moderate
* Hydration & Electrolytes: Moderate
* Mood Lift: Strong
* Stamina & Endurance: Moderate

---

**Aspen Grove Tonic**

* Calm & Stress Relief: Light
* Immunity & Vitality: Moderate
* Anti-inflammatory & Pain Relief: Strong
* Mood Lift: Light
* Stamina & Endurance: Moderate

---

**Desert Bloom Tisane**

* Calm & Stress Relief: Very Strong
* Immunity & Vitality: Moderate

---

## Streamlined Bipolar Effects System

### Core Regulatory Effects (-1 to 1 scale)
*Categories that can upregulate or downregulate biological pathways*

- **Energy & Alertness** (-1 to 1)
  - -1: Sedating, sleep-promoting (downregulates CNS)
  - 0: Neutral energy
  - +1: Stimulating, alertness-boosting (upregulates CNS)

- **Stress Response** (-1 to 1) 
  - -1: Anxiety-inducing, stimulating (upregulates stress response)
  - 0: Neutral 
  - +1: Calming, stress-reducing (downregulates HPA axis)

- **Inflammation** (-1 to 1)
  - -1: Pro-inflammatory (upregulates inflammatory pathways)
  - 0: Neutral
  - +1: Anti-inflammatory (downregulates COX, NF-κB pathways)

- **Digestive Activity** (-1 to 1)
  - -1: Digestive suppressant (downregulates gut motility)
  - 0: Neutral
  - +1: Digestive stimulant (upregulates gut function)

- **Circulation** (-1 to 1)
  - -1: Vasoconstricting (downregulates blood flow)
  - 0: Neutral
  - +1: Vasodilating (upregulates circulation)

### Core Support Effects (0 to 1 scale)
*Categories that only provide positive support*

- **Immunity** (0 to 1)
  - Immune system support and modulation

- **Hydration** (0 to 1) 
  - Fluid balance and electrolyte support

- **Detoxification** (0 to 1)
  - Liver, kidney, and cellular detox support

### Derived Effects (Calculated from Core Effects)
*These emerge from combinations of core effects and don't need separate tracking*

- **Mood**: Derived from Stress Response (60%) + Energy (40%)
- **Vitality**: Derived from Energy (40%) + Circulation (30%) + Detoxification (30%)  
- **Stamina**: Derived from Energy (50%) + Circulation (30%) + Hydration (20%)

### Implementation Example
```json
{
  "coreEffects": {
    "energy": 0.6,           // stimulating
    "stress": 0.8,           // calming  
    "inflammation": 0.9,     // anti-inflammatory
    "digestion": 0.4,        // mildly stimulating
    "circulation": 0.5,      // mildly vasodilating
    "immunity": 0.7,         // immune boosting
    "hydration": 0.6,        // hydrating
    "detox": 0.8            // detox supporting
  },
  "derivedEffects": {
    "mood": 0.72,           // (0.8 * 0.6) + (0.6 * 0.4)
    "vitality": 0.71,       // (0.6 * 0.4) + (0.5 * 0.3) + (0.8 * 0.3)
    "stamina": 0.59         // (0.6 * 0.5) + (0.5 * 0.3) + (0.6 * 0.2)
  }
}
```

### Benefits of Streamlined System
✅ **No redundancy** - each core category is independent  
✅ **Clear causation** - complex effects emerge from combinations  
✅ **Simpler AI logic** - 8 core variables instead of 12+  
✅ **Biologically accurate** - maps directly to metabolic pathways  
✅ **Scalable** - easy to add new core effects or adjust derived formulas

This streamlined system eliminates redundant categories while maintaining all meaningful biological distinctions. Mood, vitality, and stamina are calculated rather than tracked separately, reducing complexity and avoiding conflicting data.