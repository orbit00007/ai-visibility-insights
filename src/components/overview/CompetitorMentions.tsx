import { Info } from "lucide-react";
import { competitorData } from "@/data/analyticsData";

export const CompetitorMentions = () => {
  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-foreground">
            Competitor Mentions vs Kommunicate
          </h3>
          <Info className="w-4 h-4 text-muted-foreground" />
        </div>
        <button className="text-primary text-sm font-medium hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {competitorData.map((competitor, index) => {
          const isKommunicate = competitor.name === "Kommunicate";
          const barColor = isKommunicate ? "bg-primary" : "bg-muted";
          
          return (
            <div key={competitor.name} className="flex items-center gap-3">
              <div className="flex items-center gap-2 w-28 flex-shrink-0 justify-end">
                <div className="w-5 h-5 rounded-sm bg-muted flex items-center justify-center text-xs">
                  {getCompetitorIcon(competitor.name)}
                </div>
                <span className={`text-sm ${isKommunicate ? "text-primary font-medium" : "text-foreground"}`}>
                  {competitor.name}
                </span>
              </div>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                  style={{ width: `${competitor.visibility}%` }}
                />
              </div>
              <span className={`text-sm font-medium w-12 ${isKommunicate ? "text-primary" : "text-foreground"}`}>
                {competitor.visibility}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
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
    Kommunicate: "◈",
  };
  return icons[name] || "○";
};
