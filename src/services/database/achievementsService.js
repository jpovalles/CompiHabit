import { supabase } from "@/lib/supabase";

export const getUserAchievements = async (id_user) => {
    const { data, error } = await supabase
        .from("user_achievements")
        .select(`
    id_achievement,
    id_user,
    achieved,
    current_progress,
    achievements(
      title,
      description,
      icon,
      goal_value
    )
  `)
        .eq("id_user", id_user);
    if (error) throw error;
    return data;
}