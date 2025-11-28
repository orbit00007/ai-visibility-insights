import { Layout } from "@/components/layout/Layout";
import { getAnalytics, competitorData } from "@/data/analyticsData";
import { Info } from "lucide-react";

const CompetitorsTopics = () => {
  const analytics = getAnalytics();
  const visibilityTable = analytics?.competitor_visibility_table;
  const keywords = visibilityTable?.header?.slice(1) || [];

  // Calculate max score per keyword for percentage calculation
  const maxScores = keywords.map((_, idx) => {
    let max = 0;
    visibilityTable?.rows?.forEach(row => {
      const score = row[idx + 1] as number;
      if (score > max) max = score;
    });
    return max;
  });

  const getHeatColor = (score: number, maxScore: number) => {
    if (maxScore === 0) return 'bg-muted';
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-green-400';
    if (percentage >= 40) return 'bg-yellow-400';
    if (percentage >= 20) return 'bg-orange-400';
    if (percentage > 0) return 'bg-red-400';
    return 'bg-muted';
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-foreground">Competitor Topics Heatmap</h1>
          <Info className="w-4 h-4 text-muted-foreground cursor-help" />
        </div>

        <p className="text-muted-foreground">
          Visual representation of competitor visibility across different search keywords. 
          Darker colors indicate higher visibility scores.
        </p>

        {/* Heatmap Legend */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Legend:</span>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-500"></div>
            <span className="text-sm text-muted-foreground">High (80-100%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-yellow-400"></div>
            <span className="text-sm text-muted-foreground">Medium (40-60%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-400"></div>
            <span className="text-sm text-muted-foreground">Low (1-20%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-muted"></div>
            <span className="text-sm text-muted-foreground">None (0%)</span>
          </div>
        </div>

        {/* Heatmap Table */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground min-w-[120px]">Brand</th>
                  {keywords.map(keyword => (
                    <th key={keyword} className="text-center py-4 px-4 text-sm font-medium text-muted-foreground min-w-[200px]">
                      {keyword}
                    </th>
                  ))}
                  <th className="text-center py-4 px-4 text-sm font-medium text-muted-foreground min-w-[100px]">Total</th>
                </tr>
              </thead>
              <tbody>
                {competitorData.map(competitor => {
                  const row = visibilityTable?.rows?.find(r => r[0] === competitor.name);
                  const isKommunicate = competitor.name === 'Kommunicate';
                  
                  return (
                    <tr key={competitor.name} className={`border-b border-border/50 ${isKommunicate ? 'bg-primary/5' : 'hover:bg-muted/20'}`}>
                      <td className={`py-4 px-4 font-medium ${isKommunicate ? 'text-primary' : 'text-foreground'}`}>
                        {competitor.name}
                      </td>
                      {keywords.map((keyword, idx) => {
                        const score = row ? row[idx + 1] as number : 0;
                        const heatColor = getHeatColor(score, maxScores[idx]);
                        
                        return (
                          <td key={keyword} className="py-4 px-4">
                            <div className="flex items-center justify-center">
                              <div className={`w-full h-10 rounded-lg ${heatColor} flex items-center justify-center`}>
                                <span className={`font-bold ${score > 0 ? 'text-white' : 'text-muted-foreground'}`}>
                                  {score}
                                </span>
                              </div>
                            </div>
                          </td>
                        );
                      })}
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center">
                          <span className={`px-3 py-2 rounded-lg font-bold ${
                            isKommunicate ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'
                          }`}>
                            {competitor.totalScore}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-semibold text-foreground mb-4">Keyword: "{keywords[0]}"</h3>
            <div className="space-y-2">
              {competitorData
                .map(c => ({ name: c.name, score: c.keyword1Score }))
                .sort((a, b) => b.score - a.score)
                .map((item, idx) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground w-4">{idx + 1}.</span>
                      <span className={item.name === 'Kommunicate' ? 'text-primary font-medium' : 'text-foreground'}>
                        {item.name}
                      </span>
                    </div>
                    <span className={`px-2 py-1 rounded text-sm ${
                      item.name === 'Kommunicate' ? 'bg-primary/20 text-primary' : 'bg-muted text-foreground'
                    }`}>
                      {item.score}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-semibold text-foreground mb-4">Keyword: "{keywords[1]}"</h3>
            <div className="space-y-2">
              {competitorData
                .map(c => ({ name: c.name, score: c.keyword2Score }))
                .sort((a, b) => b.score - a.score)
                .map((item, idx) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground w-4">{idx + 1}.</span>
                      <span className={item.name === 'Kommunicate' ? 'text-primary font-medium' : 'text-foreground'}>
                        {item.name}
                      </span>
                    </div>
                    <span className={`px-2 py-1 rounded text-sm ${
                      item.name === 'Kommunicate' ? 'bg-primary/20 text-primary' : 'bg-muted text-foreground'
                    }`}>
                      {item.score}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CompetitorsTopics;
