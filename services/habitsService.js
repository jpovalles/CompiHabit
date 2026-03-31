import { supabase } from "@/utils/supabase";

export const getHabits = async () => {
    let { data, error } = await supabase
        .from('habit_type')
        .select('*')
    if (error) throw error;
    return data;
};

