import { PlaybookCard } from "@/components/PlaybookCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { usePlaybooks } from "@/hooks/usePlaybooks";
import { useNavigate } from "@tanstack/react-router";
import { BookOpen, Library, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";

export default function LibraryPage() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { data: playbooks = [], isLoading } = usePlaybooks();

  const filtered = useMemo(() => {
    if (!query.trim()) return playbooks;
    const q = query.toLowerCase();
    return playbooks.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.taskGoal.toLowerCase().includes(q) ||
        p.platformName.toLowerCase().includes(q),
    );
  }, [playbooks, query]);

  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      data-ocid="library.page"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/15 border border-primary/25 mt-0.5 flex-shrink-0">
            <Library className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-subheading text-foreground">
                Your Playbooks
              </h1>
              {!isLoading && (
                <span
                  className="inline-flex items-center justify-center min-w-[1.5rem] h-6 rounded-full bg-primary/15 border border-primary/25 px-2 text-xs font-semibold text-primary font-mono"
                  data-ocid="library.count_badge"
                >
                  {playbooks.length}
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">
              {isLoading
                ? "Loading playbooks…"
                : playbooks.length === 0
                  ? "No playbooks saved yet"
                  : `${playbooks.length} playbook${playbooks.length !== 1 ? "s" : ""} saved`}
            </p>
          </div>
        </div>
        <Button
          className="gap-2 flex-shrink-0"
          onClick={() => navigate({ to: "/" })}
          data-ocid="library.create_button"
        >
          <Plus className="w-4 h-4" />
          Create New
        </Button>
      </div>

      {/* Search — shown whenever not loading */}
      {!isLoading && playbooks.length > 0 && (
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, goal, or platform…"
            className="pl-9"
            data-ocid="library.search_input"
          />
        </div>
      )}

      {/* Loading skeletons */}
      {isLoading && (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          data-ocid="library.loading_state"
        >
          {["s1", "s2", "s3", "s4", "s5", "s6"].map((key) => (
            <div
              key={key}
              className="rounded-xl overflow-hidden border border-border bg-card space-y-0"
            >
              <Skeleton className="h-36 w-full rounded-none" />
              <div className="p-4 space-y-2.5">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
                <div className="flex gap-3 pt-1">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && playbooks.length === 0 && (
        <div
          className="flex flex-col items-center justify-center py-20 text-center"
          data-ocid="library.empty_state"
        >
          <div className="relative mb-6">
            <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20">
              <BookOpen className="w-10 h-10 text-primary" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-muted border border-border flex items-center justify-center">
              <Plus className="w-3 h-3 text-muted-foreground" />
            </div>
          </div>
          <h2 className="text-subheading text-foreground mb-2">
            No playbooks yet
          </h2>
          <p className="text-sm text-muted-foreground max-w-sm mb-6 leading-relaxed">
            Upload a screenshot and describe your goal to generate your first
            step-by-step walkthrough.
          </p>
          <Button
            className="gap-2"
            onClick={() => navigate({ to: "/" })}
            data-ocid="library.empty_create_button"
          >
            <Plus className="w-4 h-4" />
            Create Your First Playbook
          </Button>
        </div>
      )}

      {/* No search results */}
      {!isLoading && playbooks.length > 0 && filtered.length === 0 && (
        <div
          className="flex flex-col items-center py-16 text-center"
          data-ocid="library.no_results_state"
        >
          <Search className="w-10 h-10 text-muted-foreground/30 mb-3" />
          <p className="text-sm text-muted-foreground">
            No playbooks match &ldquo;{query}&rdquo;
          </p>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="text-xs text-primary underline underline-offset-2 mt-2 hover:no-underline transition-smooth"
            data-ocid="library.clear_search_button"
          >
            Clear search
          </button>
        </div>
      )}

      {/* Grid */}
      {!isLoading && filtered.length > 0 && (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          data-ocid="library.playbook_list"
        >
          {filtered.map((playbook, index) => (
            <PlaybookCard
              key={playbook.id.toString()}
              playbook={playbook}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
}
