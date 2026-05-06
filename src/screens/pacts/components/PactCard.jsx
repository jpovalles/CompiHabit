import { STREAK_USER_STATE } from "@/src/constants/db_constants/streak";
import { theme } from "@/src/constants/theme";
import { updateUserStateStreak } from "@/src/logic/streaksLogic";
import { usePactCard } from "@/src/screens/pacts/hooks/usePactCard";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import PactCardExpanded from "./pactCardComponents/PactCardExpanded";
import PactCardHeader from "./pactCardComponents/PactCardHeader";
import PactCardProgress from "./pactCardComponents/PactCardProgress";

export default function PactCard({
  pact,
  streak,
  badgeColors,
  onPressSubmit,
  onPressValidate,
  isActive = true,
  onRefresh,
}) {
  const { user, partner, status, badge } = usePactCard(pact, streak, badgeColors);


  // My user and partner state data
  const {
    name: partnerName,
    state: partnerState,
    state_id: partnerStateId,
  } = partner;

  const { state: myState, isHost, state_id: myStateId } = user;


  // Pact status data
  const { isDayCompleted } = status;


  // Badge data
  const { currentBadge, nextBadge, daysRequired, progressPercent } = badge;


  const { current_days, id_streak } = streak;
  const { habit_name, pact_hours, pact_days } = pact;

  const [showButtons, setShowButtons] = useState(false);

  const toggleButtons = () => setShowButtons((prev) => !prev);

  const handleValidateProof = async () => {
    const userToUpdate = isHost ? "guest" : "host";
    const idUserState = STREAK_USER_STATE.VALIDATED;
    try {
      await updateUserStateStreak(id_streak, userToUpdate, idUserState);
      await onRefresh?.();
    } catch (error) {
      console.error("Error updating streak:", error);
    }
  };

  console.log("current_days", current_days);

  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <PactCardHeader
          habitName={habit_name}
          pact_hours={pact_hours}
          pact_days={pact_days}
          partnerName={partnerName}
          currentBadge={currentBadge}
          isDayCompleted={isDayCompleted}
          isActive={isActive}
          currentDays={current_days}
        />

        <PactCardProgress
          nextBadge={nextBadge}
          progressPercent={progressPercent}
          currentDays={current_days}
          daysRequired={daysRequired}
        />

        {/* expand button */}
        {!showButtons && isActive && !isDayCompleted && (
          <TouchableOpacity
            style={styles.bottomRow}
            onPress={toggleButtons}
            activeOpacity={0.7}
          >
            <FontAwesome5
              name="chevron-down"
              size={16}
              color={theme.colors.primary}
            />
          </TouchableOpacity>
        )}

        {/* action buttons to submit or validate */}
        {showButtons && !isDayCompleted && (
          <PactCardExpanded
            myState={myState}
            partnerState={partnerState}
            partnerName={partnerName}
            isDayCompleted={isDayCompleted}
            myStateId={myStateId}
            partnerStateId={partnerStateId}
            onPressSubmit={onPressSubmit}
            onPressValidate={onPressValidate}
            toggleButtons={toggleButtons}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    marginHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    overflow: "hidden",
  },
  content: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 4,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
