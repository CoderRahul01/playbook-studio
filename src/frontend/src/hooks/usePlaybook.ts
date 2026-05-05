import { createActor } from "@/backend";
import { type Playbook, normalizePlaybook } from "@/types/playbook";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

export function usePlaybook(id: bigint | null) {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Playbook | null>({
    queryKey: ["playbook", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      const raw = await actor.getPlaybook(id);
      return raw ? normalizePlaybook(raw) : null;
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}
