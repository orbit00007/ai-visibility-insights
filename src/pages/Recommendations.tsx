import { Layout } from "@/components/layout/Layout";
import { analyticsData } from "@/data/analyticsData";
import { ArrowUp, ArrowRight, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

const Recommendations = () => {
  const recommendations = analyticsData.analytics[0].analytics.recommendations;

  const getEffortBadge = (effort: string) => {
    const colors: Record<string, string> = {
      High: "bg-destructive/10 text-destructive",
      Medium: "bg-amplitude-yellow/10 text-amplitude-yellow",
      Low: "bg-amplitude-green/10 text-amplitude-green",
    };
    return colors[effort] || "bg-muted text-muted-foreground";
  };

  const getImpactIcon = (impact: string) => {
    if (impact === "High") return <ArrowUp className="w-4 h-4 text-amplitude-green" />;
    return <ArrowRight className="w-4 h-4 text-amplitude-yellow" />;
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">Recommendations</h1>
          <p className="text-muted-foreground">
            Actionable insights to improve your AI visibility based on your current performance.
          </p>
        </div>

        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className="bg-card rounded-xl border border-border p-6 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-5 h-5 text-primary" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={cn("px-2 py-1 rounded-full text-xs font-medium", getEffortBadge(rec.overall_effort))}>
                      {rec.overall_effort} Effort
                    </span>
                    <div className="flex items-center gap-1 text-sm">
                      {getImpactIcon(rec.impact)}
                      <span className="text-muted-foreground">{rec.impact} Impact</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {rec.overall_insight}
                  </h3>
                  
                  <p className="text-muted-foreground">
                    <span className="font-medium text-foreground">Suggested Action: </span>
                    {rec.suggested_action}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Executive Summary */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-foreground mb-4">Executive Summary</h2>
          <div className="bg-card rounded-xl border border-border p-6">
            <p className="text-lg font-medium text-foreground mb-4">
              {analyticsData.analytics[0].analytics.executive_summary.brand_score_and_tier}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold text-amplitude-green mb-3">Strengths</h4>
                <ul className="space-y-2">
                  {analyticsData.analytics[0].analytics.executive_summary.strengths.map((strength, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground">
                      <span className="text-amplitude-green mt-1">✓</span>
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-destructive mb-3">Weaknesses</h4>
                <ul className="space-y-2">
                  {analyticsData.analytics[0].analytics.executive_summary.weaknesses.map((weakness, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground">
                      <span className="text-destructive mt-1">✗</span>
                      {weakness}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <h4 className="font-semibold text-foreground mb-3">Prioritized Actions</h4>
              <ol className="space-y-2">
                {analyticsData.analytics[0].analytics.executive_summary.prioritized_actions.map((action, i) => (
                  <li key={i} className="flex items-start gap-2 text-muted-foreground">
                    <span className="font-bold text-primary">{i + 1}.</span>
                    {action}
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-6 p-4 bg-muted/30 rounded-lg">
              <p className="text-foreground">
                <span className="font-semibold">Conclusion: </span>
                {analyticsData.analytics[0].analytics.executive_summary.conclusion}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Recommendations;
