import React from 'react';
import { getGaugeColor } from '@/data/formulas';

interface PercentileGaugeProps {
  percentile: number;
  subtitle1: string;
  subtitle2: string;
  size?: number;
}

export const PercentileGauge: React.FC<PercentileGaugeProps> = ({
  percentile,
  subtitle1,
  subtitle2,
  size = 160
}) => {
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = Math.PI * radius; // Only half circle
  const progress = (percentile / 100) * circumference;
  
  // Get color based on percentile
  const gaugeColor = getGaugeColor(percentile);
  
  // Background gradient colors for the track
  const getBackgroundGradient = () => {
    return (
      <defs>
        <linearGradient id="gaugeTrack" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(0, 84%, 60%)" stopOpacity="0.2" />
          <stop offset="40%" stopColor="hsl(45, 93%, 47%)" stopOpacity="0.2" />
          <stop offset="80%" stopColor="hsl(142, 71%, 45%)" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="gaugeProgress" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(0, 84%, 60%)" />
          <stop offset="40%" stopColor="hsl(45, 93%, 47%)" />
          <stop offset="100%" stopColor="hsl(142, 71%, 45%)" />
        </linearGradient>
      </defs>
    );
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size / 2 + 30 }}>
        <svg
          width={size}
          height={size / 2 + 20}
          viewBox={`0 0 ${size} ${size / 2 + 20}`}
        >
          {getBackgroundGradient()}
          
          {/* Background track */}
          <path
            d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
            fill="none"
            stroke="url(#gaugeTrack)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          
          {/* Progress arc */}
          <path
            d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
            fill="none"
            stroke={gaugeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            style={{ transition: 'stroke-dashoffset 1s ease-out' }}
          />
          
          {/* Tick marks */}
          <text x={strokeWidth} y={size / 2 + 16} className="fill-muted-foreground text-xs">0</text>
          <text x={size / 2 - 6} y={8} className="fill-muted-foreground text-xs">50</text>
          <text x={size - strokeWidth - 16} y={size / 2 + 16} className="fill-muted-foreground text-xs">100</text>
        </svg>
        
        {/* Center value */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
          <span className="text-4xl font-bold text-foreground">{percentile}</span>
        </div>
      </div>
      
      {/* Subtitles */}
      <div className="text-center mt-2 space-y-1">
        <p className="text-sm text-muted-foreground">{subtitle1}</p>
        <p className="text-xs text-muted-foreground">{subtitle2}</p>
      </div>
    </div>
  );
};
