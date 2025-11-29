import { Layout } from "@/components/layout/Layout";
import { TierBadge } from "@/components/ui/TierBadge";
import { competitorSentiment, getBrandName, getSentiment } from "@/data/analyticsData";
import { Info, MessageCircle } from "lucide-react";

const BrandSentiment = () => {
  const brandName = getBrandName();
  const sentiment = getSentiment();

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-foreground">Brand Sentiment</h1>
          <Info className="w-4 h-4 text-muted-foreground cursor-help" />
        </div>

        <p className="text-muted-foreground">
          Comprehensive sentiment analysis across all brands in the competitive landscape.
        </p>

        {/* Primary Brand Sentiment */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <MessageCircle className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">{brandName} Sentiment Overview</h3>
          </div>
          <div className="flex items-start gap-4">
            <TierBadge tier={sentiment.dominant_sentiment} className="text-base px-4 py-2" />
            <p className="text-muted-foreground flex-1">{sentiment.summary}</p>
          </div>
        </div>

        {/* All Brands Sentiment Table */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">Competitor Sentiment Analysis</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/30">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-muted-foreground uppercase tracking-wider">Brand</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-muted-foreground uppercase tracking-wider">Sentiment Summary</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-muted-foreground uppercase tracking-wider">Outlook</th>
                </tr>
              </thead>
              <tbody>
                {competitorSentiment.map((item, index) => {
                  const isPrimaryBrand = item.brand === brandName;
                  return (
                    <tr 
                      key={index} 
                      className={`border-b border-border/50 ${isPrimaryBrand ? 'bg-primary/5' : 'hover:bg-muted/20'}`}
                    >
                      <td className={`py-4 px-6 font-medium ${isPrimaryBrand ? 'text-primary' : 'text-foreground'}`}>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${isPrimaryBrand ? 'bg-primary' : 'bg-muted-foreground/40'}`} />
                          {item.brand}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-muted-foreground max-w-md">{item.summary}</td>
                      <td className="py-4 px-6">
                        <TierBadge tier={item.outlook} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sentiment Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['Positive', 'Neutral', 'Negative'].map(sentimentType => {
            const count = competitorSentiment.filter(c => c.outlook === sentimentType).length;
            const brands = competitorSentiment.filter(c => c.outlook === sentimentType).map(c => c.brand);
            
            return (
              <div key={sentimentType} className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <TierBadge tier={sentimentType} />
                  <span className="text-2xl font-bold text-foreground">{count}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Brands with {sentimentType.toLowerCase()} outlook</p>
                <div className="flex flex-wrap gap-1">
                  {brands.map(brand => (
                    <span 
                      key={brand} 
                      className={`text-xs px-2 py-1 rounded ${brand === brandName ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default BrandSentiment;
