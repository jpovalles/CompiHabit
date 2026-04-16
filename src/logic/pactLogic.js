import { supabase } from "@/lib/supabase";
import {
  deletePactById,
  getPactsByPartners,
  getPactsByRole,
  insertPact,
} from "@/src/services/pactService";

// Creates a pact after validating that no duplicate exists between the partners
export const createPact = async (pact) => {
  const { id_host, id_guest, id_habit_type } = pact;

  const existingPacts = await getPactsByPartners(
    id_host,
    id_guest,
    id_habit_type,
  );

  if (existingPacts.length > 0) {
    throw new Error(
      "Los participantes ya tienen un pacto de este tipo. Por favor, cree un pacto de otro tipo.",
    );
  }

  return await insertPact(pact);
};

// Builds the select query for invitations and fetches by role
const getInvitations = async (userId, type = "received") => {
  const isReceived = type === "received";
  const myRole = isReceived ? "guest" : "host";
  const otherRole = isReceived ? "host" : "guest";

  const selectQuery = `
    id_pact,
    id_host,
    id_guest,
    pact_days,
    pact_hours,
    id_status_pact,
    habit_type (
      habit_name
    ),
    ${otherRole}:profiles!pacts_id_${otherRole}_fkey (
      username
    )
  `;

  return await getPactsByRole(myRole, userId, 1, selectQuery);
};

export const getReceivedInvitations = (userId) =>
  getInvitations(userId, "received");

export const getSentInvitations = (userId) => getInvitations(userId, "sent");

export const rejectInvitation = async (idPact) => {
  return await deletePactById(idPact);
};

export const acceptInvitation = async (idPact) => {
  // Transaction to update the pact status to accepted and create a new streak for the pact
  const { error } = await supabase.rpc("accept_invitation", {
    p_id_pact: idPact,
  });
  if (error) throw error;
};
