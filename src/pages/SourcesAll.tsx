import { useState } from "react";
import { ChevronDown, ChevronRight, ExternalLink } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { sourcesData } from "@/data/analyticsData";

const SourcesAll = () => {
  const [expandedDomains, setExpandedDomains] = useState<string[]>([]);

  const toggleDomain = (domain: string) => {
    setExpandedDomains((prev) =>
      prev.includes(domain) ? prev.filter((d) => d !== domain) : [...prev, domain]
    );
  };

  return (
    <Layout>
      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="text-sm text-muted-foreground mb-1">Total Sources</h3>
            <p className="text-4xl font-bold text-foreground">{sourcesData.totalSources}</p>
            <p className="text-sm text-muted-foreground mt-1">Unique webpages cited by AI chats</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="text-sm text-muted-foreground mb-1">Sources Mentioning Kommunicate</h3>
            <p className="text-4xl font-bold text-foreground">{sourcesData.sourcesMentioningBrand}</p>
            <p className="text-sm text-muted-foreground mt-1">Sources that mention Kommunicate</p>
          </div>
        </div>

        {/* Sources Table */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-6 py-4 border-b border-border bg-muted/30">
            <span className="table-header">Domain</span>
            <span className="table-header text-right">Pages</span>
            <span className="table-header text-right">Responses</span>
            <span className="table-header text-right">Kommunicate Mention Rate</span>
          </div>

          {/* Domain Rows */}
          {sourcesData.domains.map((domain) => (
            <div key={domain.name}>
              {/* Domain Row */}
              <div
                className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-6 py-4 border-b border-border expandable-row"
                onClick={() => toggleDomain(domain.name)}
              >
                <div className="flex items-center gap-2">
                  {expandedDomains.includes(domain.name) ? (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  )}
                  <div className="w-5 h-5 rounded bg-muted flex items-center justify-center text-xs">
                    ◈
                  </div>
                  <span className="font-medium text-foreground">{domain.name}</span>
                </div>
                <div className="text-right text-foreground">{domain.pages}</div>
                <div className="text-right text-foreground">{domain.responses}</div>
                <div className="text-right text-foreground">{domain.mentionRate}%</div>
              </div>

              {/* Expanded Pages */}
              {expandedDomains.includes(domain.name) && (
                <div className="bg-muted/20">
                  {/* Sub-header */}
                  <div className="grid grid-cols-[2fr_1fr_1fr] gap-4 px-6 py-3 border-b border-border">
                    <span className="table-header pl-12">Page</span>
                    <span className="table-header text-right">Responses</span>
                    <span className="table-header text-right">Mentions Kommunicate</span>
                  </div>

                  {domain.subPages.map((page, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-[2fr_1fr_1fr] gap-4 px-6 py-4 border-b border-border"
                    >
                      <div className="pl-12">
                        <p className="font-medium text-foreground">{page.title}</p>
                        <a
                          href={page.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline flex items-center gap-1"
                        >
                          {page.url}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-5 h-5 rounded bg-muted flex items-center justify-center text-xs">
                            ◈
                          </div>
                          <span>{page.responses}</span>
                        </div>
                      </div>
                      <div className="text-right text-muted-foreground">{page.mentions}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default SourcesAll;
