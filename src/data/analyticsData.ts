export const analyticsData = {
  analytics: [
    {
      id: "6924e14e8988da11285a37bc",
      product_id: "6c0d7bdc-4716-40ab-827c-8259327778a1",
      product_name: "Kommunicate",
      date: "2025-11-24T22:52:06.669Z",
      status: "completed",
      analytics: {
        brand_name: "Kommunicate",
        brand_website: "https://kommunicate.io/",
        model_name: "openai,gemini",
        status: "completed",
        analysis_scope: {
          search_keywords: [
            "chatbots with no code",
            "ai integrations with the no code chat bots"
          ],
          date_range: {
            from: null,
            to: null
          }
        },
        ai_visibility: {
          weighted_mentions_total: 10,
          breakdown: {
            top_two_mentions: 2,
            top_five_mentions: 2,
            later_mentions: 0,
            calculation: "(2×3) + (2×2) + (0×1) = 10"
          },
          tier_mapping_method: "Absolute thresholds",
          brand_tier: "Low",
          explanation: "With a visibility score of 10, Kommunicate falls into the Low band, classifying it as Low visibility."
        },
        sentiment: {
          dominant_sentiment: "Neutral",
          summary: "Kommunicate has a niche presence within AI-generated results, appearing for specific queries related to AI integrations but lacking the broad top-ranking visibility of market leaders. Its positioning is operational rather than dominant, indicating a need for greater authority signals."
        },
        competitor_visibility_table: {
          header: [
            "brand_names",
            "chatbots with no code",
            "ai integrations with the no code chat bots"
          ],
          rows: [
            ["Tidio", 9, 8],
            ["ManyChat", 5, 4],
            ["Landbot", 6, 0],
            ["Ada", 2, 3],
            ["Zendesk", 2, 3],
            ["Kommunicate", 2, 8]
          ]
        },
        competitor_sentiment_table: {
          header: ["Brand", "Sentiment Summary", "overall outlook"],
          rows: [
            ["Tidio", "Leader in visibility, frequently appearing in top positions for general no-code chatbot queries. Strong, consistent presence.", "Positive"],
            ["ManyChat", "Solid mid-tier visibility, often present but rarely in top spots. An operational player with diluted authority.", "Neutral"],
            ["Landbot", "Niche visibility, appears for general no-code queries but is absent in more specific AI integration topics. Inconsistent presence.", "Neutral"],
            ["Ada", "Weak visibility, appears infrequently and in lower-ranking positions. Lacks significant AI-surfaced authority.", "Negative"],
            ["Zendesk", "An enterprise player with a niche AI visibility footprint, securing a top rank in one AI-focused query but otherwise weak.", "Negative"],
            ["Kommunicate", "Emerging visibility, weak in general queries but shows strength in AI-integration specific topics. A niche player with targeted strengths.", "Neutral"]
          ]
        },
        brand_mentions: {
          total_mentions: 4,
          queries_with_mentions: 4,
          total_sources_checked: 4,
          alignment_with_visibility: "Mentions directly reflect weighted scoring; each mention counted by position weight."
        },
        llm_wise_data: {
          gemini: {
            brand_mentions_count: 2,
            queries_with_brand: 2,
            average_brand_rank: 3.5
          },
          openai: {
            brand_mentions_count: 2,
            queries_with_brand: 2,
            average_brand_rank: 3.5
          }
        },
        sources_and_content_impact: {
          header: [
            "Sources",
            "Tidio", "Tidio Mentions", "Tidio Mention Score",
            "ManyChat", "ManyChat Mentions", "ManyChat Mention Score",
            "Landbot", "Landbot Mentions", "Landbot Mention Score",
            "Ada", "Ada Mentions", "Ada Mention Score",
            "Zendesk", "Zendesk Mentions", "Zendesk Mention Score",
            "Kommunicate", "Kommunicate Mentions", "Kommunicate Mention Score",
            "Cited By LLMs", "pages_used"
          ],
          rows: [
            ["Tech News & Blogs", "High", 16, "Medium", "High", 8, "Low", "High", 10, "Medium", "High", 7, "Low", "High", 4, "Low", "High", 3, "Low", "Yes", ["Industry blogs", "Review sites", "How-to guides"]],
            ["Communities", "Absent", 0, "Low", "Absent", 0, "Low", "Absent", 0, "Low", "High", 1, "Low", "Absent", 0, "Low", "Absent", 0, "Low", "No", ["Reddit threads", "Forum discussions"]],
            ["Brand Pages & Owned Content", "High", 1, "Low", "High", 1, "Low", "Absent", 0, "Low", "High", 1, "Low", "High", 1, "Low", "High", 1, "Low", "Yes", ["Brand blogs", "Product pages"]],
            ["Analyst Platforms", "Absent", 0, "Low", "Absent", 0, "Low", "Absent", 0, "Low", "Absent", 0, "Low", "Absent", 0, "Low", "Absent", 0, "Low", "No", ["Gartner", "Forrester"]]
          ],
          depth_notes: {
            Kommunicate: {
              "Analyst Platforms": {
                insight: "There is no visibility for Kommunicate in results referencing major analyst platforms, suggesting a gap in enterprise-level authority signals.",
                pages_used: ["Absent"]
              },
              "Brand Pages & Owned Content": {
                insight: "Kommunicate's own blog is surfaced by LLMs, demonstrating that its owned content is being successfully indexed and used as a source for specific queries.",
                pages_used: ["Kommunicate Blog"]
              },
              Communities: {
                insight: "The brand is currently absent from AI-surfaced community discussions, indicating a lack of grassroots visibility.",
                pages_used: ["Absent"]
              },
              "Tech News & Blogs": {
                insight: "Kommunicate is cited in blogs focusing on AI-driven customer support and automation, highlighting its generative AI capabilities.",
                pages_used: ["Best AI-Driven Customer Support Platforms", "Customer Service Automation Software Reviews"]
              }
            }
          }
        },
        recommendations: [
          {
            overall_insight: "Kommunicate's visibility is highly polarized; it performs well on specific 'AI integration' keywords but is nearly invisible on broader 'no-code chatbot' terms where competitors dominate.",
            suggested_action: "Develop and promote top-of-funnel content (guides, comparisons) targeting general 'no-code chatbot' keywords to capture a wider audience and improve brand discovery in AI search.",
            overall_effort: "High",
            impact: "High"
          },
          {
            overall_insight: "The brand's own blog content is successfully being used as a source by LLMs, validating its content strategy for niche topics.",
            suggested_action: "Optimize all existing and new blog posts for direct answer generation by using clear Q&A formatting, structured data (FAQPage schema), and creating 'snippet-worthy' summaries at the top of each article.",
            overall_effort: "Medium",
            impact: "Medium"
          },
          {
            overall_insight: "Competitor Tidio achieves its 'Leader' status through frequent mentions in a wide array of tech blogs and news sites, creating a strong authority signal for LLMs.",
            suggested_action: "Execute a targeted digital PR campaign to secure mentions and links from the authoritative tech publications that frequently appear in AI search results for chatbot-related queries.",
            overall_effort: "High",
            impact: "High"
          },
          {
            overall_insight: "Kommunicate is absent from community platforms like Reddit, where at least one competitor (Ada) has a presence, representing a missed opportunity for organic visibility.",
            suggested_action: "Implement a Q&A amplification strategy by actively participating in relevant subreddits and online forums to address user questions and establish brand expertise.",
            overall_effort: "Medium",
            impact: "Medium"
          },
          {
            overall_insight: "The brand's visibility score of 10 places it in the 'Low' tier, primarily due to a low volume of mentions, even though the quality of its placements (rank) is good for niche topics.",
            suggested_action: "Create dedicated landing pages optimized for each key AI integration (e.g., Dialogflow, Amazon Lex) to build a cluster of authoritative content that can be surfaced for a wider range of specific, long-tail queries.",
            overall_effort: "Medium",
            impact: "High"
          }
        ],
        executive_summary: {
          brand_score_and_tier: "Kommunicate has an AI visibility score of 10, placing it in the Low tier.",
          strengths: [
            "Demonstrates strong performance on high-intent 'AI integration' keywords, outscoring all competitors in this category (Visibility Score: 8).",
            "Secures top-two rankings in AI-specific queries, indicating high relevance for its core value proposition."
          ],
          weaknesses: [
            "Very poor visibility for general 'no-code chatbot' keywords (Visibility Score: 2), missing out on top-of-funnel awareness.",
            "Overall weighted mention score (10) is low, keeping the brand in the Low visibility tier despite targeted strengths."
          ],
          competitor_positioning: {
            leaders: [
              {
                name: "Tidio",
                summary: "The clear leader (Score: 17), with dominant, high-ranking visibility across all keyword categories."
              }
            ],
            mid_tier: [
              {
                name: "Kommunicate",
                summary: "Leads this tier (Score: 10) by focusing on AI-specific queries, showing niche strength."
              },
              {
                name: "ManyChat",
                summary: "Maintains broader but lower-ranking visibility (Score: 9)."
              }
            ],
            laggards: [
              {
                name: "Landbot",
                summary: "Struggles with inconsistent visibility (Score: 6)."
              },
              {
                name: "Ada",
                summary: "Exhibits weak and infrequent visibility (Score: 5)."
              },
              {
                name: "Zendesk",
                summary: "Shows minimal visibility in this specific no-code context (Score: 5)."
              }
            ]
          },
          prioritized_actions: [
            "Focus SEO and content strategy on high-volume 'no-code chatbot' keywords to improve top-of-funnel visibility.",
            "Launch a digital PR campaign to secure mentions in authoritative tech blogs frequently cited by LLMs.",
            "Systematically optimize all owned content for snippet-style answers to improve direct answer generation."
          ],
          conclusion: "By expanding its content strategy to cover broader, top-of-funnel topics while maintaining its strength in AI-specific niches, Kommunicate can elevate its visibility score from the Low to the Medium tier."
        }
      },
      created_at: "2025-11-24T22:50:54.57Z",
      updated_at: "2025-11-24T22:52:06.669Z"
    }
  ],
  count: 1,
  limit: 1,
  product_id: "6c0d7bdc-4716-40ab-827c-8259327778a1"
};

