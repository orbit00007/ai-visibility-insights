import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Overview from "./pages/Overview";
import Prompts from "./pages/Prompts";
import SourcesAll from "./pages/SourcesAll";
import CompetitorsComparisons from "./pages/CompetitorsComparisons";
import BrandSentiment from "./pages/BrandSentiment";
import Recommendations from "./pages/Recommendations";
import ExecutiveSummary from "./pages/ExecutiveSummary";
import AnalyzePage from "./pages/AnalyzePage";
import SimulateChanges from "./pages/SimulateChanges";
import GenerateContent from "./pages/GenerateContent";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/prompts" element={<Prompts />} />
          <Route path="/sources-all" element={<SourcesAll />} />
          <Route path="/competitors-comparisons" element={<CompetitorsComparisons />} />
          <Route path="/brand-sentiment" element={<BrandSentiment />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/executive-summary" element={<ExecutiveSummary />} />
          <Route path="/analyze-page" element={<AnalyzePage />} />
          <Route path="/simulate-changes" element={<SimulateChanges />} />
          <Route path="/generate-content" element={<GenerateContent />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
