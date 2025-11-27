import { useState } from "react";
import { ChevronDown, ChevronRight, ExternalLink, Search, Info, Settings2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { myWebsitePages } from "@/data/analyticsData";

const SourcesMyWebsitePages = () => {
  const [expandedFolders, setExpandedFolders] = useState<string[]>(["kommunicate.io/blog"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [hideWithoutCitations, setHideWithoutCitations] = useState(false);

  const toggleFolder = (folder: string) => {
    setExpandedFolders((prev) =>
      prev.includes(folder) ? prev.filter((f) => f !== folder) : [...prev, folder]
    );
  };

  return (
    <Layout>
      <div className="p-6">
        {/* Hero Banner */}
        <div className="amplitude-gradient rounded-xl p-8 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-30">
            <div className="w-full h-full bg-gradient-to-l from-amplitude-purple/40 to-transparent" />
          </div>
          <div className="relative z-10">
            <p className="text-primary-foreground/80 text-sm mb-2">
              See how well AI chats are picking up your website pages. Optimize your pages to rank higher for AI-powered content.
            </p>
            <div className="flex gap-3 mt-4">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Sign Up
              </Button>
              <Button variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>

        {/* My Website Pages Section */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-xl font-semibold text-foreground">My Website Pages</h2>
            <Button variant="outline" size="sm" className="gap-2">
              <Settings2 className="w-4 h-4" />
              Customize
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 border-b border-border">
            <div className="bg-muted/30 rounded-lg p-4">
              <h3 className="text-sm text-muted-foreground mb-1">Total Cited Pages</h3>
              <p className="text-3xl font-bold text-foreground">{myWebsitePages.totalCitedPages}</p>
              <p className="text-sm text-muted-foreground mt-1">Total number of website pages cited</p>
            </div>
            <div className="bg-muted/30 rounded-lg p-4">
              <h3 className="text-sm text-muted-foreground mb-1">Total Errors</h3>
              <p className="text-3xl font-bold text-foreground">{myWebsitePages.totalErrors}</p>
              <p className="text-sm text-muted-foreground mt-1">Total number of website pages with errors</p>
            </div>
            <div className="bg-muted/30 rounded-lg p-4">
              <h3 className="text-sm text-muted-foreground mb-1">Total Warnings</h3>
              <p className="text-3xl font-bold text-foreground">{myWebsitePages.totalWarnings}</p>
              <p className="text-sm text-muted-foreground mt-1">Total number of website pages with warnings</p>
            </div>
          </div>

          {/* Info Banner */}
          <div className="px-6 py-4 border-b border-border">
            <div className="flex items-center gap-2 text-primary">
              <Info className="w-4 h-4" />
              <span className="text-sm">
                Customize page view events and referrer properties in the settings to see traffic data for your website pages.
              </span>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search pages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="hide-no-citations"
                  checked={hideWithoutCitations}
                  onCheckedChange={(checked) => setHideWithoutCitations(checked as boolean)}
                />
                <label htmlFor="hide-no-citations" className="text-sm text-muted-foreground">
                  Hide pages without citations
                </label>
              </div>
              <Button variant="ghost" size="sm">
                Expand All
              </Button>
              <Button variant="ghost" size="sm">
                Collapse All
              </Button>
            </div>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-[2fr_1fr_1fr] gap-4 px-6 py-3 border-b border-border bg-muted/30">
            <span className="table-header">URL</span>
            <span className="table-header text-right">Citations</span>
            <span className="table-header text-right">Create Cohort</span>
          </div>

          {/* Pages List */}
          {myWebsitePages.pages.map((folder) => (
            <div key={folder.folder}>
              {/* Folder Row */}
              <div
                className="grid grid-cols-[2fr_1fr_1fr] gap-4 px-6 py-4 border-b border-border expandable-row"
                onClick={() => toggleFolder(folder.folder)}
              >
                <div className="flex items-center gap-2">
                  {expandedFolders.includes(folder.folder) ? (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  )}
                  <div className="w-5 h-5 rounded bg-muted flex items-center justify-center">
                    <span className="text-xs">📁</span>
                  </div>
                  <span className="font-medium text-foreground">{folder.folder}</span>
                  <span className="text-sm text-muted-foreground">({folder.pageCount} pages)</span>
                </div>
                <div className="text-right font-semibold text-foreground">{folder.citations}</div>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm" className="gap-1">
                    <span className="text-xs">👥</span>
                  </Button>
                </div>
              </div>

              {/* Expanded Sub-pages */}
              {expandedFolders.includes(folder.folder) && (
                <div className="bg-muted/20">
                  {folder.subPages.map((page) => (
                    <div
                      key={page.url}
                      className="grid grid-cols-[2fr_1fr_1fr] gap-4 px-6 py-4 border-b border-border"
                    >
                      <div className="flex items-center gap-2 pl-8">
                        <div className="w-5 h-5 rounded bg-muted flex items-center justify-center">
                          <span className="text-xs">📄</span>
                        </div>
                        <a
                          href={`https://kommunicate.io${page.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground hover:text-primary flex items-center gap-1"
                        >
                          {page.url}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <div className="text-right text-foreground">{page.citations}</div>
                      <div className="flex justify-end">
                        <Button variant="outline" size="sm" className="gap-1">
                          <span className="text-xs">👥</span>
                        </Button>
                      </div>
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

export default SourcesMyWebsitePages;
