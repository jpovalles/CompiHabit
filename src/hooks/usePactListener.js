import { supabase } from "@/lib/supabase";
import { useAuth } from "@/src/context/AuthContext";
import { useEffect } from "react";

export function usePactListener(onInsert) {
  const { session } = useAuth();

  useEffect(() => {
    if (!session?.user?.id) return;

    const userId = session.user.id;

    const channel = supabase
      .channel(`pacts-listener-${userId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "pacts",
        },
        async (payload) => {
          const newPact = payload.new;

          const isMyPact =
            newPact?.id_host === userId || newPact?.id_guest === userId;

          if (isMyPact) {
            onInsert();
          }
        },
      )
      .subscribe((status) => console.log("PACT CHANNEL STATUS ", status));
    return () => {
      supabase.removeChannel(channel);
    };
  }, [session?.user?.id]);
}
