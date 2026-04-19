import { supabase } from "@/lib/supabase";

export const getBadgeColors = async () => {
  let { data, error } = await supabase.from("streak_colors").select("*");
  if (error) throw error;
  return data;
};
