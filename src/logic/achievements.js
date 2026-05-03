import { getUserAchievements } from "@/src/services/database/achievementsService";

export const fetchUserAchievements = async (id_user) => {
    const response = await getUserAchievements(id_user);

    if (!response) return [];

    const formatted = response.map((item) => ({
        id_achievement: item.id_achievement,
        id_user: item.id_user,
        achieved: item.achieved,
        current_progress: item.current_progress,
        ...item.achievements,
    }));
    console.log(formatted[0]);
    console.log(formatted.length);
    return formatted;
}   