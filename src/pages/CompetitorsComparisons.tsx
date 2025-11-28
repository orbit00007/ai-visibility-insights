import { Layout } from "@/components/layout/Layout";
import { getAnalytics, competitorData, competitorSentiment } from "@/data/analyticsData";
import { useState } from "react";
import { ArrowUpDown } from "lucide-react";

const CompetitorsComparisons = () => {
  const analytics = getAnalytics();
  const visibilityTable = analytics?.competitor_visibility_table;
  const [selectedCompetitor, setSelectedCompetitor] = useState<string>('Tidio');

  // Get Kommunicate data
  const kommunicate = competitorData.find(c => c.name === 'Kommunicate');
  const competitor = competitorData.find(c => c.name === selectedCompetitor);

  const kommunicateSentiment = competitorSentiment.find(s => s.brand === 'Kommunicate');
  const competitorSentimentData = competitorSentiment.find(s => s.brand === selectedCompetitor);

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold text-foreground">Competitor Comparisons</h1>

        {/* Competitor Selector */}
        <div className="flex items-center gap-4">
          <span className="text-muted-foreground">Compare Kommunicate with:</span>
          <select
            value={selectedCompetitor}
            onChange={(e) => setSelectedCompetitor(e.target.value)}
            className="bg-muted/30 border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {competitorData.filter(c => c.name !== 'Kommunicate').map(c => (
              <option key={c.name} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Side by Side Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Kommunicate */}
          <div className="bg-card rounded-xl border border-primary p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                K
              </div>
              <h3 className="text-xl font-bold text-primary">Kommunicate</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Score</span>
                <span className="text-2xl font-bold text-foreground">{kommunicate?.totalScore || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Visibility %</span>
                <span className="text-xl font-semibold text-foreground">{kommunicate?.visibility || 0}%</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${kommunicate?.visibility || 0}%` }}
                />
              </div>
              <div className="pt-4 border-t border-border">
                <span className="text-sm text-muted-foreground">Sentiment:</span>
                <span className={`ml-2 px-2 py-1 rounded text-sm ${
                  kommunicateSentiment?.outlook === 'Positive' ? 'bg-green-500/20 text-green-400' :
                  kommunicateSentiment?.outlook === 'Negative' ? 'bg-red-500/20 text-red-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {kommunicateSentiment?.outlook || 'N/A'}
                </span>
                <p className="mt-2 text-sm text-muted-foreground">{kommunicateSentiment?.summary}</p>
              </div>
            </div>
          </div>

          {/* Selected Competitor */}
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-foreground font-bold">
                {selectedCompetitor[0]}
              </div>
              <h3 className="text-xl font-bold text-foreground">{selectedCompetitor}</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Score</span>
                <span className="text-2xl font-bold text-foreground">{competitor?.totalScore || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Visibility %</span>
                <span className="text-xl font-semibold text-foreground">{competitor?.visibility || 0}%</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-muted-foreground rounded-full transition-all duration-500"
                  style={{ width: `${competitor?.visibility || 0}%` }}
                />
              </div>
              <div className="pt-4 border-t border-border">
                <span className="text-sm text-muted-foreground">Sentiment:</span>
                <span className={`ml-2 px-2 py-1 rounded text-sm ${
                  competitorSentimentData?.outlook === 'Positive' ? 'bg-green-500/20 text-green-400' :
                  competitorSentimentData?.outlook === 'Negative' ? 'bg-red-500/20 text-red-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {competitorSentimentData?.outlook || 'N/A'}
                </span>
                <p className="mt-2 text-sm text-muted-foreground">{competitorSentimentData?.summary}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Keyword Breakdown */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Keyword-by-Keyword Breakdown</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Keyword</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-primary">Kommunicate</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">{selectedCompetitor}</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Difference</th>
                </tr>
              </thead>
              <tbody>
                {visibilityTable?.header?.slice(1).map((keyword, index) => {
                  const kommunicateRow = visibilityTable.rows.find(r => r[0] === 'Kommunicate');
                  const competitorRow = visibilityTable.rows.find(r => r[0] === selectedCompetitor);
                  
                  const kScore = kommunicateRow ? kommunicateRow[index + 1] as number : 0;
                  const cScore = competitorRow ? competitorRow[index + 1] as number : 0;
                  const diff = kScore - cScore;

                  return (
                    <tr key={keyword} className="border-b border-border/50 hover:bg-muted/20">
                      <td className="py-3 px-4 text-foreground">{keyword}</td>
                      <td className="py-3 px-4 text-center">
                        <span className="px-2 py-1 bg-primary/20 text-primary rounded">{kScore}</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="px-2 py-1 bg-muted text-foreground rounded">{cScore}</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded ${
                          diff > 0 ? 'bg-green-500/20 text-green-400' :
                          diff < 0 ? 'bg-red-500/20 text-red-400' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {diff > 0 ? '+' : ''}{diff}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* All Competitors Table */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">All Competitors Overview</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Brand</th>
                  {visibilityTable?.header?.slice(1).map(keyword => (
                    <th key={keyword} className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">{keyword}</th>
                  ))}
                  <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Total</th>
                </tr>
              </thead>
              <tbody>
                {competitorData.map(c => (
                  <tr key={c.name} className={`border-b border-border/50 hover:bg-muted/20 ${c.name === 'Kommunicate' ? 'bg-primary/5' : ''}`}>
                    <td className={`py-3 px-4 font-medium ${c.name === 'Kommunicate' ? 'text-primary' : 'text-foreground'}`}>
                      {c.name}
                    </td>
                    <td className="py-3 px-4 text-center text-foreground">{c.keyword1Score}</td>
                    <td className="py-3 px-4 text-center text-foreground">{c.keyword2Score}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-1 rounded ${c.name === 'Kommunicate' ? 'bg-primary/20 text-primary' : 'bg-muted text-foreground'}`}>
                        {c.totalScore}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CompetitorsComparisons;
