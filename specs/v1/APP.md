### The Living Willow Elixir Bar

App that matches users to different non-alcohol health "booster" mocktails through an AI-driven health assessment.

A personalized wellness drink recommendation system based on current health needs and body system support.

## Core Technology Stack
- **Frontend**: Next.js app using Tailwind CSS, React, and shadcn/ui
- **Survey System**: AI-driven conversational health assessment 
- **Data**: Drink matching based on ingredients and metabolic pathways (MENU.md, HEALTH.md)

## AI-Driven Survey System

### Overview
Instead of static questionnaires, users engage in a natural conversation with an AI health assistant that:
- Asks personalized follow-up questions based on responses
- Accepts both multiple choice selections and free-text responses
- Intelligently probes deeper into relevant health areas
- Maps conversational responses to a structured health matrix

### Survey Flow
1. **Welcome & Context**: AI introduces itself as a wellness guide
2. **Dynamic Questioning**: AI asks 3-7 questions based on:
   - Initial responses about primary health concerns
   - Follow-up questions to clarify symptoms/needs
   - Body system assessment (nervous, digestive, cardiovascular, hydration)
3. **Response Mapping**: AI maps conversation to structured health profile
4. **Recommendation**: System computes best elixir match from health matrix

### Response Types
- **Multiple Choice**: Pre-defined options for common health states
- **Free Text**: Natural language descriptions of symptoms/feelings
- **Hybrid**: AI can offer options or accept custom responses

### Health Matrix Mapping
AI responses are mapped to quantified scores across 4 body systems:
- 🧠 **Mental Wellness**: Stress, anxiety, focus, mood, mental clarity
- 🌿 **Digestive Health**: Gut comfort, inflammation, digestion, bloating
- ❤️ **Physical Vitality**: Circulation, stamina, energy, endurance
- 💧 **Recovery & Detox**: Hydration, cleansing, cellular repair, vitality

### Safety & Oversight Rules
- **Response Limit**: Maximum 7 questions per session
- **Time Limit**: 5-minute conversation timeout
- **Content Filtering**: Block medical advice requests, off-topic queries
- **Prompt Protection**: AI confined to wellness assessment scope
- **Data Privacy**: No personal health data stored beyond session

### Example Conversation
```
AI: "Welcome! I'm here to help find your perfect wellness elixir. How are you feeling in your body right now?"

User: "Pretty stressed and my stomach has been bothering me"

AI: "I understand. Let's explore that a bit more. On a scale of overwhelming to manageable, how would you describe your stress level today?"

User: [Selects "Quite high - affecting my daily activities"]

AI: "And for your stomach - is it more like bloating and discomfort, or sharp pain and nausea?"

User: "More like bloating after I eat, and just general discomfort"

AI: [Maps: Mental Wellness=8/10, Digestive Health=7/10, continues with 1-2 more targeted questions]
```

This approach creates a personalized, engaging experience while maintaining the scientific backing of ingredient-based recommendations.
