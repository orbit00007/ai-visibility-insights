import { Layout } from "@/components/layout/Layout";
import { LLMVisibilityTable } from "@/components/overview/LLMVisibilityTable";
import { PlatformPresence } from "@/components/overview/PlatformPresence";
import { CompetitorComparisonChart } from "@/components/overview/CompetitorComparisonChart";
import { SourceMentionsChart } from "@/components/overview/SourceMentionsChart";
import { SourceInsights } from "@/components/overview/SourceInsights";
import { BrandMentionsRadar } from "@/components/overview/BrandMentionsRadar";
import { PercentileGauge } from "@/components/ui/PercentileGauge";
import { TierBadge } from "@/components/ui/TierBadge";
import { 
  getAIVisibilityMetrics, 
  getMentionsPercentile, 
  getSentiment,
  getBrandName,
  getAnalysisDate,
  getModelName
} from "@/data/analyticsData";
import { LLMIcon } from "@/components/ui/LLMIcon";
import { Info, TrendingUp, MessageSquare, ThumbsUp, Calendar } from "lucide-react";
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
  const analysisDate = getAnalysisDate();
  const modelName = getModelName();

  // Parse model names for icons
  const models = modelName?.split(',').map(m => m.trim()) || [];

  return (
    <Layout>
      <div className="p-4 md:p-6 space-y-6">
        {/* Header with date and model info */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-bold text-foreground">Overall Insights</h1>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs bg-card border border-border">
                <p>Comprehensive overview of your brand's performance across AI platforms.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {analysisDate && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{analysisDate}</span>
              </div>
            )}
            {models.length > 0 && (
              <div className="flex items-center gap-2">
                {models.map((model, idx) => (
                  <div key={model} className="flex items-center gap-1">
                    <LLMIcon platform={model} size="sm" />
                    <span className="hidden sm:inline capitalize">{model === 'openai' ? 'ChatGPT' : model}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main metrics gauges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* AI Visibility Card */}
          <div className="bg-card rounded-xl border border-border p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">AI Visibility</span>
              </div>
              <TierBadge tier={visibilityData.tier} />
            </div>
            <PercentileGauge
              percentile={visibilityData.percentile}
              subtitle1={`GEO Score: ${visibilityData.score}`}
              subtitle2={`Top ${100 - visibilityData.percentile}% of ${visibilityData.totalBrands} brands`}
              label="percentile"
            />
          </div>

          {/* Brand Mentions Card */}
          <div className="bg-card rounded-xl border border-border p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <MessageSquare className="w-4 h-4 md:w-5 md:h-5 text-amber-500" />
                </div>
                <span className="text-sm font-medium text-foreground">Brand Mentions</span>
              </div>
              <TierBadge tier={mentionsData.tier} />
            </div>
            <PercentileGauge
              percentile={mentionsData.percentile}
              subtitle1={`${mentionsData.brandMentions} total mentions`}
              subtitle2={`Top brand: ${mentionsData.topBrandMentions}`}
              label="percentile"
            />
          </div>

          {/* Sentiment Card */}
          <div className="bg-card rounded-xl border border-border p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <ThumbsUp className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
                </div>
                <span className="text-sm font-medium text-foreground">Sentiment</span>
              </div>
              <TierBadge tier={sentiment.dominant_sentiment} />
            </div>
            <div className="flex flex-col items-center justify-center py-4">
              <p className="text-sm text-muted-foreground text-center leading-relaxed line-clamp-5 max-w-[280px]">
                {sentiment.summary}
              </p>
            </div>
          </div>
        </div>

        {/* Charts row - visual comparisons */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <CompetitorComparisonChart />
          <BrandMentionsRadar />
        </div>

        {/* LLM Visibility & Platform Presence row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <LLMVisibilityTable />
          <PlatformPresence />
        </div>

        {/* Source Mentions Chart - full width */}
        <SourceMentionsChart />

        {/* Source Insights - full width */}
        <SourceInsights />
      </div>
    </Layout>
  );
};

export default Overview;
