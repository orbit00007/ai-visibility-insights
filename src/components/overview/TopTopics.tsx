import { analyticsData } from "@/data/analyticsData";

export const TopTopics = () => {
  const keywords = analyticsData.analytics[0].analytics.analysis_scope.search_keywords;

  const topics = [
    { name: "No-Code Bot Builder", mentions: 2, responses: 24, percentage: 8 },
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Top Topics by Visibility</h3>
        <button className="text-primary text-sm font-medium hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {topics.map((topic) => (
          <div key={topic.name}>
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-foreground">{topic.name}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>{topic.mentions} mentions in {topic.responses} responses</span>
              <span className="font-medium text-foreground">{topic.percentage}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-destructive rounded-full transition-all duration-500"
                style={{ width: `${topic.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
