import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { label: "Overview", path: "/" },
  { label: "Executive Summary", path: "/executive-summary" },
  {
    label: "Performance Hub",
    path: "/performance",
    dropdown: [
      { label: "Prompts", path: "/prompts" },
      { label: "Sources", path: "/sources-all" },
      { label: "Competitors", path: "/competitors-comparisons" },
      { label: "Brand Sentiment", path: "/brand-sentiment" },
      { label: "Recommendations", path: "/recommendations" },
    ],
  },
  {
    label: "Content Hub",
    path: "/content",
    comingSoon: true,
    dropdown: [
      { label: "Analyze Page", path: "/analyze-page", disabled: true },
      { label: "Simulate Changes", path: "/simulate-changes", disabled: true },
      { label: "Generate Content", path: "/generate-content", disabled: true },
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
    <nav className="border-b border-border bg-card hidden md:block">
      <div className="flex items-center gap-1 px-6 overflow-x-auto">
        {navItems.map((item) =>
          item.dropdown ? (
            <DropdownMenu key={item.label}>
              <DropdownMenuTrigger
                className={cn(
                  "nav-tab flex items-center gap-1 outline-none whitespace-nowrap",
                  isActive(item.path, item.dropdown) && "nav-tab-active",
                  item.comingSoon && "opacity-60"
                )}
              >
                {item.label}
                {item.comingSoon && <Lock className="w-3 h-3 ml-1" />}
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="bg-card border-border z-50">
                {item.comingSoon && (
                  <div className="px-2 py-1.5 text-xs text-muted-foreground border-b border-border mb-1">
                    Coming Soon
                  </div>
                )}
                {item.dropdown.map((subItem) => (
                  <DropdownMenuItem 
                    key={subItem.path} 
                    asChild
                    disabled={subItem.disabled}
                  >
                    <NavLink
                      to={subItem.disabled ? "#" : subItem.path}
                      className={cn(
                        "w-full cursor-pointer",
                        location.pathname === subItem.path && "bg-muted",
                        subItem.disabled && "opacity-50 cursor-not-allowed pointer-events-none"
                      )}
                      onClick={(e) => subItem.disabled && e.preventDefault()}
                    >
                      {subItem.label}
                      {subItem.disabled && <Lock className="w-3 h-3 ml-auto" />}
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
                "nav-tab whitespace-nowrap",
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
