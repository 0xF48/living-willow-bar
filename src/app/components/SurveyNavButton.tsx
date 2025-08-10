'use client';

import { useApp } from '../context/AppContext';
import { Nav, STYLE, CONFIG } from '@/data/enums';
import { getDrink } from '@/data/drinks';
import cn from 'classnames';
import { MenuIcon } from 'lucide-react';

export function SurveyNavButton() {
  const { hasHealthMatrix, topMatch, matchCount, setCurrentView } = useApp();

  const handleMenuClick = () => {
    setCurrentView(Nav.MENU);
  };

  const showMatches = hasHealthMatrix && matchCount > 0;

  return (
    <div className="fixed bottom-20 left-40 transform z-50">
      <div className="flex items-center gap-3">
        {/* Top Match Display */}
        {showMatches && topMatch && (
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-gray-200">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-xl">{getDrink(topMatch.drinkId).emoji}</span>
              <span className="font-semibold text-gray-800">
                {getDrink(topMatch.drinkId).name}
              </span>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {Math.round(topMatch.score * 100)}%
              </span>
            </div>
          </div>
        )}

        {/* Menu Button */}
        <button
          onClick={handleMenuClick}
          className={cn(
            STYLE.BUTTON,
            STYLE.BLACK,
            'font-bold shadow-lg transform hover:scale-105 transition-transform',
            showMatches ? 'min-w-[120px]' : 'min-w-[80px]'
          )}
        >
          <MenuIcon />
          {showMatches ? `${matchCount} matches` : 'menu'}
        </button>
      </div>
    </div>
  );
}