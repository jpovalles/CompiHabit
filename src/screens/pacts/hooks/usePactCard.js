import { useAuth } from "@/src/context/AuthContext";
import { completedToday } from "@/src/logic/streaksLogic";

const getParticipantData = (currentUser, pact, streak) => {
  const isHost = currentUser?.id === pact?.id_host;

  return {
    user: {
      id: isHost ? pact?.id_host : pact?.id_guest,
      name: isHost ? pact?.host_name : pact?.guest_name,
      state: isHost ? streak?.host_state : streak?.guest_state,
      state_id: isHost ? streak?.id_host_state : streak?.id_guest_state,
      isHost,
    },
    partner: {
      id: isHost ? pact?.id_guest : pact?.id_host,
      name: isHost ? pact?.guest_name : pact?.host_name,
      state: isHost ? streak?.guest_state : streak?.host_state,
      state_id: isHost ? streak?.id_guest_state : streak?.id_host_state,
    },
  };
};

const getBadgeData = (currentDays = 0, badgeColors) => {
  // Badge level calculation: gets the current level badge colors depending on 
  // the current days. It goes until the current days is greater than or equal than the next badge required days.
  const currentIndex = badgeColors?.reduce(
    (acc, curr, index) => (curr.days_required <= currentDays ? index : acc),
    0
  ) ?? 0;

  const currentBadge = badgeColors?.[currentIndex];
  const nextBadge = badgeColors?.[currentIndex + 1];

  const currentLevelTarget = currentBadge?.days_required || 0;  // if no next badge, the currentLevelTarget will be 0
  const nextLevelTarget = nextBadge?.days_required ?? currentLevelTarget; // if no next badge, the nextLevelTarget will be 0
  const progressPercent = nextBadge ? (currentDays / nextLevelTarget) * 100 : 100;  // if no next badge, the progressPercent will be 100%

  return {
    currentBadge,
    nextBadge,
    nextLevelTarget,
    progressPercent,
  };
};

export const usePactCard = (pact, streak, badgeColors) => {
  const { user: currentUser } = useAuth();

  return {
    ...getParticipantData(currentUser, pact, streak),
    status: {
      isDayCompleted: completedToday(streak?.last_day),
    },
    badge: getBadgeData(streak?.current_days, badgeColors),
  };
};

