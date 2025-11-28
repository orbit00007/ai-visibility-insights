import { Layout } from "@/components/layout/Layout";
import { getAnalytics } from "@/data/analyticsData";
import { Globe, AlertCircle, CheckCircle } from "lucide-react";

const SourcesMyWebsitePages = () => {
  const analytics = getAnalytics();
  const brandWebsite = analytics?.brand_website || 'Not specified';
  const depthNotes = analytics?.sources_and_content_impact?.depth_notes?.Kommunicate;

  // Extract pages from depth notes
  const brandPagesInfo = depthNotes?.["Brand Pages & Owned Content"];
  const pagesUsed = brandPagesInfo?.pages_used?.filter((p: string) => p !== 'Absent') || [];

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold text-foreground">My Website Pages</h1>

        {/* Brand Website Info */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-6 h-6 text-primary" />
            <div>
              <h3 className="font-semibold text-foreground">Brand Website</h3>
              <a href={brandWebsite} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {brandWebsite}
              </a>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-sm text-muted-foreground">Pages Cited by LLMs</span>
            </div>
            <span className="text-3xl font-bold text-foreground">{pagesUsed.length}</span>
          </div>

          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Brand Content Status</span>
            </div>
            <span className="text-xl font-bold text-green-400">Active</span>
          </div>

          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-yellow-400" />
              <span className="text-sm text-muted-foreground">Optimization Status</span>
            </div>
            <span className="text-xl font-bold text-yellow-400">Needs Improvement</span>
          </div>
        </div>

        {/* Insight */}
        {brandPagesInfo && (
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-semibold text-foreground mb-3">Brand Content Insight</h3>
            <p className="text-muted-foreground">{brandPagesInfo.insight}</p>
          </div>
        )}

        {/* Pages List */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-4">Cited Pages</h3>
          {pagesUsed.length > 0 ? (
            <div className="space-y-3">
              {pagesUsed.map((page: string, idx: number) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-primary" />
                    <span className="text-foreground">{page}</span>
                  </div>
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">
                    Cited
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No specific pages from your website are being cited by LLMs.</p>
          )}
        </div>

        {/* All Source Categories */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-4">Presence Across Source Categories</h3>
          <div className="space-y-3">
            {depthNotes && Object.entries(depthNotes).map(([category, data]: [string, any]) => (
              <div key={category} className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground">{category}</span>
                  <span className={`px-2 py-1 rounded text-sm ${
                    data.pages_used[0] !== 'Absent' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {data.pages_used[0] !== 'Absent' ? 'Present' : 'Absent'}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{data.insight}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SourcesMyWebsitePages;
