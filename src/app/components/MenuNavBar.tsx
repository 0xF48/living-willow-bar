'use client';

import { useApp } from '../context/AppContext';
import { Nav, STYLE, CONFIG } from '@/data/enums';
import { getDrink } from '@/data/drinks';
import cn from 'classnames';
import { MessageCircleHeartIcon } from 'lucide-react';



export function MenuNavBar() {
  const { hasHealthMatrix, topMatch, matchCount, setCurrentView } = useApp();

  const handleSurveyClick = () => {
    setCurrentView(Nav.SURVEY);
  };

  const showMatches = hasHealthMatrix && matchCount > 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-black to-transparent pt-8 pb-4">
      <div className="transform w-full max-w-lg flex items-center gap-3 px-4 justify-between mx-auto">

        {/* Survey Button - Left Side */}
        <button
          onClick={handleSurveyClick}
          className={cn(
            STYLE.BUTTON,
            STYLE.SLATE,
            'relative font-bold shadow-lg',
            showMatches ? 'min-w-[120px]' : 'min-w-[80px]'
          )}
        >
          <MessageCircleHeartIcon />
          survey
          {matchCount > 0 && <div className='absolute left-1/2 -translate-x-1/2 -top-6 font-bold text-sm text-gray-400 w-full'>{matchCount} matches</div>}
        </button>

        {/* Top Match Display - Right Side */}
        {showMatches && topMatch && (
          <div className="bg-black/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-gray-700">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-xl">{getDrink(topMatch.drinkId).emoji}</span>
              <span className="font-semibold text-white">
                {getDrink(topMatch.drinkId).name}
              </span>
              <span className="text-xs text-gray-300 bg-gray-800 px-2 py-1 rounded-full">
                {Math.round(topMatch.score * 100)}%
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}