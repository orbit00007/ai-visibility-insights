import { Layout } from "@/components/layout/Layout";
import { HeroCard } from "@/components/overview/HeroCard";
import { CompetitorMentions } from "@/components/overview/CompetitorMentions";
import { TopTopics } from "@/components/overview/TopTopics";
import { TopCitedSources } from "@/components/overview/TopCitedSources";
import { LLMVisibilityTable } from "@/components/overview/LLMVisibilityTable";
import { PlatformPresence } from "@/components/overview/PlatformPresence";
import { CompetitorComparisonChart } from "@/components/overview/CompetitorComparisonChart";
import { KeywordPerformanceChart } from "@/components/overview/KeywordPerformanceChart";
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
import { Info, TrendingUp, MessageSquare, ThumbsUp, Calendar, Bot } from "lucide-react";
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

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header with date and model info */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {analysisDate && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{analysisDate}</span>
              </div>
            )}
            {modelName && (
              <div className="flex items-center gap-1.5">
                <Bot className="w-4 h-4" />
                <span className="uppercase">{modelName}</span>
              </div>
            )}
          </div>
        </div>

        {/* Main metrics gauges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* AI Visibility Card */}
          <div className="bg-card rounded-xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">AI Visibility</span>
              </div>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>GEO Score percentile rank based on visibility across AI platforms.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <PercentileGauge
              percentile={visibilityData.percentile}
              subtitle1={`GEO Score: ${visibilityData.score}`}
              subtitle2={`Top ${100 - visibilityData.percentile}% of ${visibilityData.totalBrands} brands`}
              label="percentile"
            />
            <div className="flex justify-center mt-4">
              <TierBadge tier={visibilityData.tier} />
            </div>
          </div>

          {/* Brand Mentions Card */}
          <div className="bg-card rounded-xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <MessageSquare className="w-5 h-5 text-amber-500" />
                </div>
                <span className="text-sm font-medium text-foreground">Brand Mentions</span>
              </div>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>Percentile rank based on mention count across all sources.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <PercentileGauge
              percentile={mentionsData.percentile}
              subtitle1={`${mentionsData.brandMentions} total mentions`}
              subtitle2={`Top brand: ${mentionsData.topBrandMentions} mentions`}
              label="percentile"
            />
            <div className="flex justify-center mt-4">
              <TierBadge tier={mentionsData.tier} />
            </div>
          </div>

          {/* Sentiment Card */}
          <div className="bg-card rounded-xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <ThumbsUp className="w-5 h-5 text-green-500" />
                </div>
                <span className="text-sm font-medium text-foreground">Overall Sentiment</span>
              </div>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>Overall sentiment analysis from AI-generated content about your brand.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="flex flex-col items-center justify-center py-6">
              <TierBadge tier={sentiment.dominant_sentiment} className="text-xl px-6 py-3" />
              <p className="text-sm text-muted-foreground mt-4 text-center leading-relaxed line-clamp-4 max-w-[280px]">
                {sentiment.summary}
              </p>
            </div>
          </div>
        </div>

        {/* LLM Visibility & Platform Presence row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LLMVisibilityTable />
          <PlatformPresence />
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CompetitorComparisonChart />
          <BrandMentionsRadar />
        </div>

        {/* Keyword Performance - full width */}
        <KeywordPerformanceChart />

        {/* Hero and Competitor Mentions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <HeroCard />
          <CompetitorMentions />
        </div>

        {/* Source Insights - full width */}
        <SourceInsights />

        {/* Topics and Sources */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TopTopics />
          <TopCitedSources />
        </div>
      </div>
    </Layout>
  );
};

export default Overview;
