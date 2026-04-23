import { supabase } from "@/lib/supabase";

export const updateUserState = async (idStreak, userToUpdate, idUserState) => {
    const { data, error } = await supabase
        .from("streaks")
        .update({
            [`id_${userToUpdate}_state`]: idUserState,
        })
        .eq("id_streak", idStreak);
    if (error) throw error;
    return data;
};