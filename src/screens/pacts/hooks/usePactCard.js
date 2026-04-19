import { useAuth } from "@/src/context/AuthContext";

export const usePactCard = (pact, streak, badgeColors) => {
  const { user } = useAuth();

  const { id_host, guest_name, host_name } = pact;
  const { current_days, guest_state, host_state } = streak;

  // Participant derivation
  const isHost = user?.id === id_host;
  const partnerName = isHost ? guest_name : host_name;
  const partnerState = isHost ? guest_state : host_state;
  const myName = isHost ? host_name : guest_name;
  const myState = isHost ? host_state : guest_state;


  // Completion status for the current day
  const isDayCompleted = myState?.user_state === "Validado" && partnerState?.user_state === "Validado";

  // Badge and Level Calculations
  const currentBadgeIndex = badgeColors
    ? badgeColors.reduce((acc, curr, index) => (curr.days_required <= current_days ? index : acc), 0)
    : 0;

  const currentBadge = badgeColors?.[currentBadgeIndex];
  const nextBadge = badgeColors?.[currentBadgeIndex + 1];

  const currentLevelTarget = currentBadge?.days_required || 0;
  const nextLevelTarget = nextBadge ? nextBadge.days_required : currentLevelTarget;

  // Progress calculation
  const progressPercent = nextBadge ? (current_days / nextLevelTarget) * 100 : 100;

  return {
    participant: {
      isHost,
      partnerName,
      partnerState,
      myName,
      myState,
      isDayCompleted,
    },
    badge: {
      currentBadge,
      nextBadge,
      nextLevelTarget,
      progressPercent,
    },
  };
};
