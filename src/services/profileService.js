import { supabase } from "@/lib/supabase";

// Search users by username
export const searchUsers = async (username, currentUserId) => {
    const { data, error } = await supabase
        .from('profiles')
        .select('id_profile, username, avatar_url')
        .ilike('username', `%${username}%`)
        .neq('id_profile', currentUserId)  // Exclude current user
        .limit(10);

    if (error) throw error;
    return data;
};

// Get user profile by ID
export const searchUserById = async (id) => {
    const { data, error } = await supabase
        .from('profiles')
        .select('id_profile, username, avatar_url')
        .eq('id_profile', id)
        .single();

    if (error) throw error;
    return data;
};

export const updateUsername = async (id, newUsername) => {
    const { data, error } = await supabase
        .from('profiles')
        .update({ username: newUsername })
        .eq('id_profile', id);

    if (error) throw error;
    return data;
};