import type {
  Playbook as BackendPlaybook,
  Step as BackendStep,
  ExternalBlob,
  PlaybookId,
} from "@/backend";

export type { ExternalBlob, PlaybookId };

export interface PlaybookStep {
  stepNumber: bigint;
  icon: string;
  actionLabel: string;
  description: string;
  uiElement?: string;
}

export interface Playbook {
  id: PlaybookId;
  title: string;
  platformName: string;
  taskGoal: string;
  steps: PlaybookStep[];
  screenshot: ExternalBlob;
  createdAt: bigint;
}

export function normalizeStep(s: BackendStep): PlaybookStep {
  return {
    stepNumber: s.stepNumber,
    icon: s.icon,
    actionLabel: s.actionLabel,
    description: s.description,
    uiElement: s.uiElement,
  };
}

export function normalizePlaybook(p: BackendPlaybook): Playbook {
  return {
    id: p.id,
    title: p.title,
    platformName: p.platformName,
    taskGoal: p.taskGoal,
    steps: p.steps.map(normalizeStep),
    screenshot: p.screenshot,
    createdAt: p.createdAt,
  };
}
