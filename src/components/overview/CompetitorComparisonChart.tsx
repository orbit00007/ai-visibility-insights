import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';
import { getBrandInfoWithLogos, getKeywords, getBrandName } from "@/data/analyticsData";
import { TrendingUp } from "lucide-react";

export const CompetitorComparisonChart = () => {
  const brandInfo = getBrandInfoWithLogos();
  const brandName = getBrandName();
  
  // Sort by geo_score descending
  const sortedBrands = [...brandInfo].sort((a, b) => b.geo_score - a.geo_score);
  
  const chartData = sortedBrands.map(brand => ({
    name: brand.brand,
    geoScore: brand.geo_score,
    mentions: brand.brand_mentionscore,
    logo: brand.logo,
    isBrand: brand.brand === brandName
  }));

  const getBarColor = (entry: any) => {
    if (entry.isBrand) return 'hsl(217, 91%, 60%)'; // primary
    return 'hsl(220, 14%, 70%)'; // muted
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center gap-2 mb-1">
        <TrendingUp className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">GEO Score Comparison</h3>
      </div>
      <p className="text-xs text-muted-foreground mb-6">AI visibility score across all competitors</p>
      
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
              formatter={(value: number, name: string) => [value, name === 'geoScore' ? 'GEO Score' : 'Mentions']}
              labelFormatter={(label) => `${label}`}
            />
            <Bar 
              dataKey="geoScore" 
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
