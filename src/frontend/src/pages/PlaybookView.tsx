import { StepCard } from "@/components/StepCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { usePlaybook } from "@/hooks/usePlaybook";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clipboard,
  Globe,
  Image as ImageIcon,
  Layers,
  Plus,
  Share2,
  Target,
} from "lucide-react";
import { toast } from "sonner";

/** Map common platform names to a simple colour class for the badge. */
function getPlatformStyle(name: string): { bg: string; text: string } {
  const n = name.toLowerCase();
  if (n.includes("github"))
    return { bg: "bg-[#24292e]/30 border-[#444]/40", text: "text-white" };
  if (n.includes("google") || n.includes("gmail"))
    return { bg: "bg-blue-500/10 border-blue-500/30", text: "text-blue-400" };
  if (n.includes("figma"))
    return {
      bg: "bg-purple-500/10 border-purple-500/30",
      text: "text-purple-400",
    };
  if (n.includes("notion"))
    return { bg: "bg-muted/60 border-border", text: "text-foreground" };
  if (n.includes("slack"))
    return {
      bg: "bg-emerald-500/10 border-emerald-500/30",
      text: "text-emerald-400",
    };
  if (n.includes("linear"))
    return {
      bg: "bg-violet-500/10 border-violet-500/30",
      text: "text-violet-400",
    };
  if (n.includes("jira"))
    return { bg: "bg-blue-600/10 border-blue-600/30", text: "text-blue-400" };
  if (n.includes("vercel"))
    return { bg: "bg-muted/60 border-border", text: "text-foreground" };
  if (n.includes("lovable"))
    return { bg: "bg-rose-500/10 border-rose-500/30", text: "text-rose-400" };
  return { bg: "bg-primary/10 border-primary/30", text: "text-primary" };
}

