'use client';

import { useApp } from '../context/AppContext';
import { DrinkData, DRINKS, getDrink } from '@/data/drinks';
import { DrinkId, STYLE, Nav, CONFIG } from '@/data/enums';
import cn from 'classnames';
import { CarrotIcon, MessageCircleHeartIcon, RainbowIcon, ZapIcon } from 'lucide-react';


function MatchBadge({ matchScore, isMatch }: { matchScore: number, isMatch: boolean }) {
  // Map match score (0-1) to HSL hue (0° red to 60° yellow to 120° green)
  const hue = matchScore * 120;
  // Darken the background by reducing lightness
  const backgroundColor = `hsl(${hue}, 70%, 35%)`;
  
  return <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30">
    <div
      className="px-3 py-1 rounded-full text-xs font-bold text-white whitespace-nowrap"
      style={{ backgroundColor }}
    >
      {Math.round(matchScore * 100)}% match
    </div>
  </div>
}

function MenuDrinkCard({ matchScore, drinkId, drink, index }: { matchScore: number | null, drinkId: DrinkId, drink: DrinkData, index: number }) {
  const hasMatch = matchScore !== null
  
  // Calculate the same color as the match badge
  const hue = matchScore !== null ? matchScore * 120 : 0;
  const indexColor = matchScore !== null ? `hsl(${hue}, 70%, 35%)` : '#374151'; // gray-700 as fallback

  return <div
    className={cn(
      'relative flex bg-black',
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
      <h3 className="text-3xl font-bold text-white mb-5">
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
  </div>
}



export function MenuView() {
  const { drinkRankings, hasHealthMatrix, setCurrentView } = useApp();

  // Get all drinks, sorted by match score if available
  const allDrinks = Object.keys(DRINKS) as DrinkId[];

  const sortedDrinks = hasHealthMatrix && drinkRankings.length > 0
    ? [...drinkRankings].sort((a, b) => b.score - a.score).map(r => r.drinkId)
    : allDrinks;

  const getMatchScore = (drinkId: DrinkId): number | null => {
    if (!hasHealthMatrix) return null;
    const ranking = drinkRankings.find(r => r.drinkId === drinkId);
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
        {hasHealthMatrix && (
          <p className="text-gray-300">
            Sorted by compatibility with your wellness profile
          </p>
        )}
      </div>

      {/* Drinks Grid */}
      <div className="flex flex-col mb-8 max-w-lg w-full mx-auto">
        {sortedDrinks.map((drinkId, index) => {
          const drink = getDrink(drinkId);
          const matchScore = getMatchScore(drinkId);

          return (
            <div key={drinkId}>
              <MenuDrinkCard drinkId={drinkId} drink={drink} matchScore={matchScore} index={index + 1} />
              {index < sortedDrinks.length - 1 && (
                <div className="w-30 h-1 bg-gray-800 rounded-full mx-auto my-8"></div>
              )}
            </div>
          )

        })
        }
        {/* Bottom Navigation */}
        <div className="fixed bottom-20 left-40 transform z-40">
          <button
            onClick={() => setCurrentView(Nav.SURVEY)}
            className={cn(
              STYLE.BUTTON,
              STYLE.SLATE,
              'font-bold shadow-lg'
            )}
          >
            <MessageCircleHeartIcon />
            survey
          </button>
        </div>
      </div>
    </div>
  </div>
}
