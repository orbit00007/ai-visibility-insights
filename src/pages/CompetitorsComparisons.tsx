import { Layout } from "@/components/layout/Layout";
import { getAnalytics, competitorData, competitorSentiment, getCompetitorVisibility, getBrandName, getKeywords, getBrandLogo, getBrandInfoWithLogos } from "@/data/analyticsData";
import { TierBadge } from "@/components/ui/TierBadge";
import { useState, useMemo } from "react";
import { Trophy, Users, TrendingUp } from "lucide-react";

const CompetitorsComparisons = () => {
  const analytics = getAnalytics();
  const visibilityTable = analytics?.competitor_visibility_table;
  const brandName = getBrandName();
  const keywords = getKeywords();
  const competitorVisibility = getCompetitorVisibility();
  const brandInfo = getBrandInfoWithLogos();
  
  const otherCompetitors = competitorData.filter(c => c.name !== brandName);
  const [selectedCompetitor, setSelectedCompetitor] = useState<string>(otherCompetitors[0]?.name || '');

  // Get brand data
  const brand = competitorVisibility.find(c => c.name === brandName);
  const competitor = competitorVisibility.find(c => c.name === selectedCompetitor);

  const brandSentiment = competitorSentiment.find(s => s.brand === brandName);
  const competitorSentimentData = competitorSentiment.find(s => s.brand === selectedCompetitor);

  const brandLogo = getBrandLogo(brandName);
  const competitorLogo = getBrandLogo(selectedCompetitor);

  // Sort competitor data by total score descending
  const sortedCompetitorData = useMemo(() => {
    return [...competitorData].sort((a, b) => b.totalScore - a.totalScore);
  }, []);

  // Sort competitor visibility by visibility descending
  const sortedCompetitorVisibility = useMemo(() => {
    return [...competitorVisibility].sort((a, b) => b.visibility - a.visibility);
  }, [competitorVisibility]);

  return (
    <Layout>
      <div className="p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border border-primary/20 p-4 md:p-6">
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Trophy className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground">Competitor Comparisons</h1>
              <p className="text-sm text-muted-foreground">Compare your brand visibility against competitors</p>
            </div>
          </div>
        </div>

        {/* Competitor Selector */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            <span className="text-muted-foreground text-sm md:text-base">Compare {brandName} with:</span>
          </div>
          <select
            value={selectedCompetitor}
            onChange={(e) => setSelectedCompetitor(e.target.value)}
            className="w-full md:w-auto bg-muted/30 border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {otherCompetitors.map(c => (
              <option key={c.name} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Side by Side Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Primary Brand */}
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border-2 border-primary p-4 md:p-6">
            <div className="flex items-center gap-3 mb-4">
              {brandLogo ? (
                <img 
                  src={brandLogo} 
                  alt={brandName} 
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full object-contain bg-white shadow-md"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              ) : (
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                  {brandName[0]}
                </div>
              )}
              <div>
                <h3 className="text-lg md:text-xl font-bold text-primary">{brandName}</h3>
                <span className="text-xs text-muted-foreground">Your Brand</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-card rounded-lg">
                <span className="text-muted-foreground text-sm">Total Score</span>
                <span className="text-2xl font-bold text-foreground">{brand?.totalScore || 0}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-card rounded-lg">
                <span className="text-muted-foreground text-sm">Visibility</span>
                <span className="text-xl font-semibold text-primary">{brand?.visibility || 0}%</span>
              </div>
              <div className="h-3 bg-card rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${brand?.visibility || 0}%` }}
                />
              </div>
              <div className="pt-4 border-t border-border/50">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-muted-foreground">Sentiment:</span>
                  <TierBadge tier={brandSentiment?.outlook || 'N/A'} />
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{brandSentiment?.summary}</p>
              </div>
            </div>
          </div>

          {/* Selected Competitor */}
          <div className="bg-card rounded-xl border border-border p-4 md:p-6">
            <div className="flex items-center gap-3 mb-4">
              {competitorLogo ? (
                <img 
                  src={competitorLogo} 
                  alt={selectedCompetitor} 
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full object-contain bg-white shadow-md"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              ) : (
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-muted flex items-center justify-center text-foreground font-bold text-lg">
                  {selectedCompetitor[0]}
                </div>
              )}
              <div>
                <h3 className="text-lg md:text-xl font-bold text-foreground">{selectedCompetitor}</h3>
                <span className="text-xs text-muted-foreground">Competitor</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <span className="text-muted-foreground text-sm">Total Score</span>
                <span className="text-2xl font-bold text-foreground">{competitor?.totalScore || 0}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <span className="text-muted-foreground text-sm">Visibility</span>
                <span className="text-xl font-semibold text-foreground">{competitor?.visibility || 0}%</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-muted-foreground/50 rounded-full transition-all duration-500"
                  style={{ width: `${competitor?.visibility || 0}%` }}
                />
              </div>
              <div className="pt-4 border-t border-border/50">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-muted-foreground">Sentiment:</span>
                  <TierBadge tier={competitorSentimentData?.outlook || 'N/A'} />
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{competitorSentimentData?.summary}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Keyword Breakdown */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="p-4 md:p-6 border-b border-border flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Keyword-by-Keyword Breakdown</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Keyword</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-primary uppercase tracking-wider">{brandName}</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{selectedCompetitor}</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Diff</th>
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
                      <td className="py-3 px-4 text-foreground text-sm">{keyword}</td>
                      <td className="py-3 px-4 text-center">
                        <span className="px-3 py-1.5 bg-primary/20 text-primary rounded font-semibold text-sm">{bScore}</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="px-3 py-1.5 bg-muted text-foreground rounded font-semibold text-sm">{cScore}</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-3 py-1.5 rounded font-semibold text-sm ${
                          diff > 0 ? 'bg-green-500 text-white' :
                          diff < 0 ? 'bg-red-500 text-white' :
                          'bg-muted text-foreground'
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

        {/* All Competitors Table - Sorted by Total Score */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="p-4 md:p-6 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">All Competitors Overview</h3>
            <p className="text-sm text-muted-foreground">Sorted by total visibility score (highest first)</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Brand</th>
                  {keywords.map(keyword => (
                    <th key={keyword} className="text-center py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">{keyword}</th>
                  ))}
                  <th className="text-center py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody>
                {sortedCompetitorData.map(c => {
                  const isPrimaryBrand = c.name === brandName;
                  return (
                    <tr key={c.name} className={`border-b border-border/50 hover:bg-muted/20 ${isPrimaryBrand ? 'bg-primary/5' : ''}`}>
                      <td className={`py-3 px-4 font-medium ${isPrimaryBrand ? 'text-primary' : 'text-foreground'}`}>
                        <div className="flex items-center gap-2">
                          {c.logo ? (
                            <img 
                              src={c.logo} 
                              alt={c.name} 
                              className="w-6 h-6 rounded-full object-contain bg-white"
                              onError={(e) => { e.currentTarget.style.display = 'none'; }}
                            />
                          ) : (
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              isPrimaryBrand ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                            }`}>
                              {c.name[0]}
                            </div>
                          )}
                          <span className="text-sm">{c.name}</span>
                        </div>
                      </td>
                      {c.keywordScores.map((score, idx) => (
                        <td key={idx} className="py-3 px-4 text-center text-foreground text-sm hidden md:table-cell">{score}</td>
                      ))}
                      <td className="py-3 px-4 text-center">
                        <span className={`px-3 py-1.5 rounded font-semibold text-sm ${isPrimaryBrand ? 'bg-primary text-white' : 'bg-muted text-foreground'}`}>
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
