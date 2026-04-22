import { STREAK_USER_STATE } from "@/src/constants/db_constants/streak";
import { useAuth } from "@/src/context/AuthContext";
import { completedToday } from "@/src/logic/streaksLogic";

export const usePactCard = (pact, streak, badgeColors) => {
  const { user } = useAuth();

  const { id_host, guest_name, host_name } = pact;
  const { current_days, guest_state, host_state, id_guest_state, id_host_state, last_day } = streak;

  // Participant derivation
  const isHost = user?.id === id_host;
  const partnerName = isHost ? guest_name : host_name;
  const partnerState = isHost ? guest_state : host_state;
  const myName = isHost ? host_name : guest_name;
  const myState = isHost ? host_state : guest_state;


  // Completion status for the current day
  const isDayCompleted = completedToday(last_day);

  const partnerSubmittedProof = isHost ? id_guest_state === STREAK_USER_STATE.SUBMITTED : id_host_state === STREAK_USER_STATE.SUBMITTED;

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
    participants: {
      isHost,
      partnerName,
      partnerState,
      myName,
      myState,
      isDayCompleted,
      partnerSubmittedProof
    },
    badge: {
      currentBadge,
      nextBadge,
      nextLevelTarget,
      progressPercent,
    },
  };
};
