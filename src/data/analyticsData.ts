import rawData from './data.json';
import { calculatePercentile, getTierFromPercentile } from './formulas';

export const analyticsData = rawData;

// Helper to get the main analytics object
export const getAnalytics = () => rawData.analytics[0]?.analytics;

// Get brand name (fully dynamic from data)
export const getBrandName = () => getAnalytics()?.brand_name || '';

// Get brand website
export const getBrandWebsite = () => getAnalytics()?.brand_website || '';

// Get all competitor names from the visibility table
export const getCompetitorNames = (): string[] => {
  const analytics = getAnalytics();
  if (!analytics?.competitor_visibility_table?.rows) return [];
  return analytics.competitor_visibility_table.rows.map(row => row[0] as string);
};

// Get keywords from visibility table
export const getKeywords = (): string[] => {
  const analytics = getAnalytics();
  if (!analytics?.competitor_visibility_table?.header) return [];
  return analytics.competitor_visibility_table.header.slice(1);
};

// Get brand info with logos from percentile_trace
export const getBrandInfoWithLogos = (): Array<{
  brand: string;
  geo_score: number;
  brand_mentionscore: number;
  logo: string;
}> => {
  const analytics = getAnalytics();
  return analytics?.ai_visibility?.percentile_trace?.sorted_brand_info || [];
};

// Get logo for a specific brand
export const getBrandLogo = (brandName: string): string => {
  const brandInfo = getBrandInfoWithLogos();
  const brand = brandInfo.find(b => b.brand === brandName);
  return brand?.logo || '';
};

// Competitor data derived from competitor_visibility_table with percentiles
export const competitorData = (() => {
  const analytics = getAnalytics();
  if (!analytics?.competitor_visibility_table?.rows) return [];
  
  const keywords = getKeywords();
  const brandInfoWithLogos = getBrandInfoWithLogos();
  
  return analytics.competitor_visibility_table.rows.map(row => {
    const name = row[0] as string;
    const keywordScores: number[] = [];
    let totalScore = 0;
    
    for (let i = 1; i < row.length; i++) {
      const score = row[i] as number;
      keywordScores.push(score);
      totalScore += score;
    }
    
    // Get logo from percentile_trace
    const brandInfo = brandInfoWithLogos.find(b => b.brand === name);
    
    return {
      name,
      keywordScores,
      totalScore,
      logo: brandInfo?.logo || ''
    };
  }).sort((a, b) => b.totalScore - a.totalScore);
})();

// Calculate visibility for progress bars (relative to max)
export const getCompetitorVisibility = () => {
  const maxScore = Math.max(...competitorData.map(c => c.totalScore));
  return competitorData.map(c => ({
    ...c,
    visibility: maxScore > 0 ? Math.round((c.totalScore / maxScore) * 100) : 0
  }));
};

// Get all brand total scores for percentile calculation
export const getAllBrandVisibilityScores = (): number[] => {
  return competitorData.map(c => c.totalScore);
};

// Get AI Visibility data using geo_score and percentile_visibility from data
export const getAIVisibilityMetrics = (): { 
  score: number; 
  tier: string; 
  percentile: number;
  totalBrands: number;
  explanation: string;
  calculation: string;
} => {
  const analytics = getAnalytics();
  const aiVisibility = analytics?.ai_visibility;
  
  // Use geo_score and percentile_visibility directly from the data
  const score = aiVisibility?.geo_score || 0;
  const percentile = aiVisibility?.percentile_visibility || 0;
  const totalBrands = aiVisibility?.percentile_trace?.total_brands || competitorData.length;
  
  return {
    score,
    tier: getTierFromPercentile(percentile),
    percentile,
    totalBrands,
    explanation: aiVisibility?.explanation || '',
    calculation: aiVisibility?.percentile_trace?.calculation || ''
  };
};

// Legacy function for backward compatibility
export const getVisibilityPercentile = (): { percentile: number; tier: string; totalBrands: number } => {
  const metrics = getAIVisibilityMetrics();
  return {
    percentile: metrics.percentile,
    tier: metrics.tier,
    totalBrands: metrics.totalBrands
  };
};

