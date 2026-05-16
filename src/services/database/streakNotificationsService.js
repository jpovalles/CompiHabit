import { supabase } from "@/lib/supabase";

export async function getStreakNotifications(userId) {
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
    .eq("id_profile", userId)
    .eq("seen", false);
  if (error) throw error;
  return data;
}

export async function updateSingleNotification(notificationId) {
  const { error } = await supabase
    .from("streak_notifications")
    .update({ seen: true })
    .eq("id_notification", notificationId);
  if (error) throw error;
}

export async function updateMultipleNotifications(ids) {
  const { error } = await supabase
    .from("streak_notifications")
    .update({ seen: true })
    .in("id_notification", ids);
  if (error) throw error;
}
