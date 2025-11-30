import { Layout } from "@/components/layout/Layout";
import { HeroCard } from "@/components/overview/HeroCard";
import { CompetitorMentions } from "@/components/overview/CompetitorMentions";
import { TopTopics } from "@/components/overview/TopTopics";
import { TopCitedSources } from "@/components/overview/TopCitedSources";
import { PercentileGauge } from "@/components/ui/PercentileGauge";
import { TierBadge } from "@/components/ui/TierBadge";
import { 
  getAIVisibilityMetrics, 
  getMentionsPercentile, 
  getSentiment,
  llmData,
  getBrandName
} from "@/data/analyticsData";
import { Info, TrendingUp, MessageSquare, ThumbsUp } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Overview = () => {
  const visibilityData = getAIVisibilityMetrics();
  const mentionsData = getMentionsPercentile();
  const sentiment = getSentiment();
  const brandName = getBrandName();

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-foreground">Overall Insights</h1>
          <Tooltip>
            <TooltipTrigger>
              <Info className="w-4 h-4 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>Comprehensive overview of your brand's performance across AI platforms.</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* AI Visibility Card */}
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-foreground">AI Visibility</span>
              </div>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>Percentile rank based on visibility score compared to all competitors.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <PercentileGauge
              percentile={visibilityData.percentile}
              subtitle1={`Visibility Score: ${visibilityData.score}`}
              subtitle2={`${visibilityData.percentile}% ahead of ${visibilityData.totalBrands} brands`}
            />
            <div className="flex justify-center mt-3">
              <TierBadge tier={visibilityData.tier} />
            </div>
          </div>

          {/* Brand Mentions Card */}
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-foreground">Brand Mentions</span>
              </div>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>Percentile rank based on raw mention count across all sources.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <PercentileGauge
              percentile={mentionsData.percentile}
              subtitle1={`You are ahead of ${mentionsData.percentile}% of brands`}
              subtitle2={`Top brand: ${mentionsData.topBrandMentions} mentions`}
            />
            <div className="flex justify-center mt-3">
              <TierBadge tier={mentionsData.tier} />
            </div>
          </div>

          {/* Sentiment Card */}
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-foreground">Sentiment</span>
              </div>
              <Info className="w-4 h-4 text-muted-foreground cursor-help" />
            </div>
            <div className="flex flex-col items-center justify-center py-8">
              <TierBadge tier={sentiment.dominant_sentiment} className="text-lg px-4 py-2" />
              <p className="text-xs text-muted-foreground mt-4 text-center line-clamp-3">
                {sentiment.summary}
              </p>
            </div>
          </div>
        </div>

        {/* LLM Performance */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">LLM-wise Brand Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(llmData).map(([platform, data]: [string, any]) => (
              <div key={platform} className="bg-muted/30 rounded-lg p-4 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-foreground capitalize text-lg">{platform}</span>
                  <span className="text-2xl font-bold text-primary">{data.brand_mentions_count}</span>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Queries with brand:</span>
                    <span className="text-foreground font-medium">{data.queries_with_brand}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average rank:</span>
                    <span className="text-foreground font-medium">#{data.average_brand_rank}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <HeroCard />
          <CompetitorMentions />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TopTopics />
          <TopCitedSources />
        </div>
      </div>
    </Layout>
  );
};

export default Overview;
