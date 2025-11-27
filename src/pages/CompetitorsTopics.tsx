import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { topicsMatrix } from "@/data/analyticsData";
import { cn } from "@/lib/utils";

const CompetitorsTopics = () => {
  const [viewMode, setViewMode] = useState<"percentage" | "rank">("percentage");

  const competitors = ["Kommunicate", "Zendesk", "Intercom", "Tidio", "HubSpot", "Drift", "Freshdesk", "LiveChat"];

  const getHeatColor = (value: number) => {
    if (value === 0) return "bg-muted";
    if (value <= 10) return "bg-heat-10";
    if (value <= 20) return "bg-heat-20";
    if (value <= 30) return "bg-heat-30";
    if (value <= 40) return "bg-heat-40";
    if (value <= 50) return "bg-heat-50";
    if (value <= 60) return "bg-heat-60";
    if (value <= 70) return "bg-heat-70";
    if (value <= 80) return "bg-heat-80";
    return "bg-heat-90";
  };

  const getTextColor = (value: number) => {
    if (value >= 50) return "text-primary-foreground";
    return "text-foreground";
  };

  return (
    <Layout>
      <div className="p-6">
        {/* Hero Banner */}
        <div className="amplitude-gradient rounded-xl p-8 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-30">
            <div className="w-full h-full bg-gradient-to-l from-amplitude-purple/40 to-transparent" />
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-xl font-semibold text-foreground">Competitors vs Topics Matrix</h2>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "percentage" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("percentage")}
              >
                Visibility Percentage
              </Button>
              <Button
                variant={viewMode === "rank" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("rank")}
              >
                Average Rank
              </Button>
            </div>
          </div>

          {/* Matrix Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-4 py-3 table-header min-w-[200px]">Topic</th>
                  {competitors.map((competitor) => (
                    <th key={competitor} className="px-4 py-3 table-header text-center min-w-[100px]">
                      <div className="flex items-center justify-center gap-1">
                        <div className="w-4 h-4 rounded bg-muted flex items-center justify-center text-xs">
                          {competitor.charAt(0)}
                        </div>
                        <span className={competitor === "Kommunicate" ? "text-primary" : ""}>
                          {competitor}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {topicsMatrix.map((row, rowIdx) => (
                  <tr key={row.topic} className="border-b border-border">
                    <td className="px-4 py-3 text-foreground font-medium">{row.topic}</td>
                    {competitors.map((competitor) => {
                      const value = row[competitor as keyof typeof row] as number;
                      return (
                        <td key={competitor} className="p-1">
                          <div
                            className={cn(
                              "heat-cell rounded",
                              getHeatColor(value),
                              getTextColor(value)
                            )}
                          >
                            {value}%
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CompetitorsTopics;
