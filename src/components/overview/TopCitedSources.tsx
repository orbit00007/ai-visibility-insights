import { FileText } from "lucide-react";

export const TopCitedSources = () => {
  const sources = [
    { domain: "kommunicate.io", responses: 5 },
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Top Cited Sources</h3>
        <button className="text-primary text-sm font-medium hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {sources.map((source) => (
          <div key={source.domain} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-muted flex items-center justify-center">
                <FileText className="w-3 h-3 text-muted-foreground" />
              </div>
              <span className="text-foreground">{source.domain}</span>
            </div>
            <span className="text-muted-foreground text-sm">{source.responses} responses</span>
          </div>
        ))}
      </div>
    </div>
  );
};
