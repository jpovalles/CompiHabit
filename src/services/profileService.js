import { supabase } from "@/lib/supabase";

export const searchUsers = async (query, currentUserId) => {
    const { data, error } = await supabase
        .from('profiles')
        .select('id_profile, username, avatar_url')
        .ilike('username', `%${query}%`)
        .neq('id_profile', currentUserId)
        .limit(10);

    if (error) throw error;
    return data;
};