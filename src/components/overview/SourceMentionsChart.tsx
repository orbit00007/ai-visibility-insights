import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import { getAnalytics, getCompetitorNames, getBrandName, getBrandInfoWithLogos } from "@/data/analyticsData";
import { Layers, ChevronDown } from "lucide-react";
import { useState, useMemo } from "react";
import { BrandLogo } from "@/components/ui/BrandLogo";

const COLORS = [
  'hsl(217, 91%, 60%)', // primary blue
  'hsl(142, 71%, 45%)', // green
  'hsl(45, 93%, 47%)',  // yellow
  'hsl(258, 90%, 66%)', // purple
  'hsl(0, 84%, 60%)',   // red
  'hsl(180, 70%, 45%)', // cyan
];

export const SourceMentionsChart = () => {
  const analytics = getAnalytics();
  const brandName = getBrandName();
  const competitorNames = getCompetitorNames();
  const brandInfo = getBrandInfoWithLogos();
  
  const sourcesData = analytics?.sources_and_content_impact;
  const sources = useMemo(() => {
    if (!sourcesData?.rows) return [];
    return sourcesData.rows.map((row: any[]) => row[0] as string);
  }, [sourcesData]);
  
  const [selectedSource, setSelectedSource] = useState<string>(sources[0] || 'All Sources');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Calculate mention data for each brand per source
  const chartData = useMemo(() => {
    if (!sourcesData?.rows || !sourcesData?.header) return [];
    
    const header = sourcesData.header;
    
    // Find mention columns for each brand
    const getMentionIndex = (brand: string) => {
      return header.indexOf(`${brand} Mentions`);
    };
    
    if (selectedSource === 'All Sources') {
      // Sum mentions across all sources for each brand
      const brandMentions: Record<string, number> = {};
      competitorNames.forEach(brand => {
        brandMentions[brand] = 0;
      });
      
      sourcesData.rows.forEach((row: any[]) => {
        competitorNames.forEach(brand => {
          const mentionIdx = getMentionIndex(brand);
          if (mentionIdx !== -1) {
            brandMentions[brand] += (row[mentionIdx] as number) || 0;
          }
        });
      });
      
      return Object.entries(brandMentions)
        .map(([brand, mentions]) => ({
          brand,
          mentions,
          isBrand: brand === brandName,
          logo: brandInfo.find(b => b.brand === brand)?.logo || ''
        }))
        .sort((a, b) => b.mentions - a.mentions);
    }
    
    // Find the row for the selected source
    const sourceRow = sourcesData.rows.find((row: any[]) => row[0] === selectedSource);
    if (!sourceRow) return [];
    
    return competitorNames
      .map(brand => {
        const mentionIdx = getMentionIndex(brand);
        return {
          brand,
          mentions: mentionIdx !== -1 ? (sourceRow[mentionIdx] as number) || 0 : 0,
          isBrand: brand === brandName,
          logo: brandInfo.find(b => b.brand === brand)?.logo || ''
        };
      })
      .sort((a, b) => b.mentions - a.mentions);
  }, [sourcesData, selectedSource, competitorNames, brandName, brandInfo]);

  const allSources = ['All Sources', ...sources];

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-1 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Source Mentions</h3>
        </div>
        
        {/* Source Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-3 py-2 bg-muted/50 hover:bg-muted rounded-lg text-sm font-medium text-foreground transition-colors"
          >
            {selectedSource}
            <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-lg z-50 min-w-[180px] py-1">
              {allSources.map(source => (
                <button
                  key={source}
                  onClick={() => {
                    setSelectedSource(source);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors ${
                    selectedSource === source ? 'bg-primary/10 text-primary font-medium' : 'text-foreground'
                  }`}
                >
                  {source}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <p className="text-xs text-muted-foreground mb-6">Brand mentions by source category</p>
      
      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={true} vertical={false} />
            <XAxis 
              type="number" 
              stroke="hsl(var(--muted-foreground))" 
              fontSize={12}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              type="category" 
              dataKey="brand" 
              stroke="hsl(var(--muted-foreground))" 
              fontSize={12}
              axisLine={false}
              tickLine={false}
              width={95}
              tick={({ x, y, payload }) => {
                const item = chartData.find(d => d.brand === payload.value);
                return (
                  <g transform={`translate(${x},${y})`}>
                    <foreignObject x={-95} y={-12} width={90} height={24}>
                      <div className="flex items-center gap-2 justify-end">
                        {item?.logo && (
                          <img 
                            src={item.logo} 
                            alt={payload.value}
                            className="w-5 h-5 rounded-full object-contain bg-white flex-shrink-0"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          />
                        )}
                        <span 
                          className={`text-xs truncate ${item?.isBrand ? 'text-primary font-semibold' : 'text-muted-foreground'}`}
                        >
                          {payload.value}
                        </span>
                      </div>
                    </foreignObject>
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
              formatter={(value: number) => [`${value} mentions`, 'Mentions']}
              labelFormatter={(label) => <span className="font-semibold">{label}</span>}
            />
            <Bar 
              dataKey="mentions" 
              radius={[0, 6, 6, 0]}
              barSize={24}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.isBrand ? 'hsl(var(--primary))' : COLORS[(index + 1) % COLORS.length]}
                  opacity={entry.isBrand ? 1 : 0.7}
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
          <div className="w-3 h-3 rounded-sm bg-muted-foreground/60" />
          <span className="text-xs text-muted-foreground">Competitors</span>
        </div>
      </div>
    </div>
  );
};
