import { theme } from "@/src/constants/theme";
import FlameBadge from "@/src/screens/pacts/active/components/FlameBadge";
import { FontAwesome5 } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PactCard({ pact, streak }) {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        {/* Top row */}
        <View style={styles.topRow}>
          <View style={styles.titleBlock}>
            <Text style={styles.title}>{pact.habit_name}</Text>
            <View style={styles.partnerRow}>
              {partnerAvatar ? (
                <Image source={{ uri: partnerAvatar }} style={styles.avatar} />
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
            <FlameBadge level={badgeLevel} size={40} />
            <Text style={styles.streakCount}>{streakDays} DÍAS</Text>
          </View>
        </View>

        {/* Badge + progress */}
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${Math.min(progressPercent, 100)}%` },
            ]}
          />
        </View>
        {}

        {/* Status + button */}
        {/* 
        <View style={styles.bottomRow}>
          <View style={styles.statusBlock}>
            <Text style={styles.statusLabel}>ESTADO HOY</Text>
            <View style={styles.statusValueRow}>
              <Text style={styles.statusIcon}>{isDone ? "✅" : "🙂"}</Text>
              <Text style={[styles.statusText, isDone && styles.statusDone]}>
                {isDone ? "Completado" : "Pendiente"}
              </Text>
            </View>
          </View>

          {!isDone && (
            <TouchableOpacity
              style={styles.registerBtn}
              onPress={onRegister}
              activeOpacity={0.75}
            >
              <Text style={styles.registerBtnText}>Registrar</Text>
            </TouchableOpacity>
          )}
        </View>
        */}

        <TouchableOpacity
          style={styles.bottomRow}
          onPress={() => console.log("Chevron pressed")}
          activeOpacity={0.7}
        >
          <FontAwesome5
            name="chevron-down"
            size={16}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
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
  accentBar: {
    width: 5,
    borderTopLeftRadius: theme.radius.md,
    borderBottomLeftRadius: theme.radius.md,
  },
  content: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 10,
  },

  // Top row
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
    color: theme.colors.textMuted,
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
    height: 7,
    backgroundColor: theme.colors.border,
    borderRadius: 99,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: theme.colors.primary,
    borderRadius: 99,
  },

  // Bottom row
  bottomRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  statusBlock: {
    gap: 3,
  },
  statusLabel: {
    fontSize: 10,
    fontWeight: theme.font.bold.toString(),
    color: theme.colors.textMuted,
    letterSpacing: 0.8,
  },
  statusValueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  statusIcon: {
    fontSize: 15,
  },
  statusText: {
    fontSize: theme.textSizes.sm,
    fontWeight: theme.font.semibold.toString(),
    color: theme.colors.textPrimary,
  },
  statusDone: {
    color: "#4CAF82",
  },

  // Register button
  registerBtn: {
    backgroundColor: theme.colors.border,
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 10,
  },
  registerBtnText: {
    fontSize: theme.textSizes.sm,
    fontWeight: theme.font.semibold.toString(),
    color: theme.colors.textPrimary,
  },
});
