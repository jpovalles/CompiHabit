import { useAuth } from "@/src/context/AuthContext";
import {
  getStreakNotifications,
  updateMultipleNotifications,
  updateSingleNotification,
} from "@/src/services/database/streakNotificationsService";
import { useEffect, useState } from "react";

export function useStreakNotifications() {
  const { session } = useAuth();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!session?.user?.id) return;
    fetchPendingNotifications();
  }, [session?.user?.id]);

  const fetchPendingNotifications = async () => {
    try {
      const data = await getStreakNotifications(session.user.id);
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
    } catch (error) {
      console.error("Error obteniendo notificaciones:", error.message);
    }
  };

  const markAsSeen = async (idNotification) => {
    try {
      await updateSingleNotification(idNotification);
      setNotifications((prev) =>
        prev.filter((n) => n.id_notification !== idNotification),
      );
    } catch (error) {
      console.error("Error marcando notificación como vista: ", error.message);
    }
  };

  const markAllAsSeen = async () => {
    const ids = notifications.map((n) => n.id_notification);
    if (!ids.length) return;

    try {
      await updateMultipleNotifications(ids);
      setNotifications([]);
    } catch (error) {
      console.error(
        "Error marcando todas las notificaciones como vistas: ",
        error.message,
      );
    }
  };

  return {
    notifications,
    markAsSeen,
    markAllAsSeen,
    fetchPendingNotifications,
  };
}
