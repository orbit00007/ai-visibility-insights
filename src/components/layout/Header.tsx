import { MessageSquare, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const mobileNavItems = [
  { label: "Overview", path: "/" },
  { label: "Executive Summary", path: "/executive-summary" },
  { label: "Prompts", path: "/prompts" },
  { label: "Sources", path: "/sources-all" },
  { label: "Competitors", path: "/competitors-comparisons" },
  { label: "Brand Sentiment", path: "/brand-sentiment" },
  { label: "Recommendations", path: "/recommendations" },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="flex items-center justify-between px-4 md:px-6 py-3">
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 -ml-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-amplitude-blue to-amplitude-purple flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs md:text-sm">A</span>
              </div>
              <span className="font-semibold text-foreground text-sm md:text-base">Amplitude</span>
            </div>
            <span className="text-muted-foreground mx-1 md:mx-2 hidden sm:inline">|</span>
            <h1 className="text-base md:text-lg font-semibold text-foreground hidden sm:block">AI Visibility</h1>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <span className="text-xs md:text-sm text-muted-foreground hidden lg:block">
              Data last updated on Oct 30
            </span>
            <Button variant="outline" size="sm" className="gap-1 md:gap-2 text-xs md:text-sm px-2 md:px-3 hidden sm:flex">
              <MessageSquare className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden md:inline">Feedback</span>
            </Button>
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs md:text-sm px-2 md:px-4">
              <span className="hidden sm:inline">Generate New Report</span>
              <span className="sm:hidden">Report</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile menu drawer */}
      <div className={cn(
        "fixed top-[57px] left-0 right-0 bg-card border-b border-border z-50 md:hidden transition-all duration-300 overflow-hidden",
        mobileMenuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
      )}>
        <nav className="p-4 space-y-1">
          {mobileNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "block px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                location.pathname === item.path
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted"
              )}
            >
              {item.label}
            </NavLink>
          ))}
          <div className="px-4 py-3 text-sm text-muted-foreground">
            <span className="font-medium">Content Hub</span>
            <span className="ml-2 text-xs bg-muted px-2 py-0.5 rounded">Coming Soon</span>
          </div>
        </nav>
      </div>
    </>
  );
};
