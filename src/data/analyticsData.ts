import rawData from './data.json';
import { calculatePercentile, getTierFromPercentile } from './formulas';

export const analyticsData = rawData;

// Helper to get the main analytics object
export const getAnalytics = () => rawData.analytics[0]?.analytics;

// Get brand name
export const getBrandName = () => getAnalytics()?.brand_name || 'Kommunicate';

// Competitor data derived from competitor_visibility_table with percentiles
export const competitorData = (() => {
  const analytics = getAnalytics();
  if (!analytics?.competitor_visibility_table?.rows) return [];
  
  // Calculate total scores for all brands
  const allBrandScores = analytics.competitor_visibility_table.rows.map(row => {
    const keyword1Score = row[1] as number;
    const keyword2Score = row[2] as number;
    return keyword1Score + keyword2Score;
  });

  return analytics.competitor_visibility_table.rows.map(row => {
    const name = row[0] as string;
    const keyword1Score = row[1] as number;
    const keyword2Score = row[2] as number;
    const totalScore = keyword1Score + keyword2Score;
    const maxScore = Math.max(...allBrandScores);
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

// Get all brand total scores for percentile calculation
export const getAllBrandVisibilityScores = (): number[] => {
  return competitorData.map(c => c.totalScore);
};

// Calculate Kommunicate's visibility percentile
export const getVisibilityPercentile = (): { percentile: number; tier: string; totalBrands: number } => {
  const kommunicate = competitorData.find(c => c.name === 'Kommunicate');
  const allScores = getAllBrandVisibilityScores();
  const percentile = kommunicate 
    ? calculatePercentile(kommunicate.totalScore, allScores)
    : 0;
  return {
    percentile,
    tier: getTierFromPercentile(percentile),
    totalBrands: competitorData.length
  };
};

// Calculate raw mentions for each brand from sources_and_content_impact
export const getBrandMentionCounts = (): Record<string, number> => {
  const analytics = getAnalytics();
  if (!analytics?.sources_and_content_impact?.rows) return {};
  
  const brands = ['Tidio', 'ManyChat', 'Landbot', 'Ada', 'Zendesk', 'Kommunicate'];
  const mentionCounts: Record<string, number> = {};
  
  brands.forEach((brand, idx) => {
    // Each brand has 3 columns: presence, mentions count, score
    // Mentions column index: 2 + (idx * 3) + 1 = index for mentions
    const mentionsColumnIndex = 2 + (idx * 3);
    let totalMentions = 0;
    
    analytics.sources_and_content_impact.rows.forEach((row: any[]) => {
      const mentions = row[mentionsColumnIndex] as number;
      totalMentions += mentions;
    });
    
    mentionCounts[brand] = totalMentions;
  });
  
  return mentionCounts;
};

// Calculate Kommunicate's mentions percentile
export const getMentionsPercentile = (): { 
  percentile: number; 
  tier: string; 
  totalBrands: number;
  topBrandMentions: number;
  kommunicateMentions: number;
} => {
  const mentionCounts = getBrandMentionCounts();
  const allMentions = Object.values(mentionCounts);
  const kommunicateMentions = mentionCounts['Kommunicate'] || 0;
  const topBrandMentions = Math.max(...allMentions);
  const percentile = calculatePercentile(kommunicateMentions, allMentions);
  
  return {
    percentile,
    tier: getTierFromPercentile(percentile),
    totalBrands: Object.keys(mentionCounts).length,
    topBrandMentions,
    kommunicateMentions
  };
};

// Sources data derived from sources_and_content_impact
export const sourcesData = (() => {
  const analytics = getAnalytics();
  if (!analytics?.sources_and_content_impact?.rows) return [];
  
  return analytics.sources_and_content_impact.rows.map((row: any[]) => ({
    name: row[0] as string,
    tidioPresence: row[1] as string,
    tidioMentions: row[2] as number,
    tidioScore: row[3] as string,
    manyChatPresence: row[4] as string,
    manyChatMentions: row[5] as number,
    manyChatScore: row[6] as string,
    landbotPresence: row[7] as string,
    landbotMentions: row[8] as number,
    landbotScore: row[9] as string,
    adaPresence: row[10] as string,
    adaMentions: row[11] as number,
    adaScore: row[12] as string,
    zendeskPresence: row[13] as string,
    zendeskMentions: row[14] as number,
    zendeskScore: row[15] as string,
    kommunicatePresence: row[16] as string,
    kommunicateMentions: row[17] as number,
    kommunicateScore: row[18] as string,
    citedByLLMs: row[19] as string,
    pagesUsed: row[20] as string[]
  }));
})();

// Get depth notes for Kommunicate
export const getDepthNotes = () => {
  const analytics = getAnalytics();
  return analytics?.sources_and_content_impact?.depth_notes?.Kommunicate || {};
};

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
  
  return analytics.competitor_sentiment_table.rows.map((row: any[]) => ({
    brand: row[0] as string,
    summary: row[1] as string,
    outlook: row[2] as string
  }));
})();

// Get search keywords
export const getSearchKeywords = () => {
  const analytics = getAnalytics();
  return analytics?.analysis_scope?.search_keywords || [];
};

// Get sentiment
export const getSentiment = () => {
  const analytics = getAnalytics();
  return analytics?.sentiment || { dominant_sentiment: 'N/A', summary: '' };
};

// Get AI visibility data
export const getAIVisibility = () => {
  const analytics = getAnalytics();
  return analytics?.ai_visibility || null;
};

// Get brand mentions data
export const getBrandMentions = () => {
  const analytics = getAnalytics();
  return analytics?.brand_mentions || null;
};

// Get model name
export const getModelName = () => {
  const analytics = getAnalytics();
  return analytics?.model_name || '';
};

// Get analysis date
export const getAnalysisDate = () => {
  const data = rawData.analytics[0];
  return data?.date ? new Date(data.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }) : '';
};
