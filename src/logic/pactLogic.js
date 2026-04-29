import { PACT_STATUS } from "@/src/constants/db_constants/pacts";
import {
  acceptInvitationDB,
  deletePactById,
  getCurrentDayPact,
  getNoCurrentDayPacts,
  getPactsByPartners,
  getPactsByRole,
  insertPact,
} from "@/src/services/database/pactService";

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
    id_status_pact,
    habit_type (
      habit_name
    ),
    ${otherRole}:profiles!pacts_id_${otherRole}_fkey (
      username
    )
  `;

  return await getPactsByRole(myRole, userId, PACT_STATUS.PENDING, selectQuery);
};

export const getReceivedInvitations = (userId) =>
  getInvitations(userId, "received");

export const getSentInvitations = (userId) => getInvitations(userId, "sent");

export const rejectInvitation = async (idPact) => {
  return await deletePactById(idPact);
};

export const acceptInvitation = async (idPact) => {
  return await acceptInvitationDB(idPact);
};

export const fetchCurrentDayPact = async (idUser, day) => {
  return await getCurrentDayPact(idUser, day);
};

export const fetchNoCurrentDayPacts = async (idUser, day) => {
  return await getNoCurrentDayPacts(idUser, day);
};
