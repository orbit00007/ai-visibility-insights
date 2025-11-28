import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { label: "Overview", path: "/" },
  { label: "Prompts", path: "/prompts" },
  {
    label: "Sources",
    path: "/sources",
    dropdown: [
      { label: "All Cited Sources", path: "/sources-all" },
      { label: "My Website Pages", path: "/sources-my-website-pages" },
    ],
  },
  {
    label: "Competitors",
    path: "/competitors",
    dropdown: [
      { label: "Comparisons", path: "/competitors-comparisons" },
      { label: "Topics Matrix", path: "/competitors-topics" },
      { label: "Settings", path: "/competitors-settings" },
    ],
  },
  {
    label: "Actions",
    path: "/actions",
    dropdown: [
      { label: "Executive Summary", path: "/executive-summary" },
      { label: "Recommendations", path: "/recommendations" },
      { label: "Performance Insights", path: "/performance-insights" },
      { label: "Analyze Page", path: "/analyze-page" },
      { label: "Simulate Changes", path: "/simulate-changes" },
      { label: "Generate Content", path: "/generate-content" },
    ],
  },
];

export const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string, dropdown?: { path: string }[]) => {
    if (dropdown) {
      return dropdown.some((item) => location.pathname === item.path);
    }
    return location.pathname === path;
  };

  return (
    <nav className="border-b border-border bg-card">
      <div className="flex items-center gap-1 px-6">
        {navItems.map((item) =>
          item.dropdown ? (
            <DropdownMenu key={item.label}>
              <DropdownMenuTrigger
                className={cn(
                  "nav-tab flex items-center gap-1 outline-none",
                  isActive(item.path, item.dropdown) && "nav-tab-active"
                )}
              >
                {item.label}
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="bg-card border-border">
                {item.dropdown.map((subItem) => (
                  <DropdownMenuItem key={subItem.path} asChild>
                    <NavLink
                      to={subItem.path}
                      className={cn(
                        "w-full cursor-pointer",
                        location.pathname === subItem.path && "bg-muted"
                      )}
                    >
                      {subItem.label}
                    </NavLink>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "nav-tab",
                location.pathname === item.path && "nav-tab-active"
              )}
            >
              {item.label}
            </NavLink>
          )
        )}
      </div>
    </nav>
  );
};
