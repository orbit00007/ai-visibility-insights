import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { getBrandInfoWithLogos, getBrandName } from "@/data/analyticsData";
import { TrendingUp, Users } from "lucide-react";
import { useState } from "react";

type ViewMode = 'geo_score' | 'percentile' | 'mentions';

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
    if (viewMode === 'geo_score') return b.geo_score - a.geo_score;
    if (viewMode === 'percentile') return b.percentile - a.percentile;
    return (b.mention_count || 0) - (a.mention_count || 0);
  });
  
  const chartData = sortedBrands.map(brand => ({
    name: brand.brand,
    value: viewMode === 'geo_score' 
      ? brand.geo_score 
      : viewMode === 'percentile' 
        ? brand.percentile 
        : (brand.mention_count || 0),
    geoScore: brand.geo_score,
    percentile: brand.percentile,
    mentionCount: brand.mention_count || 0,
    mentionScore: brand.mention_score || 0,
    logo: brand.logo,
    isBrand: brand.brand === brandName
  }));

  const getViewLabel = () => {
    switch(viewMode) {
      case 'geo_score': return 'Raw visibility score across all competitors';
      case 'percentile': return 'Percentile rank compared to competitors';
      case 'mentions': return 'Total brand mentions across all sources';
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-1 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Brand Comparison</h3>
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
          <button
            onClick={() => setViewMode('mentions')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              viewMode === 'mentions' 
                ? 'bg-primary text-primary-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Mentions
          </button>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mb-6">{getViewLabel()}</p>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={true} vertical={false} />
            <XAxis 
              type="number" 
              stroke="hsl(var(--muted-foreground))" 
              fontSize={12}
              axisLine={false}
              tickLine={false}
              domain={[0, viewMode === 'percentile' ? 100 : 'auto']}
              tickFormatter={(val) => viewMode === 'percentile' ? `${val}%` : val}
            />
            <YAxis 
              type="category" 
              dataKey="name" 
              stroke="hsl(var(--muted-foreground))" 
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
                      fill={brand?.isBrand ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))'}
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
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value: number, name: string, props: any) => {
                const data = props.payload;
                return [
                  <div className="space-y-1">
                    <div>GEO Score: <strong>{data.geoScore}</strong></div>
                    <div>Percentile: <strong>{data.percentile}%</strong></div>
                    <div>Mentions: <strong>{data.mentionCount}</strong></div>
                  </div>,
                  ''
                ];
              }}
              labelFormatter={(label) => <span className="font-semibold">{label}</span>}
            />
            <Bar 
              dataKey="value" 
              radius={[0, 6, 6, 0]}
              barSize={28}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.isBrand ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground) / 0.4)'}
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
          <div className="w-3 h-3 rounded-sm bg-muted-foreground/40" />
          <span className="text-xs text-muted-foreground">Competitors</span>
        </div>
      </div>
    </div>
  );
};
