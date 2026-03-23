import { supabase } from "../utils/supabase";

export const createPact = async (pact) => {
  const { data, error } = await supabase.from("pacts").insert(pact);
  if (error) throw error;
  return data;
};
