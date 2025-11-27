import { Layout } from "@/components/layout/Layout";
import { competitorComparisons } from "@/data/analyticsData";

const CompetitorsComparisons = () => {
  return (
    <Layout>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {competitorComparisons.map((comparison) => (
            <div
              key={comparison.competitor}
              className="bg-card rounded-xl border border-border p-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-muted flex items-center justify-center text-xs">
                    ◈
                  </div>
                  <span className="font-semibold text-primary">Kommunicate</span>
                </div>
                <span className="text-muted-foreground">vs</span>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-muted flex items-center justify-center text-xs">
                    {getCompetitorIcon(comparison.competitor)}
                  </div>
                  <span className="font-semibold text-foreground">{comparison.competitor}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <span>
                  Kommunicate appears higher for {comparison.kommunicateHigher}% of shared prompts
                </span>
                <span>{comparison.sharedPrompts} shared prompts</span>
              </div>

              {/* Progress Bar */}
              <div className="h-3 bg-amplitude-yellow rounded-full mb-6" />

              {/* Leads Comparison */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span className="text-sm font-medium text-foreground">Kommunicate leads in:</span>
                  </div>
                  {comparison.kommunicateLeadsIn.length > 0 ? (
                    <div className="space-y-2">
                      {comparison.kommunicateLeadsIn.map((lead) => (
                        <div key={lead.topic} className="flex items-center justify-between">
                          <span className="text-sm text-foreground">{lead.topic}</span>
                          <span className="text-sm font-medium text-foreground">{lead.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">No significant leads</span>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full bg-amplitude-yellow" />
                    <span className="text-sm font-medium text-foreground">{comparison.competitor} leads in:</span>
                  </div>
                  {comparison.competitorLeadsIn.length > 0 ? (
                    <div className="space-y-2">
                      {comparison.competitorLeadsIn.map((lead) => (
                        <div key={lead.topic} className="flex items-center justify-between">
                          <span className="text-sm text-foreground">{lead.topic}</span>
                          <span className="text-sm font-medium text-foreground">{lead.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">No significant leads</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

const getCompetitorIcon = (name: string) => {
  const icons: Record<string, string> = {
    Zendesk: "⬡",
    Intercom: "▣",
    Tidio: "◈",
    HubSpot: "⬢",
    Drift: "◉",
  };
  return icons[name] || "○";
};

export default CompetitorsComparisons;
