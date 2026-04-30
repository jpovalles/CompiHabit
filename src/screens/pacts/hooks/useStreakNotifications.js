import { supabase } from "@/lib/supabase";
import { useAuth } from "@/src/context/AuthContext";
import { useEffect, useState } from "react";

export function useStreakNotifications() {
  const { session } = useAuth();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!session?.user?.id) return;
    fetchPendingNotifications();
  }, [session?.user?.id]);

  const fetchPendingNotifications = async () => {
    const { data, error } = await supabase
      .from("streak_notifications")
      .select(
        `
        id_notification,
        id_streak,
        streaks(
          pacts(
            habit_type(habit_name),
            id_host,
            host:profiles!id_host(username),
            guest:profiles!id_guest(username)
          )
        )
      `,
      )
      .eq("id_profile", session.user.id)
      .eq("seen", false);

    if (error) {
      console.error("Error fetching notifications:", error.message);
      return;
    }

    if (!data?.length) return;

    setNotifications(
      data.map((n) => {
        const pact = n.streaks?.pacts;
        return {
          id_notification: n.id_notification,
          id_streak: n.id_streak,
          habit_name: pact?.habit_type?.habit_name ?? "Hábito",
          id_host: pact?.id_host,
          host_username: pact?.host?.username,
          guest_username: pact?.guest?.username,
        };
      }),
    );
  };

  const markAsSeen = async (idNotification) => {
    const { error } = await supabase
      .from("streak_notifications")
      .update({ seen: true })
      .eq("id_notification", idNotification);

    if (error) {
      console.error("Error marking as seen:", error.message);
      return;
    }

    setNotifications((prev) =>
      prev.filter((n) => n.id_notification !== idNotification),
    );
  };

  const markAllAsSeen = async () => {
    const ids = notifications.map((n) => n.id_notification);
    if (!ids.length) return;

    const { error } = await supabase
      .from("streak_notifications")
      .update({ seen: true })
      .in("id_notification", ids);

    if (error) {
      console.error("Error marking all as seen:", error.message);
      return;
    }

    setNotifications([]);
  };

  return {
    notifications,
    markAsSeen,
    markAllAsSeen,
    fetchPendingNotifications,
  };
}
