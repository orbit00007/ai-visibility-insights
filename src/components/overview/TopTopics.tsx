import { getAnalytics, competitorData } from "@/data/analyticsData";

export const TopTopics = () => {
  const analytics = getAnalytics();
  const keywords = analytics?.analysis_scope?.search_keywords || [];
  const visibilityTable = analytics?.competitor_visibility_table;

  // Get Kommunicate's row
  const kommunicateRow = visibilityTable?.rows?.find(row => row[0] === 'Kommunicate');
  
  // Create topics from keywords with actual data
  const topics = keywords.map((keyword, idx) => {
    const score = kommunicateRow ? kommunicateRow[idx + 1] as number : 0;
    // Calculate max score for this keyword
    let maxScore = 0;
    visibilityTable?.rows?.forEach(row => {
      const s = row[idx + 1] as number;
      if (s > maxScore) maxScore = s;
    });
    const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
    
    return {
      name: keyword,
      mentions: score,
      responses: visibilityTable?.rows?.length || 0,
      percentage
    };
  });

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
