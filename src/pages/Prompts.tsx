import { useState } from "react";
import { ChevronDown, ChevronRight, ExternalLink } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { promptsData } from "@/data/analyticsData";
import { cn } from "@/lib/utils";

const Prompts = () => {
  const [expandedTopics, setExpandedTopics] = useState<string[]>([]);
  const [expandedPrompts, setExpandedPrompts] = useState<string[]>([]);

  const toggleTopic = (topicName: string) => {
    setExpandedTopics((prev) =>
      prev.includes(topicName)
        ? prev.filter((t) => t !== topicName)
        : [...prev, topicName]
    );
  };

  const togglePrompt = (promptText: string) => {
    setExpandedPrompts((prev) =>
      prev.includes(promptText)
        ? prev.filter((p) => p !== promptText)
        : [...prev, promptText]
    );
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 px-6 py-4 border-b border-border bg-muted/30">
            <span className="table-header">Topic</span>
            <span className="table-header text-right">Visibility</span>
            <span className="table-header text-right">Relevancy</span>
            <span className="table-header text-right">Avg rank</span>
            <span className="table-header text-right">Citations</span>
          </div>

          {/* Topics */}
          {promptsData.topics.map((topic) => (
            <div key={topic.name}>
              {/* Topic Row */}
              <div
                className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 px-6 py-4 border-b border-border expandable-row"
                onClick={() => toggleTopic(topic.name)}
              >
                <div className="flex items-center gap-2">
                  {expandedTopics.includes(topic.name) ? (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  )}
                  <div>
                    <span className="font-medium text-foreground">{topic.name}</span>
                    <p className="text-sm text-muted-foreground">
                      {topic.promptCount} prompts
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <div className="flex gap-1">
                    {topic.llms.map((llm, i) => (
                      <div
                        key={i}
                        className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs"
                      >
                        {getLLMIcon(llm)}
                      </div>
                    ))}
                  </div>
                  <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-destructive rounded-full"
                      style={{ width: `${topic.visibility}%` }}
                    />
                  </div>
                  <span className="text-sm">{topic.visibility}%</span>
                </div>
                <div className="text-right text-sm">{topic.relevancy}%</div>
                <div className="text-right text-sm">#{topic.avgRank}</div>
                <div className="text-right text-sm">{topic.citations}</div>
              </div>

              {/* Expanded Prompts */}
              {expandedTopics.includes(topic.name) && (
                <div className="bg-muted/20">
                  {/* Prompt Sub-header */}
                  <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 px-6 py-3 border-b border-border">
                    <span className="table-header pl-6">Prompt</span>
                    <span className="table-header text-right">Visibility</span>
                    <span className="table-header text-right">Relevancy</span>
                    <span className="table-header text-right">Avg rank</span>
                    <span className="table-header text-right">Citations</span>
                  </div>

                  {topic.prompts.map((prompt) => (
                    <div key={prompt.text}>
                      {/* Prompt Row */}
                      <div
                        className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 px-6 py-4 border-b border-border expandable-row"
                        onClick={() => togglePrompt(prompt.text)}
                      >
                        <div className="flex items-center gap-2 pl-6">
                          {expandedPrompts.includes(prompt.text) ? (
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                          )}
                          <span className="text-foreground">{prompt.text}</span>
                        </div>
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-muted-foreground rounded-full"
                              style={{ width: `${prompt.visibility}%` }}
                            />
                          </div>
                          <span className="text-sm">{prompt.visibility}%</span>
                        </div>
                        <div className="text-right text-sm">{prompt.relevancy}%</div>
                        <div className="text-right text-sm">
                          {prompt.avgRank ? `#${prompt.avgRank}` : "-"}
                        </div>
                        <div className="text-right text-sm">{prompt.citations}</div>
                      </div>

                      {/* Expanded LLM Responses */}
                      {expandedPrompts.includes(prompt.text) && (
                        <div className="bg-card border-l-4 border-muted mx-6 my-4 rounded-lg overflow-hidden">
                          {prompt.responses.map((response, idx) => (
                            <div
                              key={idx}
                              className="p-6 border-b border-border last:border-b-0"
                            >
                              <div className="flex items-center justify-between mb-4">
                                <span className="font-semibold text-foreground">
                                  {response.llm}
                                </span>
                                <span className="text-sm text-muted-foreground border border-border px-3 py-1 rounded-full">
                                  {response.citations} citations
                                </span>
                              </div>

                              <div className="mb-4">
                                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                                  BRANDS MENTIONED
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {response.brands.map((brand) => (
                                    <span key={brand} className="brand-chip">
                                      <span className="w-4 h-4 rounded bg-muted flex items-center justify-center text-xs">
                                        {brand.charAt(0)}
                                      </span>
                                      {brand}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div className="mb-4">
                                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                                  RESPONSE
                                </h4>
                                <p className="text-foreground">
                                  {response.response}
                                  <button className="text-primary ml-1 hover:underline">
                                    Show more
                                  </button>
                                </p>
                              </div>

                              <div>
                                <button className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                                  CITATIONS ({response.citations})
                                  <ChevronRight className="w-4 h-4" />
                                </button>
                              </div>

                              <p className="text-xs text-muted-foreground mt-4">
                                Last run: {response.lastRun}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
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

const getLLMIcon = (llm: string) => {
  const icons: Record<string, string> = {
    openai: "◉",
    gemini: "◆",
    claude: "◈",
    meta: "▣",
  };
  return icons[llm] || "○";
};

export default Prompts;
