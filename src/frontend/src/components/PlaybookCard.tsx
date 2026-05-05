import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Playbook } from "@/types/playbook";
import { Link } from "@tanstack/react-router";
import { BookOpen, ChevronRight, Clock, Layers } from "lucide-react";

interface PlaybookCardProps {
  playbook: Playbook;
  index: number;
}

export function PlaybookCard({ playbook, index }: PlaybookCardProps) {
  const dateStr = new Date(
    Number(playbook.createdAt / 1_000_000n),
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const screenshotUrl = playbook.screenshot.getDirectURL();

  return (
    <Link
      to="/playbook/$id"
      params={{ id: playbook.id.toString() }}
      data-ocid={`playbook.card.item.${index + 1}`}
    >
      <Card className="overflow-hidden hover:border-primary/40 transition-smooth shadow-card hover:shadow-elevated cursor-pointer group">
        {/* Thumbnail */}
        <div className="relative h-36 bg-muted/40 overflow-hidden">
          {screenshotUrl ? (
            <img
              src={screenshotUrl}
              alt={playbook.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-muted-foreground/30" />
            </div>
          )}
          {/* Platform badge */}
          <div className="absolute top-2 left-2">
            <Badge
              variant="secondary"
              className="text-xs font-mono bg-background/80 backdrop-blur-sm border-border"
            >
              {playbook.platformName}
            </Badge>
          </div>
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold font-display text-foreground text-sm mb-1 line-clamp-1 group-hover:text-primary transition-smooth">
            {playbook.title}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
            {playbook.taskGoal}
          </p>

          {/* Meta */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Layers className="w-3.5 h-3.5" />
                {playbook.steps.length} steps
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                {dateStr}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-smooth" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
