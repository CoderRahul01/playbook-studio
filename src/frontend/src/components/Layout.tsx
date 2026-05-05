import { Link, useLocation } from "@tanstack/react-router";
import { BookOpen, LayoutDashboard, Plus, Sparkles } from "lucide-react";
import type { ReactNode } from "react";

const navItems = [
  { to: "/", label: "Create New", icon: Plus, exact: true },
  { to: "/library", label: "Library", icon: BookOpen, exact: false },
];

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border shadow-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 group transition-smooth"
              data-ocid="nav.logo_link"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/15 border border-primary/30 group-hover:bg-primary/25 transition-smooth">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <span className="text-lg font-bold font-display tracking-tight text-foreground">
                Playbook <span className="text-primary">Studio</span>
              </span>
            </Link>

            {/* Nav */}
            <nav
              className="flex items-center gap-1"
              aria-label="Main navigation"
            >
              {navItems.map(({ to, label, icon: Icon }) => {
                const isActive =
                  to === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(to);
                return (
                  <Link
                    key={to}
                    to={to}
                    data-ocid={`nav.${label.toLowerCase().replace(" ", "_")}_link`}
                    className={[
                      "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-smooth",
                      isActive
                        ? "bg-primary/15 text-primary border border-primary/25"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                    ].join(" ")}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Link>
                );
              })}
            </nav>

            {/* Dashboard icon */}
            <div className="flex items-center">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground px-2 py-1 rounded-md bg-muted/30 border border-border">
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span className="font-mono">v1.0</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 bg-background">{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline transition-smooth"
            >
              caffeine.ai
            </a>
          </p>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Sparkles className="w-3 h-3 text-primary" />
            <span>AI-powered walkthroughs</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
