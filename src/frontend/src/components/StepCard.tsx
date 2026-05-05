import { getLucideIcon } from "@/lib/icons";
import type { PlaybookStep } from "@/types/playbook";
import { ArrowRight, Monitor } from "lucide-react";

interface StepCardProps {
  step: PlaybookStep;
  isLast?: boolean;
  "data-ocid"?: string;
}

export function StepCard({
  step,
  isLast = false,
  "data-ocid": dataOcid,
}: StepCardProps) {
  const IconComponent = getLucideIcon(step.icon);
  const stepNum = Number(step.stepNumber);

  return (
    <div className="relative flex gap-4" data-ocid={dataOcid}>
      {/* Connector line */}
      {!isLast && (
        <div className="absolute left-6 top-14 bottom-0 w-px bg-gradient-to-b from-primary/40 to-transparent" />
      )}

      {/* Step badge */}
      <div className="flex-shrink-0 flex flex-col items-center gap-1">
        <div className="step-badge relative shadow-card">
          <span className="relative z-10">{stepNum}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 pb-6">
        <div className="bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-smooth shadow-card group">
          {/* Action row */}
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 text-primary group-hover:bg-primary/20 transition-smooth">
              <IconComponent className="w-4 h-4" />
            </div>
            <h3 className="font-semibold font-display text-foreground text-sm flex-1">
              {step.actionLabel}
            </h3>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-smooth" />
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed pl-11">
            {step.description}
          </p>

          {/* UI Element highlight */}
          {step.uiElement && (
            <div className="mt-3 ml-11 flex items-center gap-2 px-3 py-1.5 bg-accent/10 border border-accent/25 rounded-lg">
              <Monitor className="w-3.5 h-3.5 text-accent flex-shrink-0" />
              <span className="text-xs font-mono text-accent">
                {step.uiElement}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
