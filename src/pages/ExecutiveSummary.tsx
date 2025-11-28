import { Layout } from "@/components/layout/Layout";
import { TierBadge } from "@/components/ui/TierBadge";
import { executiveSummary, getAnalysisDate, getBrandName } from "@/data/analyticsData";
import { CheckCircle2, XCircle, Target, TrendingUp, AlertTriangle, Trophy, Users, ArrowDown } from "lucide-react";

const ExecutiveSummary = () => {
  return (
    <Layout>
      <div className="p-6 space-y-6 max-w-5xl mx-auto">
        {/* Page Title */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Executive Summary</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Strategic overview for {getBrandName()} • {getAnalysisDate()}
          </p>
        </div>

        {/* Brand Score Card */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20 p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/20 rounded-lg">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-2">Overall Assessment</h2>
              <p className="text-foreground">{executiveSummary.brand_score_and_tier}</p>
            </div>
          </div>
        </div>

        {/* Strengths & Weaknesses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Strengths */}
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Strengths</h3>
            </div>
            <ul className="space-y-3">
              {executiveSummary.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">•</span>
                  <span className="text-sm text-muted-foreground">{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <XCircle className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Weaknesses</h3>
            </div>
            <ul className="space-y-3">
              {executiveSummary.weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">•</span>
                  <span className="text-sm text-muted-foreground">{weakness}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Competitor Positioning */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Competitive Positioning</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Leaders */}
            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Trophy className="w-4 h-4 text-green-500" />
                <h4 className="font-medium text-green-500">Leaders</h4>
              </div>
              <div className="space-y-3">
                {executiveSummary.competitor_positioning.leaders.map((leader, idx) => (
                  <div key={idx}>
                    <p className="font-medium text-foreground">{leader.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{leader.summary}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mid-Tier */}
            <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/20">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-amber-500" />
                <h4 className="font-medium text-amber-500">Mid-Tier</h4>
              </div>
              <div className="space-y-3">
                {executiveSummary.competitor_positioning.mid_tier.map((brand, idx) => (
                  <div key={idx}>
                    <p className={`font-medium ${brand.name === 'Kommunicate' ? 'text-primary' : 'text-foreground'}`}>
                      {brand.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{brand.summary}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Laggards */}
            <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/20">
              <div className="flex items-center gap-2 mb-3">
                <ArrowDown className="w-4 h-4 text-red-500" />
                <h4 className="font-medium text-red-500">Laggards</h4>
              </div>
              <div className="space-y-3">
                {executiveSummary.competitor_positioning.laggards.map((brand, idx) => (
                  <div key={idx}>
                    <p className="font-medium text-foreground">{brand.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{brand.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Prioritized Actions */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-primary/20 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Prioritized Actions</h3>
          </div>
          <div className="space-y-3">
            {executiveSummary.prioritized_actions.map((action, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                  {index + 1}
                </span>
                <span className="text-sm text-foreground">{action}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Conclusion */}
        <div className="bg-gradient-to-r from-amber-500/10 to-green-500/10 rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-3">Conclusion</h3>
          <p className="text-muted-foreground">{executiveSummary.conclusion}</p>
        </div>
      </div>
    </Layout>
  );
};

export default ExecutiveSummary;