// Calculate raw mentions for each brand from sources_and_content_impact
export const getBrandMentionCounts = (): Record<string, number> => {
  const analytics = getAnalytics();
  if (!analytics?.sources_and_content_impact?.rows) return {};
  
  const header = analytics.sources_and_content_impact.header;
  const mentionCounts: Record<string, number> = {};
  
  // Find all brand mention columns (columns that end with "Mentions")
  const mentionColumns: { brand: string; index: number }[] = [];
  header.forEach((col: string, idx: number) => {
    if (col.endsWith(' Mentions')) {
      const brand = col.replace(' Mentions', '');
      mentionColumns.push({ brand, index: idx });
    }
  });
  
  // Sum mentions for each brand across all sources
  mentionColumns.forEach(({ brand, index }) => {
    let totalMentions = 0;
    analytics.sources_and_content_impact.rows.forEach((row: any[]) => {
      const mentions = row[index] as number;
      totalMentions += mentions;
    });
    mentionCounts[brand] = totalMentions;
  });
  
  return mentionCounts;
};

// Calculate Brand's mentions percentile from sources_and_content_impact
export const getMentionsPercentile = (): { 
  percentile: number; 
  tier: string; 
  totalBrands: number;
  topBrandMentions: number;
  brandMentions: number;
  allBrandMentions: Record<string, number>;
} => {
  const mentionCounts = getBrandMentionCounts();
  const brandName = getBrandName();
  const allMentions = Object.values(mentionCounts);
  const brandMentions = mentionCounts[brandName] || 0;
  const topBrandMentions = allMentions.length > 0 ? Math.max(...allMentions) : 0;
  const percentile = allMentions.length > 0 ? calculatePercentile(brandMentions, allMentions) : 0;
  
  return {
    percentile,
    tier: getTierFromPercentile(percentile),
    totalBrands: Object.keys(mentionCounts).length,
    topBrandMentions,
    brandMentions,
    allBrandMentions: mentionCounts
  };
};

// Get all brands with their mention counts and calculated tiers
export const getAllBrandMentionsWithTiers = (): Array<{ brand: string; mentions: number; percentile: number; tier: string; logo: string }> => {
  const mentionCounts = getBrandMentionCounts();
  const allMentions = Object.values(mentionCounts);
  const brandInfoWithLogos = getBrandInfoWithLogos();
  
  return Object.entries(mentionCounts).map(([brand, mentions]) => {
    const percentile = calculatePercentile(mentions, allMentions);
    const brandInfo = brandInfoWithLogos.find(b => b.brand === brand);
    return {
      brand,
      mentions,
      percentile,
      tier: getTierFromPercentile(percentile),
      logo: brandInfo?.logo || ''
    };
  }).sort((a, b) => b.mentions - a.mentions);
};

// Get sources data with dynamic brand columns
export const getSourcesData = () => {
  const analytics = getAnalytics();
  if (!analytics?.sources_and_content_impact?.rows) return [];
  
  const header = analytics.sources_and_content_impact.header;
  const brands = getCompetitorNames();
  
  return analytics.sources_and_content_impact.rows.map((row: any[]) => {
    const sourceData: any = {
      name: row[0] as string,
      citedByLLMs: row[header.indexOf('Cited By LLMs')] as string,
      pagesUsed: row[header.indexOf('pages_used')] as string[]
    };
    
    // Add brand-specific data
    brands.forEach(brand => {
      const presenceIdx = header.indexOf(brand);
      const mentionsIdx = header.indexOf(`${brand} Mentions`);
      const scoreIdx = header.indexOf(`${brand} Mention Score`);
      
      if (presenceIdx !== -1) {
        sourceData[`${brand}Presence`] = row[presenceIdx];
      }
      if (mentionsIdx !== -1) {
        sourceData[`${brand}Mentions`] = row[mentionsIdx];
      }
      if (scoreIdx !== -1) {
        sourceData[`${brand}Score`] = row[scoreIdx];
      }
    });
    
    return sourceData;
  });
};

// Get depth notes for the brand
export const getDepthNotes = () => {
  const analytics = getAnalytics();
  const brandName = getBrandName();
  return analytics?.sources_and_content_impact?.depth_notes?.[brandName] || {};
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
  
  const brandInfoWithLogos = getBrandInfoWithLogos();
  
  return analytics.competitor_sentiment_table.rows.map((row: any[]) => {
    const brandName = row[0] as string;
    const brandInfo = brandInfoWithLogos.find(b => b.brand === brandName);
    return {
      brand: brandName,
      summary: row[1] as string,
      outlook: row[2] as string,
      logo: brandInfo?.logo || ''
    };
  });
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

// Get total mentions across all sources for the primary brand
export const getPrimaryBrandTotalMentions = (): number => {
  const mentionCounts = getBrandMentionCounts();
  const brandName = getBrandName();
  return mentionCounts[brandName] || 0;
};

// Get platform presence
export const getPlatformPresence = () => {
  const analytics = getAnalytics();
  return analytics?.platform_presence || {};
};
