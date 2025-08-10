'use client';

import { useApp } from '../context/AppContext';
import { DrinkData, DRINKS, getDrink } from '@/data/drinks';
import { DrinkId, STYLE, Nav, CONFIG } from '@/data/enums';
import cn from 'classnames';
import { MessageCircleHeartIcon } from 'lucide-react';


function MatchBadge({ matchScore }: { matchScore: number }) {
  return <div className="flex justify-between items-start mb-3">
    <div className="text-3xl">{drink.emoji}</div>
    <div
      className={cn(
        'px-3 py-1 rounded-full text-xs font-bold',
        isMatch
          ? 'bg-green-500 text-white'
          : 'bg-gray-600 text-gray-300'
      )}
    >
      {Math.round(matchScore * 100)}% match
    </div>
  </div>
}

function MenuDrinkCard({ matchScore, drinkId, drink }: { matchScore: number | null, drinkId: DrinkId, drink: DrinkData }) {
  const hasMatch = matchScore !== null

  return <div
    className={cn(
      'relative rounded-2xl p-6 transition-all overflow-hidden ring-slate-800 ring-4 cursor-pointer hover:ring-slate-700',
    )}
    style={{
      backgroundImage: `url(${drink.imageSrc})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}
  >
    {/* Gradient Overlay - transparent left to full transparency right */}
    <div className="absolute inset-0 bg-gradient-to-l from-slate-900 via-slate-900/90 to-slate-900/60"></div>

    {/* Content */}
    <div className="relative z-10">
      {/* Match Badge */}
      {matchScore !== null && (
        <MatchBadge matchScore={matchScore} />
      )}

      {!matchScore && (
        <div className="text-3xl mb-3">{drink.emoji}</div>
      )}

      {/* Drink Info */}
      <h3 className="text-xl font-bold text-white mb-2">
        {drink.name}
      </h3>

      <div className="space-y-3">


        <div>
          <div className="text-sm font-semibold text-slate-300 mb-1">
            Flavor
          </div>
          <p className="text-sm text-slate-400">{drink.flavorProfile}</p>
        </div>

        <div>
          <div className="text-sm font-semibold text-slate-300 mb-1">
            Ingredients
          </div>
          <p className="text-sm text-slate-400">{drink.baseDrink}</p>
        </div>

        <div>
          <div className="text-sm font-semibold text-slate-300 mb-1">
            Effects
          </div>
          <p className="text-sm text-slate-400">{drink.effects}</p>
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

  return <div className="w-full min-h-screen bg-black text-white">
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
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 mb-8">
        {sortedDrinks.map((drinkId) => {
          const drink = getDrink(drinkId);
          const matchScore = getMatchScore(drinkId);

          return <MenuDrinkCard key={drinkId} drinkId={drinkId} drink={drink} matchScore={matchScore} />

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
