import { Plus, X } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { competitorData } from "@/data/analyticsData";

const CompetitorsSettings = () => {
  const sortedCompetitors = [...competitorData]
    .filter((c) => c.name !== "Kommunicate")
    .sort((a, b) => b.visibility - a.visibility);

  return (
    <Layout>
      <div className="p-6">
        {/* Hero Banner */}
        <div className="amplitude-gradient rounded-xl p-8 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-30">
            <div className="w-full h-full bg-gradient-to-l from-amplitude-purple/40 to-transparent" />
          </div>
          <div className="relative z-10 flex gap-3">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Sign Up
            </Button>
            <Button variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              Contact Sales
            </Button>
          </div>
        </div>

        {/* Competitors Table */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-xl font-semibold text-foreground">Competitors</h2>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Competitor
            </Button>
          </div>

          {/* Table */}
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-6 py-4 table-header w-16">#</th>
                <th className="text-left px-6 py-4 table-header">Competitor</th>
                <th className="text-right px-6 py-4 table-header">Prompts</th>
                <th className="text-right px-6 py-4 table-header">Visibility</th>
                <th className="text-right px-6 py-4 table-header w-20">Delete</th>
              </tr>
            </thead>
            <tbody>
              {sortedCompetitors.map((competitor, index) => (
                <tr key={competitor.name} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 text-muted-foreground">{index + 1}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-muted flex items-center justify-center text-xs">
                        {getCompetitorIcon(competitor.name)}
                      </div>
                      <span className="font-medium text-foreground">{competitor.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-foreground">{competitor.prompts}</td>
                  <td className="px-6 py-4 text-right text-foreground">{competitor.visibility}%</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-muted-foreground hover:text-destructive transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

const getCompetitorIcon = (name: string) => {
  const icons: Record<string, string> = {
    Zendesk: "⬡",
    Intercom: "▣",
    Tidio: "◈",
    HubSpot: "⬢",
    Drift: "◉",
    Freshdesk: "◆",
    LiveChat: "◇",
    Freshworks: "◆",
    "Tawk.to": "◈",
    Zoho: "◇",
  };
  return icons[name] || "○";
};

export default CompetitorsSettings;
