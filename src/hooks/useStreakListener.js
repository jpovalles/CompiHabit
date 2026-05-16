import { supabase } from "@/lib/supabase";
import { useAuth } from "@/src/context/AuthContext";
import { useEffect } from "react";

export function useStreakListener(onEvent) {
  const { session } = useAuth();

  useEffect(() => {
    if (!session?.user?.id) return;

    const userId = session.user.id;

    const channel = supabase
      .channel(`streak-listener-${userId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "streaks",
        },
        async (payload) => {
          const { new: newRow, old: oldRow } = payload;

          // Checks if this streak belongs to the current user
          const { data: pact } = await supabase
            .from("pacts")
            .select("id_host, id_guest")
            .eq("id_pact", newRow.id_pact)
            .single();

          const isMyStreak =
            pact?.id_host === userId || pact?.id_guest === userId;

          if (isMyStreak) {
            onEvent();
          }
        },
      )
      .subscribe((status) => console.log(status));
    return () => {
      supabase.removeChannel(channel);
    };
  }, [session?.user?.id]);
}
