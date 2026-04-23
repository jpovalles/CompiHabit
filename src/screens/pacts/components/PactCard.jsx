import PrimaryButton from "@/src/components/PrimaryButton";
import { STREAK_USER_STATE } from "@/src/constants/db_constants/streak";
import { theme } from "@/src/constants/theme";
import { updateUserStateStreak } from "@/src/logic/streaksLogic";
import FlameBadge from "@/src/screens/pacts/components/FlameBadge";
import { usePactCard } from "@/src/screens/pacts/hooks/usePactCard";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PactCard({
  pact,
  streak,
  badgeColors,
  onPress,
  isActive = true,
  onRefresh,
}) {
  const { participants, badge, ui } = usePactCard(pact, streak, badgeColors);

  const {
    partnerName,
    isDayCompleted,
    myState,
    partnerState,
    isHost,
    partnerSubmittedProof,
  } = participants;
  const { currentBadge, nextBadge, nextLevelTarget, progressPercent } = badge;

  const { current_days, id_streak } = streak;
  const { habit_name } = pact;

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

  const handleUploadProof = async () => {
    const userToUpdate = isHost ? "host" : "guest";
    const idUserState = STREAK_USER_STATE.SUBMITTED;
    try {
      await updateUserStateStreak(id_streak, userToUpdate, idUserState);
      await onRefresh?.();
    } catch (error) {
      console.error("Error updating streak:", error);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.content}>
        {/* Top row */}
        <View style={styles.topRow}>
          <View style={styles.titleBlock}>
            <Text style={styles.title}>{habit_name}</Text>
            <View style={styles.partnerRow}>
              {pact.partnerAvatar ? (
                <Image
                  source={{ uri: pact.partnerAvatar }}
                  style={styles.avatar}
                />
              ) : (
                <View style={styles.avatarFallback}>
                  <Text style={styles.avatarFallbackText}>
                    {partnerName?.[0]?.toUpperCase()}
                  </Text>
                </View>
              )}
              <Text style={styles.partnerName}>con {partnerName}</Text>
            </View>
          </View>

          <View style={styles.streakBlock}>
            <FlameBadge
              primary={currentBadge?.primary_color}
              secondary={currentBadge?.secondary_color}
              size={40}
              active={isDayCompleted}
            />
            <Text
              style={[
                styles.streakCount,
                {
                  color: isDayCompleted
                    ? theme.colors.primary
                    : theme.colors.textMuted,
                },
              ]}
            >
              {current_days} DÍAS
            </Text>
          </View>
        </View>

        {/* Progress bar*/}
        {nextBadge && (
          <>
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${Math.min(progressPercent, 100)}%` },
                ]}
              />
            </View>
            <View style={styles.progressLabelRow}>
              <Text style={styles.progressText}>
                {current_days} / {nextLevelTarget} días
              </Text>
              <FlameBadge
                primary={nextBadge?.primary_color}
                secondary={nextBadge?.secondary_color}
                size={15}
              />
            </View>
          </>
        )}

        {!showButtons && isActive && !isDayCompleted && (
          <TouchableOpacity
            style={styles.bottomRow}
            onPress={toggleButtons}
            activeOpacity={0.7}
          >
            <FontAwesome5
              name={showButtons ? "chevron-up" : "chevron-down"}
              size={16}
              color={theme.colors.primary}
            />
          </TouchableOpacity>
        )}

        {showButtons && !isDayCompleted && (
          <View style={styles.expandedContent}>
            <View style={styles.buttonRow}>
              <View style={styles.userActionContainer}>
                {/* User avatar and state*/}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 6,
                    marginBottom: 6,
                  }}
                >
                  <View style={styles.avatarFallback}>
                    <Text style={styles.avatarFallbackText}>Tú</Text>
                  </View>
                  <Text style={styles.userState}>{myState}</Text>
                </View>
                <PrimaryButton
                  style={{ height: 30, paddingVertical: 0 }}
                  fontSize={16}
                  onPress={onPress}
                  label="Subir"
                  disabled={isDayCompleted}
                />
              </View>
              <View style={styles.userActionContainer}>
                {/* User avatar and state*/}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 6,
                    marginBottom: 6,
                    justifyContent: "flex-end",
                  }}
                >
                  <Text style={styles.userState}>{partnerState}</Text>
                  <View style={styles.avatarFallback}>
                    <Text style={styles.avatarFallbackText}>
                      {partnerName?.[0]?.toUpperCase()}
                    </Text>
                  </View>
                </View>
                <PrimaryButton
                  style={{ height: 30, paddingVertical: 0 }}
                  fontSize={16}
                  onPress={handleValidateProof}
                  label="Validar"
                  disabled={!partnerSubmittedProof}
                />
              </View>
            </View>
            {/* Toggle buttons */}
            <View style={{ marginTop: 6 }}>
              <TouchableOpacity
                style={styles.bottomRow}
                onPress={toggleButtons}
                activeOpacity={0.7}
              >
                <FontAwesome5
                  name={showButtons ? "chevron-up" : "chevron-down"}
                  size={16}
                  color={theme.colors.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
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

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  titleBlock: {
    gap: theme.spacing.xs,
  },
  title: {
    fontSize: 18,
    fontWeight: theme.font.bold.toString(),
    color: theme.colors.textPrimary,
    letterSpacing: -0.3,
  },
  partnerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  avatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
  },
  avatarFallback: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarFallbackText: {
    color: theme.colors.textPrimary,
    fontSize: 11,
    fontWeight: theme.font.bold.toString(),
  },
  partnerName: {
    fontSize: 13,
    color: theme.colors.textMuted,
  },

  // Streak
  streakBlock: {
    alignItems: "center",
    gap: 1,
  },
  streakIcon: {
    fontSize: theme.textSizes.lg,
  },
  streakCount: {
    fontSize: 11,
    fontWeight: theme.font.bold.toString(),
    letterSpacing: 0.5,
  },

  // Badge + progress
  badgeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  badgeLabel: {
    fontSize: 11,
    fontWeight: theme.font.bold.toString(),
    color: theme.colors.primary,
    letterSpacing: 0.8,
  },
  daysLeft: {
    fontSize: 14,
    color: theme.colors.primary,
  },
  progressTrack: {
    height: 4,
    backgroundColor: theme.colors.border,
    borderRadius: 99,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: theme.colors.primary,
    borderRadius: 99,
  },

  progressLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  progressText: {
    color: theme.colors.primary,
    fontSize: 13,
    fontWeight: theme.font.semibold.toString(),
  },

  // Bottom row
  bottomRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  expandedContent: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    paddingTop: 5,
  },
  userState: {
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  userActionContainer: {
    flex: 1,
    maxWidth: "50%",
  },
});
