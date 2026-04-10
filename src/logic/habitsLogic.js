import { getHabits } from "@/src/services/habitsService";

// Loads all available habit types
export const loadHabits = async () => {
  return await getHabits();
};
