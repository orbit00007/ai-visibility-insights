import { Layout } from "@/components/layout/Layout";
import { recommendations } from "@/data/analyticsData";
import { Lightbulb, Target, TrendingUp } from "lucide-react";

const Recommendations = () => {
  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'High': return 'bg-red-500 text-white';
      case 'Medium': return 'bg-amber-500 text-white';
      case 'Low': return 'bg-green-500 text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-green-500 text-white';
      case 'Medium': return 'bg-amber-500 text-white';
      case 'Low': return 'bg-red-500 text-white';
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
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getEffortColor(rec.overall_effort)}`}>
                      {rec.overall_effort}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="text-xs text-muted-foreground block mb-1">Impact</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getImpactColor(rec.impact)}`}>
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