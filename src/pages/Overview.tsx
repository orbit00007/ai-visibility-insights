import { Layout } from "@/components/layout/Layout";
import { HeroCard } from "@/components/overview/HeroCard";
import { CompetitorMentions } from "@/components/overview/CompetitorMentions";
import { TopTopics } from "@/components/overview/TopTopics";
import { TopCitedSources } from "@/components/overview/TopCitedSources";

const Overview = () => {
  return (
    <Layout>
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <HeroCard />
          <CompetitorMentions />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <TopTopics />
          <TopCitedSources />
        </div>
      </div>
    </Layout>
  );
};

export default Overview;
