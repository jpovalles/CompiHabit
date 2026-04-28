import { getProofData, submitProof } from "../services/database/proofService";

export const submitTextProof = async (id_streak, id_user, text_proof) => {
    return await submitProof(id_streak, id_user, null, text_proof);
};

export const submitImageProof = async (id_streak, id_user, photo_url) => {
    return await submitProof(id_streak, id_user, photo_url, null);
};

export const getProof = async (id_streak, id_submitted_by) => {
    return await getProofData(id_streak, id_submitted_by);
};
