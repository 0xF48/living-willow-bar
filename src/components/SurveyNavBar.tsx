'use client';

import { computeMatchCount, computeTopMatch, useSurvey } from '../hooks/useSurvey';

import { TopMatchButton } from './TopMatchButton';
import { STYLE, CONFIG } from '@/data/enums';
import { useRouter } from 'next/navigation';
import cn from 'classnames';
import { MenuIcon } from 'lucide-react';
import { useMemo } from 'react';



export function SurveyNavBar() {
  const { healthMatrix } = useSurvey()
  const router = useRouter();

  const handleMenuClick = () => {
    router.push('/menu');
  };

  const matchCount = useMemo(() => computeMatchCount(healthMatrix), [healthMatrix])

  const topMatch = useMemo(() => computeTopMatch(healthMatrix), [healthMatrix])


  const showMatches = healthMatrix && matchCount > 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-white to-transparent pt-8 pb-4">
      <div className="transform w-full max-w-lg flex items-center gap-3 px-4 justify-between mx-auto">

        {/* Top Match Display - Left Side */}
        {showMatches && topMatch && (
          <TopMatchButton topMatch={topMatch} />
        )}

        {/* Spacer when no matches */}
        {!showMatches && <div />}
        <button
          onClick={handleMenuClick}
          className={cn(
            STYLE.BUTTON,
            STYLE.BLACK,
            'relative font-bold shadow-lg min-w-[120px]'
          )}
        >
          <MenuIcon />
          menu
          {matchCount > 0 && (
            <div className='absolute left-1/2 -translate-x-1/2 -top-6 font-bold text-sm text-gray-400 w-full'>
              {matchCount} matches
            </div>
          )}
        </button>
      </div>
    </div>
  );
}