import { Layout } from "@/components/layout/Layout";
import { getAnalytics, getSourcesData, getBrandName, getDepthNotes } from "@/data/analyticsData";
import { TierBadge } from "@/components/ui/TierBadge";
import { ChevronDown, ChevronRight, Globe, FileText } from "lucide-react";
import { useState } from "react";

const SourcesAll = () => {
  const analytics = getAnalytics();
  const brandName = getBrandName();
  const sourcesData = getSourcesData();
  const depthNotes = getDepthNotes();
  const [expandedSource, setExpandedSource] = useState<string | null>(null);

  // Calculate totals
  const totalSources = sourcesData.length;
  const brandMentionsKey = `${brandName}Mentions`;
  const sourcesWithMentions = sourcesData.filter(s => (s[brandMentionsKey] || 0) > 0).length;
  const totalMentions = sourcesData.reduce((acc, s) => acc + (s[brandMentionsKey] || 0), 0);

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold text-foreground">All Sources</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Total Source Categories</span>
            </div>
            <span className="text-3xl font-bold text-foreground">{totalSources}</span>
          </div>
          
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Sources with Mentions</span>
            </div>
            <span className="text-3xl font-bold text-foreground">{sourcesWithMentions}</span>
          </div>

          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Total Mentions</span>
            </div>
            <span className="text-3xl font-bold text-foreground">{totalMentions}</span>
          </div>
        </div>

        {/* Sources Table */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider w-8"></th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Source Category</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Presence</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Mentions</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Cited by LLMs</th>
              </tr>
            </thead>
            <tbody>
              {sourcesData.map((source) => {
                const isExpanded = expandedSource === source.name;
                const notes = depthNotes[source.name as keyof typeof depthNotes];
                const presence = source[`${brandName}Presence`];
                const mentions = source[`${brandName}Mentions`] || 0;

                return (
                  <>
                    <tr 
                      key={source.name}
                      className="border-b border-border/50 hover:bg-muted/20 cursor-pointer"
                      onClick={() => setExpandedSource(isExpanded ? null : source.name)}
                    >
                      <td className="py-3 px-4">
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        )}
                      </td>
                      <td className="py-3 px-4 font-medium text-foreground">{source.name}</td>
                      <td className="py-3 px-4">
                        <TierBadge tier={presence || 'Absent'} />
                      </td>
                      <td className="py-3 px-4 text-foreground font-semibold">{mentions}</td>
                      <td className="py-3 px-4">
                        <TierBadge tier={source.citedByLLMs} />
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr className="bg-muted/10">
                        <td colSpan={5} className="py-4 px-8">
                          <div className="space-y-4">
                            {notes && typeof notes === 'object' && 'insight' in notes ? (
                              <>
                                <div>
                                  <h4 className="font-medium text-foreground mb-2">Insight</h4>
                                  <p className="text-muted-foreground">{(notes as any).insight}</p>
                                </div>
                                <div>
                                  <h4 className="font-medium text-foreground mb-2">Pages Used</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {((notes as any).pages_used || []).map((page: string, idx: number) => (
                                      <span key={idx} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                                        {page}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </>
                            ) : (
                              <p className="text-muted-foreground">No detailed notes available for this source.</p>
                            )}
                            {source.pagesUsed && source.pagesUsed[0] !== 'Absent' && (
                              <div>
                                <h4 className="font-medium text-foreground mb-2">Source Types</h4>
                                <div className="flex flex-wrap gap-2">
                                  {source.pagesUsed.map((page, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-muted text-foreground rounded-full text-sm">
                                      {page}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default SourcesAll;
