import { getHabits } from "@/src/services/database/habitsService";

// Loads all available habit types
export const loadHabits = async () => {
  return await getHabits();
};
