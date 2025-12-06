import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { getBrandInfoWithLogos, getBrandName } from "@/data/analyticsData";
import { TrendingUp } from "lucide-react";
import { useState } from "react";

type ViewMode = 'geo_score' | 'percentile';

export const CompetitorComparisonChart = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('geo_score');
  const brandInfo = getBrandInfoWithLogos();
  const brandName = getBrandName();
  
  // Calculate percentile for each brand dynamically
  const brandsWithPercentile = brandInfo.map((brand, _, arr) => {
    const lowerScores = arr.filter(b => b.geo_score < brand.geo_score).length;
    const percentile = Math.round((lowerScores / arr.length) * 100);
    return { ...brand, percentile };
  });
  
  // Sort by selected metric descending
  const sortedBrands = [...brandsWithPercentile].sort((a, b) => {
    const valueA = viewMode === 'geo_score' ? a.geo_score : a.percentile;
    const valueB = viewMode === 'geo_score' ? b.geo_score : b.percentile;
    return valueB - valueA;
  });
  
  const chartData = sortedBrands.map(brand => ({
    name: brand.brand,
    value: viewMode === 'geo_score' ? brand.geo_score : brand.percentile,
    geoScore: brand.geo_score,
    percentile: brand.percentile,
    logo: brand.logo,
    isBrand: brand.brand === brandName
  }));

  const maxValue = Math.max(...chartData.map(d => d.value));

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">GEO Score Comparison</h3>
        </div>
        {/* Toggle Switch */}
        <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
          <button
            onClick={() => setViewMode('geo_score')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              viewMode === 'geo_score' 
                ? 'bg-primary text-primary-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            GEO Score
          </button>
          <button
            onClick={() => setViewMode('percentile')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              viewMode === 'percentile' 
                ? 'bg-primary text-primary-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Percentile
          </button>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mb-6">
        {viewMode === 'geo_score' ? 'Raw visibility score across all competitors' : 'Percentile rank compared to competitors'}
      </p>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" horizontal={true} vertical={false} />
            <XAxis 
              type="number" 
              stroke="hsl(220, 9%, 46%)" 
              fontSize={12}
              axisLine={false}
              tickLine={false}
              domain={[0, viewMode === 'percentile' ? 100 : 'auto']}
              tickFormatter={(val) => viewMode === 'percentile' ? `${val}%` : val}
            />
            <YAxis 
              type="category" 
              dataKey="name" 
              stroke="hsl(220, 9%, 46%)" 
              fontSize={12}
              axisLine={false}
              tickLine={false}
              width={75}
              tick={({ x, y, payload }) => {
                const brand = chartData.find(b => b.name === payload.value);
                return (
                  <g transform={`translate(${x},${y})`}>
                    <text
                      x={-10}
                      y={0}
                      dy={4}
                      textAnchor="end"
                      fill={brand?.isBrand ? 'hsl(217, 91%, 60%)' : 'hsl(220, 9%, 46%)'}
                      fontSize={12}
                      fontWeight={brand?.isBrand ? 600 : 400}
                    >
                      {payload.value}
                    </text>
                  </g>
                );
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(0, 0%, 100%)',
                border: '1px solid hsl(220, 13%, 91%)',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value: number) => [
                viewMode === 'percentile' ? `${value}%` : value,
                viewMode === 'geo_score' ? 'GEO Score' : 'Percentile'
              ]}
              labelFormatter={(label) => `${label}`}
            />
            <Bar 
              dataKey="value" 
              radius={[0, 4, 4, 0]}
              barSize={24}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.isBrand ? 'hsl(217, 91%, 60%)' : 'hsl(220, 14%, 80%)'}
                  style={{
                    filter: entry.isBrand ? 'drop-shadow(0 0 8px hsla(217, 91%, 60%, 0.4))' : 'none'
                  }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-primary" />
          <span className="text-xs text-muted-foreground">Your Brand</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-muted-foreground/50" />
          <span className="text-xs text-muted-foreground">Competitors</span>
        </div>
      </div>
    </div>
  );
};
