import { Layout } from "@/components/layout/Layout";
import { getAnalytics, getBrandName } from "@/data/analyticsData";
import { ChevronDown, ChevronRight, Search } from "lucide-react";
import { useState } from "react";

const Prompts = () => {
  const analytics = getAnalytics();
  const brandName = getBrandName();
  const keywords = analytics?.analysis_scope?.search_keywords || [];
  const visibilityTable = analytics?.competitor_visibility_table;
  const [expandedKeyword, setExpandedKeyword] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredKeywords = keywords.filter(k => 
    k.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get brand's scores for each keyword
  const brandRow = visibilityTable?.rows?.find(row => row[0] === brandName);

  const getScoreClasses = (score: number) => {
    if (score >= 7) return 'bg-green-500 text-white';
    if (score >= 4) return 'bg-amber-500 text-white';
    if (score > 0) return 'bg-red-500 text-white';
    return 'bg-gray-500 text-white';
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Prompts</h1>
          <div className="text-sm text-muted-foreground">
            {keywords.length} keywords analyzed
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search prompts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-muted/30 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Keywords Table */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground w-8"></th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Keyword / Prompt</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">{brandName} Score</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Top Competitor</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Top Score</th>
              </tr>
            </thead>
            <tbody>
              {filteredKeywords.map((keyword, index) => {
                const keywordIndex = index + 1;
                const brandScore = brandRow ? brandRow[keywordIndex] as number : 0;
                
                // Find top competitor for this keyword
                let topCompetitor = '';
                let topScore = 0;
                visibilityTable?.rows?.forEach(row => {
                  const score = row[keywordIndex] as number;
                  if (score > topScore) {
                    topScore = score;
                    topCompetitor = row[0] as string;
                  }
                });

                const isExpanded = expandedKeyword === keyword;

                return (
                  <>
                    <tr 
                      key={keyword}
                      className="border-b border-border/50 hover:bg-muted/20 cursor-pointer"
                      onClick={() => setExpandedKeyword(isExpanded ? null : keyword)}
                    >
                      <td className="py-3 px-4">
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        )}
                      </td>
                      <td className="py-3 px-4 font-medium text-foreground">{keyword}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-sm font-medium ${getScoreClasses(brandScore)}`}>
                          {brandScore}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{topCompetitor}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded text-sm font-medium bg-primary text-primary-foreground">
                          {topScore}
                        </span>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr className="bg-muted/10">
                        <td colSpan={5} className="py-4 px-8">
                          <div className="space-y-4">
                            <h4 className="font-medium text-foreground">All Competitors for "{keyword}"</h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                              {visibilityTable?.rows?.map(row => {
                                const name = row[0] as string;
                                const score = row[keywordIndex] as number;
                                const isBrand = name === brandName;
                                return (
                                  <div key={name} className="flex items-center justify-between bg-card p-3 rounded-lg border border-border">
                                    <span className={isBrand ? 'text-primary font-medium' : 'text-foreground'}>
                                      {name}
                                    </span>
                                    <span className={`px-2 py-1 rounded text-sm font-medium ${getScoreClasses(score)}`}>
                                      {score}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredKeywords.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No prompts found matching "{searchQuery}"
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Prompts;