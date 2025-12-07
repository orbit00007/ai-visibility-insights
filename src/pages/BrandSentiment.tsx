import { Layout } from "@/components/layout/Layout";
import { TierBadge } from "@/components/ui/TierBadge";
import { competitorSentiment, getBrandName, getSentiment, getBrandLogo } from "@/data/analyticsData";
import { Info } from "lucide-react";

const BrandSentiment = () => {
  const brandName = getBrandName();
  const sentiment = getSentiment();
  const brandLogo = getBrandLogo(brandName);

  // Sort by outlook: Positive first, then Neutral, then Negative
  const outlookOrder = { 'Positive': 0, 'Neutral': 1, 'Negative': 2 };
  const sortedSentiment = [...competitorSentiment].sort((a, b) => {
    return (outlookOrder[a.outlook as keyof typeof outlookOrder] || 2) - 
           (outlookOrder[b.outlook as keyof typeof outlookOrder] || 2);
  });

  return (
    <Layout>
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex items-center gap-2">
          <h1 className="text-xl md:text-2xl font-bold text-foreground">Brand Sentiment</h1>
          <Info className="w-4 h-4 text-muted-foreground cursor-help" />
        </div>

        <p className="text-muted-foreground text-sm md:text-base">
          Comprehensive sentiment analysis across all brands in the competitive landscape.
        </p>

        {/* Primary Brand Sentiment */}
        <div className="bg-card rounded-xl border border-border p-4 md:p-6">
          <div className="flex items-center gap-3 mb-4">
            {brandLogo && (
              <img 
                src={brandLogo} 
                alt={brandName} 
                className="w-8 h-8 rounded-full object-contain bg-white"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            )}
            <h3 className="text-lg font-semibold text-foreground">{brandName} Sentiment Overview</h3>
          </div>
          <div className="flex flex-col md:flex-row items-start gap-4">
            <TierBadge tier={sentiment.dominant_sentiment} className="text-base px-4 py-2" />
            <p className="text-muted-foreground flex-1 text-sm md:text-base">{sentiment.summary}</p>
          </div>
        </div>

        {/* All Brands Sentiment Table */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="p-4 md:p-6 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">Competitor Sentiment Analysis</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/30">
                  <th className="text-left py-4 px-4 md:px-6 text-sm font-semibold text-muted-foreground uppercase tracking-wider">Brand</th>
                  <th className="text-left py-4 px-4 md:px-6 text-sm font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Sentiment Summary</th>
                  <th className="text-left py-4 px-4 md:px-6 text-sm font-semibold text-muted-foreground uppercase tracking-wider">Outlook</th>
                </tr>
              </thead>
              <tbody>
                {sortedSentiment.map((item, index) => {
                  const isPrimaryBrand = item.brand === brandName;
                  return (
                    <tr 
                      key={index} 
                      className={`border-b border-border/50 ${isPrimaryBrand ? 'bg-primary/5' : 'hover:bg-muted/20'}`}
                    >
                      <td className={`py-4 px-4 md:px-6 font-medium ${isPrimaryBrand ? 'text-primary' : 'text-foreground'}`}>
                        <div className="flex items-center gap-3">
                          {item.logo ? (
                            <img 
                              src={item.logo} 
                              alt={item.brand} 
                              className="w-6 h-6 rounded-full object-contain bg-white"
                              onError={(e) => { 
                                e.currentTarget.style.display = 'none'; 
                                (e.currentTarget.nextSibling as HTMLElement)?.classList.remove('hidden');
                              }}
                            />
                          ) : null}
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            isPrimaryBrand ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                          } ${item.logo ? 'hidden' : ''}`}>
                            {item.brand[0]}
                          </div>
                          <div className="flex flex-col">
                            <span>{item.brand}</span>
                            <span className="text-xs text-muted-foreground md:hidden">{item.summary.slice(0, 50)}...</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 md:px-6 text-sm text-muted-foreground max-w-md hidden md:table-cell">{item.summary}</td>
                      <td className="py-4 px-4 md:px-6">
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
            const matchingBrands = competitorSentiment.filter(c => c.outlook === sentimentType);
            const count = matchingBrands.length;
            
            return (
              <div key={sentimentType} className="bg-card rounded-xl border border-border p-4 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <TierBadge tier={sentimentType} />
                  <span className="text-2xl font-bold text-foreground">{count}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Brands with {sentimentType.toLowerCase()} outlook</p>
                <div className="flex flex-wrap gap-2">
                  {matchingBrands.map(item => (
                    <div 
                      key={item.brand} 
                      className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded ${
                        item.brand === brandName ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {item.logo && (
                        <img 
                          src={item.logo} 
                          alt={item.brand} 
                          className="w-4 h-4 rounded-full object-contain bg-white"
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                      )}
                      {item.brand}
                    </div>
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
