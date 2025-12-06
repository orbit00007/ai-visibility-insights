import { getPlatformPresence } from "@/data/analyticsData";
import { Globe, CheckCircle2, AlertTriangle, XCircle, ExternalLink } from "lucide-react";

const platformIcons: Record<string, string> = {
  reddit: "🔴",
  linkedin: "🔵",
  wikipedia: "📖",
  product_hunt: "🟠",
  medium: "⬛",
  github: "🐙",
  x: "✖️"
};

const platformLabels: Record<string, string> = {
  reddit: "Reddit",
  linkedin: "LinkedIn",
  wikipedia: "Wikipedia",
  product_hunt: "Product Hunt",
  medium: "Medium",
  github: "GitHub",
  x: "X (Twitter)"
};

export const PlatformPresence = () => {
  const platformPresence = getPlatformPresence();
  
  const platforms = Object.entries(platformPresence).map(([key, url]) => ({
    key,
    label: platformLabels[key] || key,
    icon: platformIcons[key] || "🔗",
    url: url as string,
    status: url ? 'present' : 'missing'
  }));

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500">
            <CheckCircle2 className="w-3 h-3" />
            Present
          </span>
        );
      case 'needs_update':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-500">
            <AlertTriangle className="w-3 h-3" />
            Needs Update
          </span>
        );
      case 'missing':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-500">
            <XCircle className="w-3 h-3" />
            Missing
          </span>
        );
      default:
        return null;
    }
  };

  const presentCount = platforms.filter(p => p.status === 'present').length;
  const totalCount = platforms.length;

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Platform Presence Summary</h3>
        </div>
        <span className="text-sm text-muted-foreground">{presentCount}/{totalCount} platforms</span>
      </div>
      <p className="text-xs text-muted-foreground mb-4">Brand presence on key AI-relevant platforms</p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {platforms.map((platform) => (
          <div 
            key={platform.key}
            className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
              platform.status === 'present' 
                ? 'border-green-500/20 bg-green-500/5 hover:bg-green-500/10' 
                : 'border-red-500/20 bg-red-500/5'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{platform.icon}</span>
              <span className="font-medium text-sm text-foreground">{platform.label}</span>
            </div>
            {platform.url ? (
              <a 
                href={platform.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            ) : (
              <XCircle className="w-4 h-4 text-red-500" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
