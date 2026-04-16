export const parsePact = (payload) => {
  const streaksPayload = payload.streaks;

  const streak = {
    ...streaksPayload,
    host_state: streaksPayload?.host_state?.user_state,
    guest_state: streaksPayload?.guest_state?.user_state,
  };

  const { streaks, habit_type, ...rest } = payload;

  const pact = {
    ...rest,
    habit_name: habit_type?.habit_name,
  };
  return { streak, pact };
};
