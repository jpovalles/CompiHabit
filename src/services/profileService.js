import { supabase } from "@/lib/supabase";

export const searchUsers = async (query, currentUserId) => {
    const { data, error } = await supabase
        .from('profiles')
        .select('id_profile, username, avatar_url')
        .ilike('username', `%${query}%`)  // búsqueda parcial, case-insensitive
        .neq('id_profile', currentUserId)         // excluir al usuario actual
        .limit(10);

    if (error) throw error;
    return data;
};