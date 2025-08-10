'use client';

import { CONFIG } from '@/data/enums';

interface MatchLabelProps {
  matchScore: number;
  className?: string;
  showMatchText?: boolean;
}

export function MatchLabel({ matchScore, className = "", showMatchText = false }: MatchLabelProps) {
  // Map match score (0-1) to HSL hue (0° red to 60° yellow to 120° green)
  const hue = matchScore * 120;
  // Darken the background by reducing lightness
  const backgroundColor = `hsl(${hue}, 70%, 35%)`;
  
  const isMatch = matchScore >= CONFIG.DRINK_MATCH_THRESHOLD;

  return (
    <div
      className={`px-3 py-1 rounded-full text-xs font-bold text-white whitespace-nowrap ${className}`}
      style={{ backgroundColor }}
    >
      {Math.round(matchScore * 100)}%{showMatchText && ' match'}
    </div>
  );
}