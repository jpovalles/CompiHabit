import { supabase } from "@/lib/supabase";

export const getHabits = async () => {
    let { data, error } = await supabase
        .from('habit_type')
        .select('*')
    if (error) throw error;
    return data;
};

