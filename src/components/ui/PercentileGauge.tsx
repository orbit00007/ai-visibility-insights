import React from 'react';
import { getGaugeColor } from '@/data/formulas';

interface PercentileGaugeProps {
  percentile: number;
  subtitle1: string;
  subtitle2: string;
  size?: number;
  label?: string;
}

export const PercentileGauge: React.FC<PercentileGaugeProps> = ({
  percentile,
  subtitle1,
  subtitle2,
  size = 180,
  label
}) => {
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const circumference = Math.PI * radius;
  const progress = (percentile / 100) * circumference;
  
  const gaugeColor = getGaugeColor(percentile);
  
  // Create gradient stops based on the gauge
  const gradientId = `gaugeGradient-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size / 2 + 40 }}>
        <svg
          width={size}
          height={size / 2 + 30}
          viewBox={`0 0 ${size} ${size / 2 + 30}`}
          className="drop-shadow-lg"
        >
          <defs>
            {/* Background gradient for track */}
            <linearGradient id={`${gradientId}-track`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(0, 84%, 60%)" stopOpacity="0.15" />
              <stop offset="50%" stopColor="hsl(45, 93%, 47%)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="hsl(142, 71%, 45%)" stopOpacity="0.15" />
            </linearGradient>
            
            {/* Colored segments for visual appeal */}
            <linearGradient id={`${gradientId}-segments`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(0, 84%, 55%)" />
              <stop offset="35%" stopColor="hsl(35, 90%, 50%)" />
              <stop offset="65%" stopColor="hsl(45, 93%, 47%)" />
              <stop offset="100%" stopColor="hsl(142, 71%, 45%)" />
            </linearGradient>
            
            {/* Glow filter */}
            <filter id={`${gradientId}-glow`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Background track with subtle gradient */}
          <path
            d={`M ${strokeWidth / 2} ${size / 2 + 5} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2 + 5}`}
            fill="none"
            stroke={`url(#${gradientId}-track)`}
            strokeWidth={strokeWidth + 4}
            strokeLinecap="round"
          />
          
          {/* Colored segment track */}
          <path
            d={`M ${strokeWidth / 2} ${size / 2 + 5} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2 + 5}`}
            fill="none"
            stroke={`url(#${gradientId}-segments)`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            opacity={0.25}
          />
          
          {/* Progress arc with glow */}
          <path
            d={`M ${strokeWidth / 2} ${size / 2 + 5} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2 + 5}`}
            fill="none"
            stroke={gaugeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            filter={`url(#${gradientId}-glow)`}
            style={{ transition: 'stroke-dashoffset 1s ease-out' }}
          />
          
          {/* Tick marks */}
          <text x={strokeWidth - 2} y={size / 2 + 25} className="fill-muted-foreground text-[10px] font-medium">0</text>
          <text x={size / 2 - 6} y={12} className="fill-muted-foreground text-[10px] font-medium">50</text>
          <text x={size - strokeWidth - 14} y={size / 2 + 25} className="fill-muted-foreground text-[10px] font-medium">100</text>
        </svg>
        
        {/* Center value with animated appearance */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-4">
          <span 
            className="text-5xl font-bold text-foreground tracking-tight"
            style={{ 
              textShadow: `0 0 20px ${gaugeColor}40`,
            }}
          >
            {percentile}
          </span>
          {label && (
            <span className="text-xs font-medium text-muted-foreground mt-1 uppercase tracking-wider">{label}</span>
          )}
        </div>
      </div>
      
      {/* Subtitles with improved styling */}
      <div className="text-center space-y-1 mt-1">
        <p className="text-sm font-medium text-foreground">{subtitle1}</p>
        <p className="text-xs text-muted-foreground">{subtitle2}</p>
      </div>
    </div>
  );
};
