import { updateUsername } from "@/src/services/profileService";

export const handleEditUsername = async (id_user, newUsername) => {
    if (!newUsername) {
        throw new Error("El nombre de usuario no puede estar vacío.");
    }

    if (newUsername.length < 3) {
        throw new Error("El nombre de usuario debe tener al menos 3 caracteres.");
    }

    try {
        let data = await updateUsername(id_user, newUsername);
    } catch (error) {
        throw error;
    }
}