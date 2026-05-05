import { type ExternalBlob, createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface GeneratePlaybookInput {
  screenshot: ExternalBlob;
  taskGoal: string;
  platformName: string;
}

export function useGeneratePlaybook() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation<bigint, Error, GeneratePlaybookInput>({
    mutationFn: async ({ screenshot, taskGoal, platformName }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.generatePlaybook(screenshot, taskGoal, platformName);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playbooks"] });
    },
  });
}

export function useDetectPlatform() {
  const { actor } = useActor(createActor);

  return useMutation<string, Error, ExternalBlob>({
    mutationFn: async (screenshot: ExternalBlob) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.detectPlatform(screenshot);
    },
  });
}

export function useCreatePlaybook() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation<
    bigint,
    Error,
    {
      title: string;
      taskGoal: string;
      screenshot: ExternalBlob;
      platformName: string;
      steps: Array<{
        stepNumber: bigint;
        icon: string;
        actionLabel: string;
        description: string;
        uiElement?: string;
      }>;
    }
  >({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createPlaybook(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playbooks"] });
    },
  });
}
