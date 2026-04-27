import { supabase } from "@/lib/supabase";

export const submitProof = async (id_streak, id_user, media_url = null, summary = null) => {
    const { data, error } = await supabase
        .from("proofs")
        .update({
            media_url,
            summary
        })
        .eq("id_streak", id_streak)
        .eq("id_submitted_by", id_user)
        .select();
    if (error) throw error;
    return data;
};