// Competitor data for display
export const competitorData = [
  { name: "Zendesk", visibility: 48.6, prompts: 118 },
  { name: "Intercom", visibility: 46.2, prompts: 112 },
  { name: "Tidio", visibility: 40, prompts: 88 },
  { name: "HubSpot", visibility: 28, prompts: 74 },
  { name: "Drift", visibility: 23.1, prompts: 61 },
  { name: "Freshdesk", visibility: 16.6, prompts: 42 },
  { name: "LiveChat", visibility: 15.4, prompts: 36 },
  { name: "Freshworks", visibility: 15.1, prompts: 45 },
  { name: "Tawk.to", visibility: 8, prompts: 24 },
  { name: "Zoho", visibility: 6, prompts: 18 },
  { name: "Kommunicate", visibility: 1.2, prompts: 8 },
];

// Topics matrix data
export const topicsMatrix = [
  { topic: "No-code bot builder", Kommunicate: 8, Zendesk: 21, Intercom: 33, Tidio: 79, HubSpot: 21, Drift: 17, Freshdesk: 0, LiveChat: 0 },
  { topic: "AI chatbot platforms", Kommunicate: 5, Zendesk: 47, Intercom: 58, Tidio: 58, HubSpot: 53, Drift: 42, Freshdesk: 0, LiveChat: 11 },
  { topic: "Conversational support automation", Kommunicate: 5, Zendesk: 62, Intercom: 81, Tidio: 57, HubSpot: 24, Drift: 38, Freshdesk: 19, LiveChat: 14 },
  { topic: "Cobrowsing", Kommunicate: 0, Zendesk: 20, Intercom: 15, Tidio: 0, HubSpot: 0, Drift: 0, Freshdesk: 0, LiveChat: 5 },
  { topic: "Customer support analytics", Kommunicate: 0, Zendesk: 57, Intercom: 48, Tidio: 13, HubSpot: 39, Drift: 4, Freshdesk: 22, LiveChat: 9 },
  { topic: "Help desk ticketing", Kommunicate: 0, Zendesk: 76, Intercom: 48, Tidio: 12, HubSpot: 8, Drift: 4, Freshdesk: 68, LiveChat: 0 },
  { topic: "In-app messaging", Kommunicate: 0, Zendesk: 25, Intercom: 29, Tidio: 4, HubSpot: 0, Drift: 21, Freshdesk: 0, LiveChat: 8 },
  { topic: "Knowledge base software", Kommunicate: 0, Zendesk: 56, Intercom: 32, Tidio: 4, HubSpot: 8, Drift: 4, Freshdesk: 28, LiveChat: 4 },
];

