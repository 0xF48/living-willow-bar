'use client';


import { DrinkData, DRINKS, getDrink } from '@/data/drinks';
import { DrinkId, CONFIG } from '@/data/enums';
import { MenuNavBar } from '../components/MenuNavBar';
import { MatchLabel } from '../components/MatchLabel';
import { useRouter } from 'next/navigation';
import cn from 'classnames';
import { CarrotIcon, RainbowIcon, ZapIcon } from 'lucide-react';
import { rankDrinks, useSurvey } from '@/hooks/useSurvey';
import { useMemo } from 'react';


function MatchBadge({ matchScore, isMatch }: { matchScore: number, isMatch: boolean }) {
  return <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30">
    <MatchLabel matchScore={matchScore} showMatchText={true} />
  </div>
}

function MenuDrinkCard({ matchScore, drinkId, drink, index, isLast }: { matchScore: number | null, drinkId: DrinkId, drink: DrinkData, index: number, isLast: boolean }) {
  const hasMatch = matchScore !== null
  const router = useRouter();

  // Calculate the same color as the match badge
  const hue = matchScore !== null ? matchScore * 120 : 0;
  const indexColor = matchScore !== null ? `hsl(${hue}, 70%, 35%)` : '#374151'; // gray-700 as fallback

  const handleClick = () => {
    router.push(`/drink/${drinkId}`);
  };

  return <div className="w-full group">
    <button
      onClick={handleClick}
      className={cn(
        'relative flex bg-black cursor-pointer w-full text-left transition-all',
      )}
    >
      {/* Index Number */}
      <div className="absolute -left-10 top-20 z-20">
        <span className="text-2xl font-bold" style={{ color: indexColor }}>{index}.</span>
      </div>

      {/* Background Image - 1/3 of container */}
      <div
        className="w-1/3 h-full rounded-2xl relative"
        style={{
          backgroundImage: `url(${drink.imageSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          aspectRatio: '3/4'
        }}
      >
        {/* Gradient overlay on image */}
        <div className="w-full h-full bg-gradient-to-b from-transparent to-black rounded-2xl"></div>

        {/* Match Badge positioned relative to image */}
        {matchScore !== null && (
          <MatchBadge matchScore={matchScore} isMatch={matchScore >= CONFIG.DRINK_MATCH_THRESHOLD} />
        )}
      </div>

      {/* Content - 2/3 of container */}
      <div className="w-2/3 pl-6 relative">

        {/* Drink Info */}
        <h3 className="text-3xl font-bold text-white mb-5 group-hover:underline transition-all">
          {drink.name}
        </h3>

        <div className="space-y-3">
          <div>
            <div className="text-sm font-semibold text-green-300 mb-1 flex flex-row gap-2 items-center">
              <RainbowIcon className='w-5' />
              Flavor
            </div>
            <p className="text-sm text-gray-400">{drink.flavorProfile}</p>
          </div>

          <div>
            <div className="text-sm font-semibold text-orange-300 mb-1 flex flex-row gap-2 items-center">
              <CarrotIcon className='w-5' />
              Ingredients
            </div>
            <p className="text-sm text-gray-400">{drink.baseDrink}</p>
          </div>

          <div>
            <div className="text-sm font-semibold text-yellow-300 mb-1 flex flex-row gap-2 items-center">
              <ZapIcon className='w-5' />
              Effects
            </div>
            <p className="text-sm text-gray-400">{drink.effects}</p>
          </div>
        </div>
      </div>
    </button>

    {/* Spacer - part of the card */}
    {!isLast && (
      <div className="w-32 h-1 bg-gray-800 group-hover:bg-gray-600 rounded-full mx-auto my-12 transition-all" />
    )}
  </div>
}



export function MenuView() {
  const { healthMatrix } = useSurvey();



  const sortedDrinks = useMemo(() => {
    return rankDrinks(healthMatrix)
  }, [healthMatrix])


  const getMatchScore = (drinkId: DrinkId): number | null => {
    if (!healthMatrix) return null;
    const ranking = sortedDrinks.find(r => r.drinkId === drinkId);
    return ranking ? ranking.score : 0;
  };

  const isGoodMatch = (score: number | null): boolean => {
    return score !== null && score >= CONFIG.DRINK_MATCH_THRESHOLD;
  };

  return <div className="w-full min-h-screen bg-black text-white ">
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">
          Wellness Elixir Menu
        </h1>
        {healthMatrix && (
          <p className="text-gray-300">
            Sorted by compatibility with your wellness profile
          </p>
        )}
      </div>

      {/* Drinks Grid */}
      <div className="flex flex-col mb-8 max-w-lg w-full mx-auto">
        {sortedDrinks.map((sortedDrink, index) => {
          const { drinkId, score } = sortedDrink

          const drink = getDrink(drinkId);

          const isLast = index === sortedDrinks.length - 1;

          return (
            <MenuDrinkCard
              key={drinkId}
              drinkId={drinkId}
              drink={drink}
              matchScore={score}
              index={index + 1}
              isLast={isLast}
            />
          )

        })
        }
      </div>
    </div>

    {/* Menu Navigation Bar */}
    <MenuNavBar />
  </div>
}
