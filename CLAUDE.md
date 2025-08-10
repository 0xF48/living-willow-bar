# Living Willow Elixir Bar - Project Overview

## About This Project

**The Living Willow Elixir Bar** is a Next.js application that provides personalized wellness drink recommendations through an AI-driven health assessment. The app matches users to non-alcohol health "booster" mocktails based on their current wellness needs and body system support requirements.

## Core Concept

- **Purpose**: Personalized wellness drink recommendation system
- **Approach**: AI-driven conversational health assessment instead of static questionnaires
- **Goal**: Match users with elixirs that support their current health needs through ingredient-based metabolic pathway support

## Technology Stack

- **Frontend**: Next.js 15.4.6 with React 19
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **Animation**: Framer Motion for smooth transitions
- **AI Integration**: Claude API (Haiku model) for health assessment
- **TypeScript**: Full type safety with comprehensive interfaces
- **Utilities**: Lodash, classnames, lucide-react icons

## Project Structure

### `/specs/v1/` - Project Specifications
- `APP.md` - Core app concept and AI-driven survey system
- `SURVEY.md` - Health survey questions and body system mapping
- `MENU.md` - Complete drink menu with ingredients and effects
- `HEALTH.md` - Detailed metabolic pathways and health effects
- `EFFECTS.md` - Drink effects analysis and streamlined system
- `SERVER.md` - Server-side functionality for order management
- `ADMIN.md` - Dashboard specifications
- `interface/` - UI mockups and wireframes

### `/src/data/` - Data Layer
- `enums.ts` - Core enums, interfaces, and configuration
- `drinks.ts` - Drink data with calculated effects matrices
- `ingredients.ts` - Comprehensive ingredient database with effects
- `survey.ts` - Survey processing utilities and conversation starters

### `/src/app/` - Application Code
- **API Routes**: `/api/survey/route.ts` - Claude AI integration
- **Components**: Reusable UI components (NavButton, MotionBox, etc.)
- **Views**: Main application views (SurveyView, DrinkView, etc.)
- **Hooks**: `useSurvey.ts` - Survey state management and AI interaction

## Key Features

### AI-Driven Health Assessment
- **Conversational Interface**: Natural language health assessment instead of forms
- **Dynamic Questioning**: AI asks 3-7 personalized follow-up questions
- **Multiple Response Types**: Multiple choice and free-text responses
- **Safety Limits**: 7-question limit, 5-minute timeout, content filtering

### Body Systems Approach
The app categorizes wellness needs into four core body systems:

1. **🧠 Mental & Emotional** - stress, anxiety, focus, mood
2. **🌿 Digestive & Gut Health** - bloating, discomfort, digestive issues  
3. **❤️ Physical Energy & Circulation** - fatigue, stamina, circulation
4. **💧 Recovery & Detox** - dehydration, cleansing, cellular repair

### Sophisticated Effects System
**Core Regulatory Effects** (bipolar -1 to 1 scale):
- Energy & Alertness (stimulating ↔ sedating)
- Stress Response (calming ↔ anxiety-inducing)
- Inflammation (anti-inflammatory ↔ pro-inflammatory)
- Digestive Activity (stimulating ↔ suppressing)
- Circulation (vasodilating ↔ vasoconstricting)

**Core Support Effects** (0 to 1 scale):
- Immunity Support
- Hydration & Electrolytes
- Detoxification Support

**Derived Effects** (calculated from core effects):
- Mood = Stress × 0.6 + Energy × 0.4
- Vitality = Energy × 0.4 + Circulation × 0.3 + Detox × 0.3
- Stamina = Energy × 0.5 + Circulation × 0.3 + Hydration × 0.2

### Drink Menu (8 Elixirs)

1. **🫘 Spirit Cacao + Ashwagandha** - Mood elevation and stress reduction
2. **🍋 Mountain Leaf Elixir + Tulsi** - Clean energy and mental clarity
3. **🥭 Baobab Vital Brew + Moringa** - Hydration and immune support
4. **🍒 Steppe Root Brew + Purple Willow** - Stamina and detox
5. **🎋 Forest Pandan Fizz + Kava** - Digestive calm and mood uplift
6. **🍈 Jade Mist Infusion + Gynostemma** - Vitality and circulation
7. **🌳 Aspen Grove Tonic + Chaga** - Anti-inflammatory and recovery
8. **🍃 Desert Bloom Tisane + Lemon Balm** - Digestive and nervous system calm

### Advanced Matching Algorithm
- **Effects-based matching**: Compares user health matrix to drink effect profiles
- **Weighted scoring**: Boost ingredients have 1.5x impact on effects
- **Confidence weighting**: Recommendations weighted by AI assessment confidence
- **Need-provision matching**: Bonus points for matching needs, slight penalty for unnecessary effects

## Current Implementation Status

### ✅ Completed
- Core data structures and type definitions
- Ingredient database with comprehensive effects matrices
- Drink calculation system with effects inheritance
- Basic survey UI with body system selection
- Claude AI integration for conversational assessment
- Motion animation system for smooth UI transitions

### 🚧 In Progress
- Survey flow completion and state management
- AI response parsing and health matrix extraction
- Drink recommendation algorithm integration

### 📋 Planned Features
- Menu browsing and drink detail views
- Order placement and management system
- Server dashboard for order tracking
- Admin analytics dashboard
- QR code integration for table service

## Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint
```

## Environment Variables

```bash
CLAUDE_API_KEY=your_claude_api_key_here
```

## Key Business Logic

### Health Assessment Flow
1. User selects body systems needing support
2. AI conducts personalized 3-7 question conversation
3. Responses mapped to quantified health matrix (8 core effects)
4. Best-matching drink calculated via effects similarity
5. Recommendation presented with explanation

### Ingredient Science
Each ingredient has:
- **Flavor profile**: 10-dimension taste characteristics
- **Effects matrix**: 8-dimension health impact values
- **Metabolic pathway mapping**: How ingredients affect body systems

### Quality Assurance
- **Type safety**: Comprehensive TypeScript interfaces
- **Effect validation**: Core vs support effect categorization
- **Confidence tracking**: AI assessment reliability scoring
- **Session management**: Timeout and question limits

## Architecture Highlights

### Functional Design
- Pure functions for calculations
- Immutable state management
- Separation of concerns between UI and business logic

### Performance Optimizations
- Memoized components to prevent unnecessary re-renders
- Efficient motion value updates with change detection
- Lazy loading and code splitting ready

### Extensibility
- Modular ingredient and effect system
- Easy addition of new drinks or effects
- Configurable survey parameters and AI prompts

## Usage Notes for Claude Code

- **Development server**: `npm run dev` (uses Turbopack)
- **Main entry point**: `src/app/page.tsx` → `SurveyView`
- **State management**: React hooks with custom `useSurvey` hook
- **AI Integration**: Uses Claude Haiku model via `/api/survey` endpoint
- **Data flow**: User input → AI processing → health matrix → drink matching → recommendation

The codebase follows Next.js App Router conventions with TypeScript strict mode enabled. All components use modern React patterns with hooks and functional components.