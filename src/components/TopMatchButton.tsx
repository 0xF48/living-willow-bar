'use client';
import cn from 'classnames'
import { useRouter } from 'next/navigation';

import { getDrink } from '@/data/drinks';
import { MatchLabel } from './MatchLabel';
import { CONFIG } from '@/data/enums';
import { DrinkRanking } from '@/hooks/useSurvey';

interface TopMatchButtonProps {
  topMatch: DrinkRanking;
}

export function TopMatchButton({ topMatch }: TopMatchButtonProps) {
  const drink = getDrink(topMatch.drinkId);
  const router = useRouter();

  const handleClick = () => {
    router.push(`/drink/${topMatch.drinkId}`);
  };

  return (
    <button
      onClick={handleClick}
      className={cn("flex items-center gap-3 cursor-pointer group transition-all")}
    >
      {/* Drink Image Thumbnail */}
      <div
        className={"w-16 h-16 bg-cover bg-center " + CONFIG.ROUNDED}
        style={{
          backgroundImage: `url(${drink.imageSrc})`
        }}
      />

      {/* Drink Info */}
      <div className="flex flex-col items-start">
        <span className="text-xs text-gray-500 uppercase tracking-wide">top match</span>
        <span className="font-bold text-gray-900 text-sm leading-tight group-hover:underline transition-all">
          {drink.name}
        </span>
        {topMatch.score ? <MatchLabel matchScore={topMatch.score} className="self-start mt-1" /> : null}
      </div>
    </button>
  );
}