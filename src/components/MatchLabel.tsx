'use client';

import { CONFIG } from '@/data/enums';

interface MatchLabelProps {
  matchScore: number;
  className?: string;
  showMatchText?: boolean;
}

export function MatchLabel({ matchScore, className = "", showMatchText = false }: MatchLabelProps) {
  // Map match score (0-1) from gray to blue
  const grayValue = Math.round((1 - matchScore) * 128 + 64); // 192 (light gray) to 64 (dark gray)
  const blueValue = Math.round(matchScore * 191 + 64); // 64 to 255 (blue intensity)
  const backgroundColor = matchScore > 0.1 
    ? `rgb(${grayValue}, ${grayValue}, ${blueValue})` // Gray to blue transition
    : `rgb(${grayValue}, ${grayValue}, ${grayValue})`; // Pure gray for very low scores
  
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