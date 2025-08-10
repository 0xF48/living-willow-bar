'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Nav, DrinkId, CONFIG } from '@/data/enums';

export interface DrinkRanking {
  drinkId: DrinkId;
  score: number;
}

interface AppState {
  currentView: Nav;
  drinkRankings: DrinkRanking[];
  hasHealthMatrix: boolean;
  topMatch: DrinkRanking | null;
  matchCount: number;
}

interface AppContextType extends AppState {
  setCurrentView: (view: Nav) => void;
  updateDrinkRankings: (rankings: DrinkRanking[]) => void;
  setHasHealthMatrix: (hasMatrix: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    currentView: Nav.SURVEY,
    drinkRankings: [],
    hasHealthMatrix: false,
    topMatch: null,
    matchCount: 0
  });

  const setCurrentView = (view: Nav) => {
    setState(prev => ({ ...prev, currentView: view }));
  };

  const updateDrinkRankings = (rankings: DrinkRanking[]) => {
    const topMatch = rankings.length > 0 ? rankings[0] : null;
    const matchCount = rankings.filter(r => r.score >= CONFIG.DRINK_MATCH_THRESHOLD).length;
    
    setState(prev => ({
      ...prev,
      drinkRankings: rankings,
      topMatch,
      matchCount
    }));
  };

  const setHasHealthMatrix = (hasMatrix: boolean) => {
    setState(prev => ({ ...prev, hasHealthMatrix: hasMatrix }));
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        setCurrentView,
        updateDrinkRankings,
        setHasHealthMatrix
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}