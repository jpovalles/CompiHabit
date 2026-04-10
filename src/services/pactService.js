import { supabase } from "@/lib/supabase";

// Inserts a new pact record
export const insertPact = async (pact) => {
  const { data, error } = await supabase.from("pacts").insert(pact);
  if (error) throw error;
  return data;
};

// Queries pacts matching both partners for a given habit type
export const getPactsByPartners = async (idHost, idGuest, idHabitType) => {
  const { data, error } = await supabase
    .from("pacts")
    .select("id_pact")
    .eq("id_habit_type", idHabitType)
    .or(
      `and(id_guest.eq.${idHost},id_host.eq.${idGuest}),and(id_guest.eq.${idGuest},id_host.eq.${idHost})`,
    );
  if (error) throw error;
  return data;
};

// Queries pacts by a specific role (host/guest) with a given status and select query
export const getPactsByRole = async (role, userId, statusId, selectQuery) => {
  const { data, error } = await supabase
    .from("pacts")
    .select(selectQuery)
    .eq(`id_${role}`, userId)
    .eq("id_status_pact", statusId);
  if (error) throw error;
  return data;
};

// Deletes a pact record by its id
export const deletePactById = async (idPact) => {
  const { data, error } = await supabase
    .from("pacts")
    .delete()
    .eq("id_pact", idPact);
  if (error) throw error;
  return data;
};