// Sources data
export const sourcesData = {
  totalSources: 931,
  sourcesMentioningBrand: 6,
  domains: [
    {
      name: "tidio.com",
      pages: 55,
      responses: 56,
      mentionRate: 0,
      expanded: false,
      subPages: [
        { title: "tidio.com", url: "https://tidio.com/", responses: 9, mentions: "x" },
        { title: "10 Best Chat Widgets for Your Website [AI & Free Chat Support] - Tidio", url: "https://tidio.com/blog/chat-widgets/", responses: 3, mentions: "x" },
        { title: "11 Best Shopify Chatbot Apps for 2025 [Ranking] - Tidio", url: "https://tidio.com/blog/shopify-chatbot/", responses: 2, mentions: "x" },
        { title: "7 Best Chatbot Builders for 2025 [Easy, Fast, No Code] - Tidio", url: "https://tidio.com/blog/chatbot-builder/", responses: 2, mentions: "x" },
      ]
    }
  ]
};

// My website pages data
export const myWebsitePages = {
  totalCitedPages: 3,
  totalErrors: 0,
  totalWarnings: 0,
  pages: [
    {
      folder: "kommunicate.io/blog",
      pageCount: 3,
      citations: 5,
      subPages: [
        { url: "/blog/best-ai-chatbots-for-small-business", citations: 2 },
        { url: "/blog/best-shopify-chatbots-you-cant-live-without", citations: 1 },
        { url: "/blog/top-ai-chatbot-platforms", citations: 2 },
      ]
    }
  ]
};

