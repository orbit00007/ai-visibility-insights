import { Layout } from "@/components/layout/Layout";
import { HeroCard } from "@/components/overview/HeroCard";
import { CompetitorMentions } from "@/components/overview/CompetitorMentions";
import { TopTopics } from "@/components/overview/TopTopics";
import { TopCitedSources } from "@/components/overview/TopCitedSources";
import { analyticsData, getAnalytics, llmData, competitorSentiment } from "@/data/analyticsData";
import { Info, TrendingUp, MessageSquare, ThumbsUp } from "lucide-react";
import { TOOLTIP_CONTENT, calculateAIVisibilityTier, calculateBrandMentionsTier } from "@/data/formulas";

const Overview = () => {
  const analytics = getAnalytics();
  const aiVisibility = analytics?.ai_visibility;
  const brandMentions = analytics?.brand_mentions;
  const sentiment = analytics?.sentiment;

  // Calculate brand mentions tier
  const topBrandMentions = 17; // Tidio's total
  const ourMentions = aiVisibility?.weighted_mentions_total || 0;
  const { tier: mentionsTier, ratio: mentionsRatio } = calculateBrandMentionsTier(ourMentions, topBrandMentions);

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Page Title */}
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-foreground">Overall Insights</h1>
          <Info className="w-4 h-4 text-muted-foreground cursor-help" />
        </div>

        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* AI Visibility Card */}
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">AI Visibility</span>
              <Info className="w-3 h-3 text-muted-foreground cursor-help" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-foreground">{aiVisibility?.weighted_mentions_total || 0}</span>
              <span className={`text-sm px-2 py-0.5 rounded ${
                aiVisibility?.brand_tier === 'High' ? 'bg-green-500/20 text-green-400' :
                aiVisibility?.brand_tier === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {aiVisibility?.brand_tier || 'N/A'}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {aiVisibility?.breakdown?.calculation}
            </p>
          </div>

          {/* Brand Mentions Card */}
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Brand Mentions</span>
              <Info className="w-3 h-3 text-muted-foreground cursor-help" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-foreground">{brandMentions?.total_mentions || 0}</span>
              <span className={`text-sm px-2 py-0.5 rounded ${
                mentionsTier === 'High' ? 'bg-green-500/20 text-green-400' :
                mentionsTier === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {mentionsTier}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {brandMentions?.queries_with_mentions} queries, {brandMentions?.total_sources_checked} sources
            </p>
          </div>

          {/* Sentiment Card */}
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-2 mb-2">
              <ThumbsUp className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Sentiment</span>
              <Info className="w-3 h-3 text-muted-foreground cursor-help" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-foreground">{sentiment?.dominant_sentiment || 'N/A'}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
              {sentiment?.summary}
            </p>
          </div>
        </div>

        {/* LLM-wise Performance */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Platform-wise Brand Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(llmData).map(([platform, data]: [string, any]) => (
              <div key={platform} className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground capitalize">{platform}</span>
                  <span className="text-sm text-muted-foreground">{data.brand_mentions_count} mentions</span>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Queries with brand:</span>
                    <span>{data.queries_with_brand}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average rank:</span>
                    <span>{data.average_brand_rank}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <HeroCard />
          <CompetitorMentions />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TopTopics />
          <TopCitedSources />
        </div>

        {/* Competitor Sentiment Table */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Competitor Sentiment Analysis</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Brand</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Sentiment Summary</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Outlook</th>
                </tr>
              </thead>
              <tbody>
                {competitorSentiment.map((item, index) => (
                  <tr key={index} className="border-b border-border/50 hover:bg-muted/20">
                    <td className={`py-3 px-4 font-medium ${item.brand === 'Kommunicate' ? 'text-primary' : 'text-foreground'}`}>
                      {item.brand}
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{item.summary}</td>
                    <td className="py-3 px-4">
                      <span className={`text-sm px-2 py-1 rounded ${
                        item.outlook === 'Positive' ? 'bg-green-500/20 text-green-400' :
                        item.outlook === 'Negative' ? 'bg-red-500/20 text-red-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {item.outlook}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Overview;
