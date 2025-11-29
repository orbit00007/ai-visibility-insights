import { Info } from "lucide-react";
import { getCompetitorVisibility, getBrandName } from "@/data/analyticsData";
import { useNavigate } from "react-router-dom";

export const CompetitorMentions = () => {
  const navigate = useNavigate();
  const competitorVisibility = getCompetitorVisibility();
  const brandName = getBrandName();

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-foreground">
            Competitor Mentions by Keyword
          </h3>
          <Info className="w-4 h-4 text-muted-foreground" />
        </div>
        <button 
          onClick={() => navigate('/competitors-comparisons')}
          className="text-primary text-sm font-medium hover:underline"
        >
          View All
        </button>
      </div>

      <div className="space-y-3">
        {competitorVisibility.map((competitor) => {
          const isPrimaryBrand = competitor.name === brandName;
          const barColor = isPrimaryBrand ? "bg-primary" : "bg-slate-400";
          
          return (
            <div key={competitor.name} className="flex items-center gap-3">
              <div className="flex items-center gap-2 w-36 flex-shrink-0">
                <div className={`w-2 h-2 rounded-full ${isPrimaryBrand ? 'bg-primary' : 'bg-muted-foreground/40'}`} />
                <span className={`text-sm truncate ${isPrimaryBrand ? "text-primary font-semibold" : "text-foreground"}`}>
                  {competitor.name}
                </span>
              </div>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                  style={{ width: `${competitor.visibility}%` }}
                />
              </div>
              <span className={`text-sm font-semibold w-12 text-right ${isPrimaryBrand ? "text-primary" : "text-foreground"}`}>
                {competitor.totalScore}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
