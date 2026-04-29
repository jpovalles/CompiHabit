// hooks/useStreakReset.js
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/src/context/AuthContext";
import { useEffect } from "react";

/**
 * It listen when a streak is reset , calls onReset function when current_days goes to 0.
 */
export function useStreakListener(onReset) {
    const { session } = useAuth();

    useEffect(() => {
        if (!session?.user?.id) return;

        const userId = session.user.id;

        const channel = supabase
            .channel(`streak-listener-${userId}`)
            .on(
                "postgres_changes",
                {
                    event: "UPDATE",
                    schema: "public",
                    table: "streaks",
                },
                async (payload) => {
                    const { new: newRow, old: oldRow } = payload;
                    console.log("🔥 EVENT RECEIVED:", payload);


                    // Checks if this streak belongs to the current user
                    const { data: pact } = await supabase
                        .from("pacts")
                        .select("id_host, id_guest")
                        .eq("id_pact", newRow.id_pact)
                        .single();

                    const isMyStreak =
                        pact?.id_host === userId || pact?.id_guest === userId;

                    if (isMyStreak) {
                        onReset();
                    }
                }
            )
            .subscribe((status) => console.log(status));
        return () => {
            supabase.removeChannel(channel);
        };
    }, [session?.user?.id]);
}