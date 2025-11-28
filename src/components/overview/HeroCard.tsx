import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { competitorData, getAnalytics } from "@/data/analyticsData";

export const HeroCard = () => {
  const topThree = competitorData.slice(0, 3);
  const kommunicate = competitorData.find(c => c.name === "Kommunicate");

  const displayData = [
    { name: "Zendesk", visibility: 48.6, color: "bg-primary" },
    { name: "Intercom", visibility: 46.2, color: "bg-primary" },
    { name: "Kommunicate", visibility: 1.2, color: "bg-muted" },
  ];

  return (
    <div className="amplitude-gradient rounded-xl p-6 text-primary-foreground">
      <p className="text-sm opacity-80 mb-2">
        Login to Amplitude to customize your prompts
      </p>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        You're gaining ground in AI visibility
        <Sparkles className="w-6 h-6 text-amplitude-yellow" />
      </h2>

      <div className="space-y-4">
        <div className="grid grid-cols-[1fr_2fr_auto] gap-4 text-sm opacity-80 mb-2">
          <span>Brand</span>
          <span>% of AI responses that mention the brand</span>
          <span></span>
        </div>

        {displayData.map((brand, index) => (
          <div key={brand.name} className="grid grid-cols-[1fr_2fr_auto] gap-4 items-center">
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                brand.name === "Kommunicate" ? "bg-amplitude-yellow text-amplitude-dark" : "bg-muted/20"
              }`}>
                {brand.name === "Zendesk" && "🏆"}
                {brand.name === "Intercom" && "🥈"}
                {brand.name === "Kommunicate" && "🔶"}
              </div>
              <span className={brand.name === "Kommunicate" ? "text-amplitude-yellow font-medium" : ""}>
                {brand.name}
              </span>
            </div>
            <div className="relative h-3 bg-muted/20 rounded-full overflow-hidden">
              <div
                className={`absolute left-0 top-0 h-full rounded-full transition-all duration-700 ${
                  brand.name === "Kommunicate" ? "bg-muted/40" : "bg-primary"
                }`}
                style={{ width: `${brand.visibility}%` }}
              />
            </div>
            <span className="text-sm font-medium w-16 text-right">{brand.visibility}%</span>
          </div>
        ))}
      </div>

      <Button 
        className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        Share Your Progress
      </Button>

      <p className="text-center text-sm mt-4 opacity-80">
        Explore your trends in Amplitude — <a href="#" className="underline">sign up free</a> today
      </p>
    </div>
  );
};