export default function PlaybookViewPage() {
  const { id } = useParams({ from: "/playbook/$id" });
  const navigate = useNavigate();
  const {
    data: playbook,
    isLoading,
    isError,
  } = usePlaybook(id ? BigInt(id) : null);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied!", {
      description: "Share this playbook URL with anyone.",
      duration: 4000,
    });
  };

  /* ── Loading ─────────────────────────────────────────────────────────── */
  if (isLoading) {
    return (
      <div
        className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-6"
        data-ocid="playbook.loading_state"
      >
        {/* Back skeleton */}
        <Skeleton className="h-5 w-32 rounded-md" />

        {/* Header card skeleton */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-card">
          <Skeleton className="h-52 w-full rounded-none" />
          <div className="p-6 space-y-4">
            <div className="flex gap-2">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <Skeleton className="h-7 w-3/4" />
            <Skeleton className="h-16 w-full rounded-xl" />
          </div>
        </div>

        {/* Steps skeleton */}
        <div className="space-y-1">
          <Skeleton className="h-4 w-40 mb-5" />
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="flex gap-4 pb-6">
              <Skeleton className="h-12 w-12 rounded-lg flex-shrink-0" />
              <div className="flex-1 bg-card border border-border rounded-xl p-4 space-y-2">
                <div className="flex gap-3">
                  <Skeleton className="h-8 w-8 rounded-lg flex-shrink-0" />
                  <Skeleton className="h-5 w-48" />
                </div>
                <Skeleton className="h-4 w-full ml-11" />
                <Skeleton className="h-4 w-2/3 ml-11" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ── Error / not found ───────────────────────────────────────────────── */
  if (isError || !playbook) {
    return (
      <div
        className="max-w-3xl mx-auto px-4 sm:px-6 py-24 text-center"
        data-ocid="playbook.error_state"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-muted/50 border border-border mb-5">
          <BookOpen className="w-7 h-7 text-muted-foreground/50" />
        </div>
        <h2 className="text-subheading text-foreground mb-2">
          Playbook not found
        </h2>
        <p className="text-sm text-muted-foreground mb-8 max-w-sm mx-auto">
          This playbook may have been removed or the link is incorrect. Head
          home to create a new one.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button
            onClick={() => navigate({ to: "/" })}
            data-ocid="playbook.go_home_button"
          >
            <Plus className="w-4 h-4 mr-2" />
            Go Home
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate({ to: "/library" })}
            data-ocid="playbook.back_button"
          >
            <Layers className="w-4 h-4 mr-2" />
            View Library
          </Button>
        </div>
      </div>
    );
  }

  /* ── Data ────────────────────────────────────────────────────────────── */
  const dateStr = new Date(
    Number(playbook.createdAt / 1_000_000n),
  ).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const sortedSteps = [...playbook.steps].sort((a, b) =>
    Number(a.stepNumber - b.stepNumber),
  );

  const platformStyle = getPlatformStyle(playbook.platformName);
  const screenshotUrl = playbook.screenshot.getDirectURL
    ? playbook.screenshot.getDirectURL()
    : null;

  /* ── Render ──────────────────────────────────────────────────────────── */
  return (
    <div
      className="max-w-3xl mx-auto px-4 sm:px-6 py-10"
      data-ocid="playbook.page"
    >
      {/* ── Breadcrumb nav ─────────────────────────────────────────────── */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1 text-xs text-muted-foreground mb-7"
      >
        <Link
          to="/"
          className="flex items-center gap-1 hover:text-foreground transition-smooth"
          data-ocid="playbook.home_link"
        >
          <Plus className="w-3.5 h-3.5" />
          Create New
        </Link>
        <ChevronRight className="w-3.5 h-3.5 opacity-40" />
        <Link
          to="/library"
          className="hover:text-foreground transition-smooth"
          data-ocid="playbook.library_link"
        >
          Library
        </Link>
        <ChevronRight className="w-3.5 h-3.5 opacity-40" />
        <span
          className="text-foreground font-medium truncate max-w-[140px]"
          title={playbook.title}
        >
          {playbook.title}
        </span>
      </nav>

      {/* ── Header card ────────────────────────────────────────────────── */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden mb-8 shadow-elevated">
        {/* Screenshot */}
        <div className="relative h-56 bg-muted/20 overflow-hidden">
          {screenshotUrl ? (
            <img
              src={screenshotUrl}
              alt={`${playbook.platformName} screenshot`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-3">
              <div className="w-14 h-14 rounded-xl bg-muted/50 border border-border flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-muted-foreground/40" />
              </div>
              <span className="text-xs text-muted-foreground/50">
                No screenshot attached
              </span>
            </div>
          )}
          {/* Gradient overlay for text legibility */}
          {screenshotUrl && (
            <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
          )}
          {/* Platform pill overlaid on screenshot */}
          <div className="absolute bottom-3 left-4">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold font-display backdrop-blur-sm ${
                platformStyle.bg
              } ${platformStyle.text}`}
            >
              <Globe className="w-3.5 h-3.5" />
              {playbook.platformName}
            </span>
          </div>
        </div>

        {/* Meta + title */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-2.5">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Layers className="w-3.5 h-3.5" />
                  {sortedSteps.length}{" "}
                  {sortedSteps.length === 1 ? "step" : "steps"}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" />
                  {dateStr}
                </span>
              </div>
              <h1 className="text-subheading text-foreground leading-snug">
                {playbook.title}
              </h1>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="flex-shrink-0 gap-2"
              onClick={handleShare}
              data-ocid="playbook.share_button"
            >
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </div>

          {/* Task Goal */}
          <div
            className="flex gap-3 p-4 bg-primary/5 border border-primary/20 rounded-xl"
            data-ocid="playbook.task_goal"
          >
            <Target className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <div className="min-w-0">
              <p className="text-label mb-1">Task Goal</p>
              <p className="text-sm text-foreground leading-relaxed">
                {playbook.taskGoal}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Steps section ──────────────────────────────────────────────── */}
      <div data-ocid="playbook.steps_list">
        {/* Section header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/15 border border-primary/30">
              <CheckCircle2 className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-label tracking-wider">
              Step-by-Step Walkthrough
            </h2>
          </div>
          <Badge variant="secondary" className="font-mono text-xs">
            {sortedSteps.length} steps
          </Badge>
        </div>

        {/* Step cards */}
        <div className="space-y-0">
          {sortedSteps.map((step, index) => (
            <StepCard
              key={step.stepNumber.toString()}
              step={step}
              isLast={index === sortedSteps.length - 1}
              data-ocid={`playbook.step.item.${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ── Bottom CTA ─────────────────────────────────────────────────── */}
      <div className="mt-10 p-5 bg-card border border-border rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex-shrink-0">
            <Clipboard className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              Need another walkthrough?
            </p>
            <p className="text-xs text-muted-foreground">
              Upload a new screenshot to generate a fresh playbook.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate({ to: "/library" })}
            data-ocid="playbook.view_library_button"
          >
            <Layers className="w-4 h-4 mr-2" />
            Library
          </Button>
          <Button
            size="sm"
            onClick={() => navigate({ to: "/" })}
            data-ocid="playbook.create_new_button"
          >
            <ArrowLeft className="w-4 h-4 mr-2 rotate-180" />
            Create New
          </Button>
        </div>
      </div>
    </div>
  );
}
