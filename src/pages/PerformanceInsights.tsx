import { Layout } from "@/components/layout/Layout";
import { TierBadge } from "@/components/ui/TierBadge";
import { sourcesData, llmData, getDepthNotes, getBrandName, competitorData } from "@/data/analyticsData";
import { Info, TrendingUp, Database, Cpu } from "lucide-react";

const PerformanceInsights = () => {
  const depthNotes = getDepthNotes();
  const brandName = getBrandName();

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Page Title */}
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-foreground">Performance Insights</h1>
          <Info className="w-4 h-4 text-muted-foreground cursor-help" />
        </div>

        {/* Platform-wise Brand Performance */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center gap-2 mb-6">
            <Database className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Platform-wise Brand Performance</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Source</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Tidio</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">ManyChat</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Landbot</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Ada</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Zendesk</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground bg-primary/5">{brandName}</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Cited by LLMs</th>
                </tr>
              </thead>
              <tbody>
                {sourcesData.map((source, index) => (
                  <tr key={index} className="border-b border-border/50 hover:bg-muted/20">
                    <td className="py-3 px-4 font-medium text-foreground">{source.name}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <TierBadge tier={source.tidioPresence} />
                        <span className="text-xs text-muted-foreground">{source.tidioMentions} mentions</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <TierBadge tier={source.manyChatPresence} />
                        <span className="text-xs text-muted-foreground">{source.manyChatMentions} mentions</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <TierBadge tier={source.landbotPresence} />
                        <span className="text-xs text-muted-foreground">{source.landbotMentions} mentions</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <TierBadge tier={source.adaPresence} />
                        <span className="text-xs text-muted-foreground">{source.adaMentions} mentions</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <TierBadge tier={source.zendeskPresence} />
                        <span className="text-xs text-muted-foreground">{source.zendeskMentions} mentions</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center bg-primary/5">
                      <div className="flex flex-col items-center gap-1">
                        <TierBadge tier={source.kommunicatePresence} />
                        <span className="text-xs text-muted-foreground">{source.kommunicateMentions} mentions</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <TierBadge tier={source.citedByLLMs} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* LLM-wise Performance */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center gap-2 mb-6">
            <Cpu className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">LLM-wise Brand Performance</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(llmData).map(([platform, data]: [string, any]) => (
              <div key={platform} className="bg-muted/30 rounded-lg p-4 border border-border">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-foreground capitalize text-lg">{platform}</span>
                  <span className="text-2xl font-bold text-primary">{data.brand_mentions_count}</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Queries with brand:</span>
                    <span className="font-medium text-foreground">{data.queries_with_brand}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Average rank:</span>
                    <span className="font-medium text-foreground">#{data.average_brand_rank}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Source Insights for Kommunicate */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Source Insights for {brandName}</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(depthNotes).map(([source, data]: [string, any]) => (
              <div key={source} className="bg-muted/30 rounded-lg p-4 border border-border">
                <h4 className="font-medium text-foreground mb-2">{source}</h4>
                <p className="text-sm text-muted-foreground mb-3">{data.insight}</p>
                <div className="flex flex-wrap gap-1">
                  {data.pages_used.map((page: string, idx: number) => (
                    <span key={idx} className="text-xs bg-muted px-2 py-1 rounded">
                      {page}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pages Used by Source */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Content Types by Source</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sourcesData.map((source, idx) => (
              <div key={idx} className="bg-muted/30 rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-2">{source.name}</h4>
                <div className="flex flex-wrap gap-1">
                  {source.pagesUsed.map((page, pidx) => (
                    <span key={pidx} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                      {page}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PerformanceInsights;
