import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
import { getKeywords, getBrandName, competitorData } from "@/data/analyticsData";
import { Target } from "lucide-react";

export const BrandMentionsRadar = () => {
  const keywords = getKeywords();
  const brandName = getBrandName();
  
  // Find brand and top competitor
  const brand = competitorData.find(c => c.name === brandName);
  const topCompetitor = competitorData.find(c => c.name !== brandName);
  
  if (!brand) return null;
  
  const chartData = keywords.map((keyword, idx) => ({
    keyword: keyword.length > 15 ? keyword.substring(0, 15) + '...' : keyword,
    [brandName]: brand.keywordScores[idx] || 0,
    ...(topCompetitor ? { [topCompetitor.name]: topCompetitor.keywordScores[idx] || 0 } : {})
  }));

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center gap-2 mb-1">
        <Target className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Keyword Coverage</h3>
      </div>
      <p className="text-xs text-muted-foreground mb-4">Your brand vs top competitor</p>
      
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={chartData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
            <PolarGrid stroke="hsl(220, 13%, 91%)" />
            <PolarAngleAxis 
              dataKey="keyword" 
              tick={{ fill: 'hsl(220, 9%, 46%)', fontSize: 10 }}
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 'auto']}
              tick={{ fill: 'hsl(220, 9%, 46%)', fontSize: 10 }}
            />
            <Radar
              name={brandName}
              dataKey={brandName}
              stroke="hsl(217, 91%, 60%)"
              fill="hsl(217, 91%, 60%)"
              fillOpacity={0.4}
              strokeWidth={2}
            />
            {topCompetitor && (
              <Radar
                name={topCompetitor.name}
                dataKey={topCompetitor.name}
                stroke="hsl(0, 84%, 60%)"
                fill="hsl(0, 84%, 60%)"
                fillOpacity={0.2}
                strokeWidth={2}
              />
            )}
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(0, 0%, 100%)',
                border: '1px solid hsl(220, 13%, 91%)',
                borderRadius: '8px',
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-2 pt-2 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-xs text-muted-foreground">{brandName}</span>
        </div>
        {topCompetitor && (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive" />
            <span className="text-xs text-muted-foreground">{topCompetitor.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};
