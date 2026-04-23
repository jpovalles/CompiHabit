import { updateUserState } from "@/src/services/database/streaksService";

export const updateUserStateStreak = async (
  idStreak,
  userToUpdate,
  idUserState,
) => {
  return await updateUserState(idStreak, userToUpdate, idUserState);
};

export const completedToday = (lastDay) => {
  if (!lastDay) return false;

  const last = new Date(lastDay);
  const now = new Date();
  console.log(
    last.getFullYear() + " " + last.getMonth() + " " + last.getDate(),
  );
  console.log(now.getFullYear() + " " + now.getMonth() + " " + now.getDate());

  return (
    last.getFullYear() === now.getFullYear() &&
    last.getMonth() === now.getMonth() &&
    last.getDate() === now.getDate()
  );
};