// Prompts data
export const promptsData = {
  topics: [
    {
      name: "No-Code Bot Builder",
      promptCount: 13,
      visibility: 8,
      relevancy: 85,
      avgRank: 10.1,
      citations: 2,
      llms: ["openai", "gemini", "claude", "meta"],
      prompts: [
        {
          text: "alternatives to ManyChat and Tidio",
          visibility: 0,
          relevancy: 100,
          avgRank: null,
          citations: 0,
          responses: [
            {
              llm: "GPT 5",
              citations: 10,
              brands: ["ManyChat", "Tidio", "Chatfuel", "MobileMonkey", "BotStar", "Landbot", "Intercom", "Drift", "Zendesk", "Freshworks", "HubSpot", "Zoho"],
              response: "If you're looking for alternatives to **ManyChat** and **Tidio** for chat automation, customer engagement, or chatbot marketing, here are some strong...",
              lastRun: "30/10/2025, 06:25:27"
            },
            {
              llm: "Google AI Overview",
              citations: 21,
              brands: ["ManyChat", "Tidio", "Intercom", "Drift", "Chatfuel", "MobileMonkey", "HubSpot CMS", "Freshchat", "Freshworks", "Gorgias"],
              response: "Alternatives to ManyChat and Tidio include Intercom, Drift, Chatfuel, MobileMonkey, and HubSpot CMS, each offering different strengths like B2B focus...",
              lastRun: "30/10/2025, 06:25:27"
            }
          ]
        }
      ]
    }
  ]
};

// Competitor comparisons
export const competitorComparisons = [
  {
    competitor: "Zendesk",
    sharedPrompts: 1,
    kommunicateHigher: 0,
    kommunicateLeadsIn: [],
    competitorLeadsIn: [{ topic: "No-Code Bot Builder", percentage: 100 }]
  },
  {
    competitor: "Intercom",
    sharedPrompts: 2,
    kommunicateHigher: 0,
    kommunicateLeadsIn: [],
    competitorLeadsIn: [
      { topic: "Conversational Support Automation", percentage: 100 },
      { topic: "No-Code Bot Builder", percentage: 100 }
    ]
  },
  {
    competitor: "Tidio",
    sharedPrompts: 4,
    kommunicateHigher: 0,
    kommunicateLeadsIn: [],
    competitorLeadsIn: [
      { topic: "No-Code Bot Builder", percentage: 100 },
      { topic: "AI Chatbot Platforms", percentage: 100 },
      { topic: "Conversational Support Automation", percentage: 100 }
    ]
  },
  {
    competitor: "HubSpot",
    sharedPrompts: 1,
    kommunicateHigher: 0,
    kommunicateLeadsIn: [],
    competitorLeadsIn: [{ topic: "No-Code Bot Builder", percentage: 100 }]
  },
  {
    competitor: "Drift",
    sharedPrompts: 1,
    kommunicateHigher: 0,
    kommunicateLeadsIn: [],
    competitorLeadsIn: [{ topic: "No-Code Bot Builder", percentage: 100 }]
  },
];

export type AnalyticsData = typeof analyticsData;
export type CompetitorData = typeof competitorData;
