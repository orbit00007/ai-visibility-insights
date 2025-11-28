import { Layout } from "@/components/layout/Layout";
import { getAnalytics, sourcesData } from "@/data/analyticsData";
import { ChevronDown, ChevronRight, Globe, FileText } from "lucide-react";
import { useState } from "react";

const SourcesAll = () => {
  const analytics = getAnalytics();
  const sourcesImpact = analytics?.sources_and_content_impact;
  const depthNotes = sourcesImpact?.depth_notes?.Kommunicate || {};
  const [expandedSource, setExpandedSource] = useState<string | null>(null);

  // Calculate totals
  const totalSources = sourcesData.length;
  const sourcesWithMentions = sourcesData.filter(s => s.kommunicateMentions > 0).length;
  const totalMentions = sourcesData.reduce((acc, s) => acc + s.kommunicateMentions, 0);

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
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground w-8"></th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Source Category</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Mentions</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Score</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Cited by LLMs</th>
              </tr>
            </thead>
            <tbody>
              {sourcesData.map((source) => {
                const isExpanded = expandedSource === source.name;
                const notes = depthNotes[source.name as keyof typeof depthNotes];

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
                      <td className="py-3 px-4 text-foreground">{source.kommunicateMentions}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-sm ${
                          source.kommunicateScore === 'High' ? 'bg-green-500/20 text-green-400' :
                          source.kommunicateScore === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {source.kommunicateScore}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-sm ${
                          source.citedByLLMs === 'Yes' ? 'bg-green-500/20 text-green-400' : 'bg-muted text-muted-foreground'
                        }`}>
                          {source.citedByLLMs}
                        </span>
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
                                      <span key={idx} className="px-3 py-1 bg-card border border-border rounded-full text-sm text-foreground">
                                        {page}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </>
                            ) : (
                              <p className="text-muted-foreground">No detailed notes available for this source.</p>
                            )}
                            <div>
                              <h4 className="font-medium text-foreground mb-2">Source Types</h4>
                              <div className="flex flex-wrap gap-2">
                                {source.pagesUsed.map((page, idx) => (
                                  <span key={idx} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                                    {page}
                                  </span>
                                ))}
                              </div>
                            </div>
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
