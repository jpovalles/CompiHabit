import { supabase } from "../utils/supabase";

export const createPact = async (pact) => {
  // First we check if the partners are already enrolled in a pact of the same type
  const { id_host, id_guest, id_habit_type } = pact;
  const { data: existingPact, error: existingPactError } = await supabase
    .from('pacts')
    .select('id_pact')
    .eq('id_habit_type', id_habit_type)
    .or(`and(id_guest.eq.${id_host},id_host.eq.${id_guest}),and(id_guest.eq.${id_guest},id_host.eq.${id_host})`);

  if (existingPactError) throw existingPactError;
  if (existingPact.length > 0) throw new Error("Los participantes ya tienen un pacto de este tipo. Por favor, cree un pacto de otro tipo.");

  const { data, error } = await supabase.from("pacts").insert(pact);
  if (error) throw error;
  return data;
};

export const getReceivedInvitations = async (id_user) => {
  const { data, error } = await supabase
    .from('pacts')
    .select(`
    id_pact,
    id_host,
    id_guest,
    pact_days,
    pact_hours,
    id_status_pact,
    habit_type (
      habit_name
    ),
    host:profiles!pacts_id_host_fkey (
      username
    )
  `)
    .eq('id_guest', id_user)
    .eq('id_status_pact', 1)
  if (error) throw error;
  return data;
};
