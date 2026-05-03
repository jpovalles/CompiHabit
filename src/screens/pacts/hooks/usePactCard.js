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

const getBadgeData = (currentDays = 0, id_streak_colors, badgeColors) => {
  // Badge level calculation: gets the current level badge colors depending on 
  // the current days. It goes until the current days is greater than or equal than the next badge required days.
  const currentBadge = badgeColors?.find((badge) => badge.id_streak_colors === id_streak_colors);
  const nextBadge = id_streak_colors !== 7 ? badgeColors?.find((badge) => badge.id_streak_colors === currentBadge?.id_streak_colors + 1) : null;

  const daysRequired = currentBadge?.top_limit;
  const progressPercent = nextBadge ? (currentDays / daysRequired) * 100 : 100;

  return {
    currentBadge,
    nextBadge,
    daysRequired,
    progressPercent,
  };
};

export const usePactCard = (pact, streak, badgeColors) => {
  const { user: currentUser } = useAuth();
  console.log(streak);

  return {
    ...getParticipantData(currentUser, pact, streak),
    status: {
      isDayCompleted: completedToday(streak?.last_day),
    },
    badge: getBadgeData(streak?.current_days, streak?.id_streak_colors, badgeColors),
  };
};

