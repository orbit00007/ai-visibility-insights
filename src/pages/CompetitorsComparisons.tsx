import { Layout } from "@/components/layout/Layout";
import { getAnalytics, competitorData, competitorSentiment, getCompetitorVisibility, getBrandName, getKeywords } from "@/data/analyticsData";
import { TierBadge } from "@/components/ui/TierBadge";
import { useState } from "react";

const CompetitorsComparisons = () => {
  const analytics = getAnalytics();
  const visibilityTable = analytics?.competitor_visibility_table;
  const brandName = getBrandName();
  const keywords = getKeywords();
  const competitorVisibility = getCompetitorVisibility();
  
  const otherCompetitors = competitorData.filter(c => c.name !== brandName);
  const [selectedCompetitor, setSelectedCompetitor] = useState<string>(otherCompetitors[0]?.name || '');

  // Get brand data
  const brand = competitorVisibility.find(c => c.name === brandName);
  const competitor = competitorVisibility.find(c => c.name === selectedCompetitor);

  const brandSentiment = competitorSentiment.find(s => s.brand === brandName);
  const competitorSentimentData = competitorSentiment.find(s => s.brand === selectedCompetitor);

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold text-foreground">Competitor Comparisons</h1>

        {/* Competitor Selector */}
        <div className="flex items-center gap-4">
          <span className="text-muted-foreground">Compare {brandName} with:</span>
          <select
            value={selectedCompetitor}
            onChange={(e) => setSelectedCompetitor(e.target.value)}
            className="bg-muted/30 border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {otherCompetitors.map(c => (
              <option key={c.name} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Side by Side Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Primary Brand */}
          <div className="bg-card rounded-xl border-2 border-primary p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                {brandName[0]}
              </div>
              <h3 className="text-xl font-bold text-primary">{brandName}</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Score</span>
                <span className="text-2xl font-bold text-foreground">{brand?.totalScore || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Visibility %</span>
                <span className="text-xl font-semibold text-foreground">{brand?.visibility || 0}%</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${brand?.visibility || 0}%` }}
                />
              </div>
              <div className="pt-4 border-t border-border">
                <span className="text-sm text-muted-foreground">Sentiment:</span>
                <TierBadge tier={brandSentiment?.outlook || 'N/A'} className="ml-2" />
                <p className="mt-2 text-sm text-muted-foreground">{brandSentiment?.summary}</p>
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
                  className="h-full bg-slate-400 rounded-full transition-all duration-500"
                  style={{ width: `${competitor?.visibility || 0}%` }}
                />
              </div>
              <div className="pt-4 border-t border-border">
                <span className="text-sm text-muted-foreground">Sentiment:</span>
                <TierBadge tier={competitorSentimentData?.outlook || 'N/A'} className="ml-2" />
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
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Keyword</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-primary uppercase tracking-wider">{brandName}</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{selectedCompetitor}</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Difference</th>
                </tr>
              </thead>
              <tbody>
                {keywords.map((keyword, index) => {
                  const brandRow = visibilityTable?.rows?.find(r => r[0] === brandName);
                  const competitorRow = visibilityTable?.rows?.find(r => r[0] === selectedCompetitor);
                  
                  const bScore = brandRow ? brandRow[index + 1] as number : 0;
                  const cScore = competitorRow ? competitorRow[index + 1] as number : 0;
                  const diff = bScore - cScore;

                  return (
                    <tr key={keyword} className="border-b border-border/50 hover:bg-muted/20">
                      <td className="py-3 px-4 text-foreground">{keyword}</td>
                      <td className="py-3 px-4 text-center">
                        <span className="px-3 py-1.5 bg-primary/20 text-primary rounded font-semibold">{bScore}</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="px-3 py-1.5 bg-muted text-foreground rounded font-semibold">{cScore}</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-3 py-1.5 rounded font-semibold ${
                          diff > 0 ? 'bg-green-500 text-white' :
                          diff < 0 ? 'bg-red-500 text-white' :
                          'bg-slate-500 text-white'
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
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Brand</th>
                  {keywords.map(keyword => (
                    <th key={keyword} className="text-center py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{keyword}</th>
                  ))}
                  <th className="text-center py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody>
                {competitorData.map(c => {
                  const isPrimaryBrand = c.name === brandName;
                  return (
                    <tr key={c.name} className={`border-b border-border/50 hover:bg-muted/20 ${isPrimaryBrand ? 'bg-primary/5' : ''}`}>
                      <td className={`py-3 px-4 font-medium ${isPrimaryBrand ? 'text-primary' : 'text-foreground'}`}>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${isPrimaryBrand ? 'bg-primary' : 'bg-muted-foreground/40'}`} />
                          {c.name}
                        </div>
                      </td>
                      {c.keywordScores.map((score, idx) => (
                        <td key={idx} className="py-3 px-4 text-center text-foreground">{score}</td>
                      ))}
                      <td className="py-3 px-4 text-center">
                        <span className={`px-3 py-1.5 rounded font-semibold ${isPrimaryBrand ? 'bg-primary text-white' : 'bg-muted text-foreground'}`}>
                          {c.totalScore}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CompetitorsComparisons;
