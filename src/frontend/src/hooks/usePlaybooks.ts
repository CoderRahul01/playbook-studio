import { createActor } from "@/backend";
import { type Playbook, normalizePlaybook } from "@/types/playbook";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

export function usePlaybooks() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Playbook[]>({
    queryKey: ["playbooks"],
    queryFn: async () => {
      if (!actor) return [];
      const raw = await actor.listPlaybooks();
      return raw.map(normalizePlaybook);
    },
    enabled: !!actor && !isFetching,
  });
}
