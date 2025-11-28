import rawData from './data.json';

export const analyticsData = rawData;

// Helper to get the main analytics object
export const getAnalytics = () => rawData.analytics[0]?.analytics;

// Competitor data derived from competitor_visibility_table
export const competitorData = (() => {
  const analytics = getAnalytics();
  if (!analytics?.competitor_visibility_table?.rows) return [];
  
  return analytics.competitor_visibility_table.rows.map(row => {
    const name = row[0] as string;
    const keyword1Score = row[1] as number;
    const keyword2Score = row[2] as number;
    const totalScore = keyword1Score + keyword2Score;
    
    // Calculate visibility percentage relative to max (Tidio has 17)
    const maxScore = 17;
    const visibility = Math.round((totalScore / maxScore) * 100);
    
    return {
      name,
      keyword1Score,
      keyword2Score,
      totalScore,
      visibility
    };
  }).sort((a, b) => b.totalScore - a.totalScore);
})();

// Sources data derived from sources_and_content_impact
export const sourcesData = (() => {
  const analytics = getAnalytics();
  if (!analytics?.sources_and_content_impact?.rows) return [];
  
  return analytics.sources_and_content_impact.rows.map(row => ({
    name: row[0] as string,
    kommunicateMentions: row[17] as number,
    kommunicateScore: row[18] as string,
    citedByLLMs: row[19] as string,
    pagesUsed: row[20] as string[]
  }));
})();

// LLM-wise data
export const llmData = (() => {
  const analytics = getAnalytics();
  return analytics?.llm_wise_data || {};
})();

// Recommendations
export const recommendations = (() => {
  const analytics = getAnalytics();
  return analytics?.recommendations || [];
})();

// Executive Summary
export const executiveSummary = (() => {
  const analytics = getAnalytics();
  return analytics?.executive_summary || {
    brand_score_and_tier: '',
    strengths: [],
    weaknesses: [],
    competitor_positioning: { leaders: [], mid_tier: [], laggards: [] },
    prioritized_actions: [],
    conclusion: ''
  };
})();

// Competitor sentiment data
export const competitorSentiment = (() => {
  const analytics = getAnalytics();
  if (!analytics?.competitor_sentiment_table?.rows) return [];
  
  return analytics.competitor_sentiment_table.rows.map(row => ({
    brand: row[0] as string,
    summary: row[1] as string,
    outlook: row[2] as string
  }));
})();
