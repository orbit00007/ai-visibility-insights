import { Layout } from "@/components/layout/Layout";
import { recommendations, executiveSummary } from "@/data/analyticsData";
import { Lightbulb, Target, Zap, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import { TOOLTIP_CONTENT } from "@/data/formulas";

const Recommendations = () => {
  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'High': return 'bg-red-500/20 text-red-400';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'Low': return 'bg-green-500/20 text-green-400';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-green-500/20 text-green-400';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'Low': return 'bg-red-500/20 text-red-400';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Recommendations</h1>
        </div>

        {/* Executive Summary */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Executive Summary
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-primary/10 rounded-lg">
              <span className="text-sm text-muted-foreground">Brand Score & Tier</span>
              <p className="text-foreground font-medium">{executiveSummary.brand_score_and_tier}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-500/10 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-medium text-green-400">Strengths</span>
                </div>
                <ul className="space-y-2">
                  {executiveSummary.strengths?.map((strength: string, idx: number) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-red-500/10 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span className="text-sm font-medium text-red-400">Weaknesses</span>
                </div>
                <ul className="space-y-2">
                  {executiveSummary.weaknesses?.map((weakness: string, idx: number) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      {weakness}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Competitor Positioning */}
            <div className="p-4 bg-muted/30 rounded-lg">
              <h4 className="font-medium text-foreground mb-3">Competitor Positioning</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <span className="text-xs text-green-400 font-medium">LEADERS</span>
                  {executiveSummary.competitor_positioning?.leaders?.map((item: any, idx: number) => (
                    <div key={idx} className="mt-2">
                      <span className="text-foreground font-medium">{item.name}</span>
                      <p className="text-sm text-muted-foreground">{item.summary}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <span className="text-xs text-yellow-400 font-medium">MID-TIER</span>
                  {executiveSummary.competitor_positioning?.mid_tier?.map((item: any, idx: number) => (
                    <div key={idx} className="mt-2">
                      <span className={`font-medium ${item.name === 'Kommunicate' ? 'text-primary' : 'text-foreground'}`}>
                        {item.name}
                      </span>
                      <p className="text-sm text-muted-foreground">{item.summary}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <span className="text-xs text-red-400 font-medium">LAGGARDS</span>
                  {executiveSummary.competitor_positioning?.laggards?.map((item: any, idx: number) => (
                    <div key={idx} className="mt-2">
                      <span className="text-foreground font-medium">{item.name}</span>
                      <p className="text-sm text-muted-foreground">{item.summary}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Prioritized Actions */}
            <div className="p-4 bg-primary/5 rounded-lg">
              <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                Prioritized Actions
              </h4>
              <ol className="space-y-2">
                {executiveSummary.prioritized_actions?.map((action: string, idx: number) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary font-medium">{idx + 1}.</span>
                    {action}
                  </li>
                ))}
              </ol>
            </div>

            {/* Conclusion */}
            <div className="p-4 border border-primary/30 rounded-lg">
              <span className="text-sm text-muted-foreground">Conclusion</span>
              <p className="text-foreground mt-1">{executiveSummary.conclusion}</p>
            </div>
          </div>
        </div>

        {/* Recommendations List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Detailed Recommendations
          </h2>

          {recommendations.map((rec: any, index: number) => (
            <div key={index} className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-muted-foreground">Insight #{index + 1}</span>
                  </div>
                  <p className="text-foreground">{rec.overall_insight}</p>
                </div>
                <div className="flex gap-2">
                  <div className="text-center">
                    <span className="text-xs text-muted-foreground block mb-1">Effort</span>
                    <span className={`px-2 py-1 rounded text-xs ${getEffortColor(rec.overall_effort)}`}>
                      {rec.overall_effort}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="text-xs text-muted-foreground block mb-1">Impact</span>
                    <span className={`px-2 py-1 rounded text-xs ${getImpactColor(rec.impact)}`}>
                      {rec.impact}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">Suggested Action</span>
                </div>
                <p className="text-sm text-muted-foreground">{rec.suggested_action}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Recommendations;
