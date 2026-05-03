import { supabase } from "@/lib/supabase";
import { fetchUserAchievements } from "@/src/logic/achievements";


const update_achievement = async (achievement, newValue, achieved = false) => {
    const { error } = await supabase
        .from("user_achievements")
        .update({
            achieved,
            current_progress: newValue
        })
        .eq("id_user", achievement.id_user)
        .eq("id_achievement", achievement.id_achievement);
    if (error) throw error;
}


const check_weekly_streak = async (achievement) => {
    let { data, error } = await supabase
        .rpc("get_max_daily_streak", { user_id: achievement.id_user });

    if (error) throw error;
    if (!data) data = 0;

    await update_achievement(achievement, data, data >= 7);
    return { ...achievement, current_progress: data, achieved: data >= 7 }
}

const check_multiple_habits = async (achievement) => {
    const { data, error } = await supabase
        .from("pacts")
        .select("id_habit_type")
        .or(`id_host.eq.${achievement.id_user},id_guest.eq.${achievement.id_user}`)
        .eq("id_status_pact", 2);

    if (error) throw error;

    const uniqueHabitTypes = new Set(data?.map((pact) => pact.id_habit_type));
    const hasAllCategories = uniqueHabitTypes.size >= 3;

    await update_achievement(achievement, uniqueHabitTypes.size, hasAllCategories);
    return { ...achievement, current_progress: uniqueHabitTypes.size, achieved: hasAllCategories }
}

export const check_night_streak = async (achievement) => {
    const { data, error } = await supabase
        .rpc("get_night_streaks", { user_id: achievement.id_user });

    const achieved = data >= 1;

    await update_achievement(achievement, achieved ? 1 : 0, achieved);
    return { ...achievement, current_progress: achieved ? 1 : 0, achieved: achieved }
}

export const check_morning_streak = async (achievement) => {
    const { data, error } = await supabase
        .rpc("get_morning_streaks", { user_id: achievement.id_user });

    const achieved = data >= 1;

    await update_achievement(achievement, achieved ? 1 : 0, achieved);
    return { ...achievement, current_progress: achieved ? 1 : 0, achieved: achieved }
}

const checkAchieved = async (achievement) => {
    if (achievement.achieved) return achievement;

    const new_progress = achievement

    switch (achievement.title) {
        case "Deber diario":
            return check_weekly_streak(achievement)
        case "Arcoíris de hábitos":
            return check_multiple_habits(achievement)
        case "Guardián de la noche":
            return check_night_streak(achievement)
        case "Disciplina mañanera":
            return check_morning_streak(achievement)
        case "Maestro de la constancia":
            return check_master_consistency(achievement)
    }
}

export default async function useCheckAchievements(id_user) {
    const achievements = await fetchUserAchievements(id_user);

    // const checkAchievementsProgress = achievements.map(checkAchieved)
}