import { theme } from "@/src/constants/theme";
import FlameBadge from "@/src/screens/pacts/components/FlameBadge";
import { FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import CurrentDayPills from "../CurrentDayPills";

export default function PactCardHeader({
  habitName,
  pact_hours,
  pact_days,
  partnerAvatar,
  partnerName,
  currentBadge,
  isDayCompleted,
  currentDays,
  isActive,
}) {
  const lightFlame = currentDays !== 0 && (isDayCompleted || !isActive); // activated when theres more than 0 days acumulated and the day is completed or the pact is not active (for presentation)

  return (
    <View style={styles.topRow}>
      <View style={styles.titleBlock}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: theme.spacing.md,
            marginBottom: theme.spacing.xs,
          }}
        >
          <Text style={styles.title}>{habitName}</Text>
          <View style={styles.partnerRow}>
            <View style={styles.avatarFallback}>
              <Text style={styles.avatarFallbackText}>
                {partnerName?.[0]?.toUpperCase()}
              </Text>
            </View>
            <Text style={styles.partnerName}>con {partnerName}</Text>
          </View>
        </View>
        <View style={{ marginBottom: theme.spacing.xs }}>
          <CurrentDayPills
            pactDays={pact_days}
            style={{ width: 200 }}
            fontSize={10}
          />
          {pact_hours && (
            <View style={styles.detailItem}>
              <FontAwesome5
                name="clock"
                size={14}
                color={theme.colors.textPrimary}
                style={styles.icon}
              />
              <Text style={styles.detailText}>
                {pact_hours ? `${pact_hours}h` : "No especificado"}
              </Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.streakBlock}>
        <FlameBadge
          primary={currentBadge?.primary_color}
          secondary={currentBadge?.secondary_color}
          size={40}
          active={lightFlame}
        />
        <Text
          style={[
            styles.streakCount,
            {
              color: lightFlame ? theme.colors.primary : theme.colors.textMuted,
            },
          ]}
        >
          {currentDays} DÍAS
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    fontSize: 16,
    color: theme.colors.textPrimary,
  },
  streakBlock: {
    alignItems: "center",
    gap: 1,
  },
  streakCount: {
    fontSize: 11,
    fontWeight: theme.font.bold.toString(),
    letterSpacing: 0.5,
  },
  detailItem: {
    marginVertical: theme.spacing.xs,
    alignSelf: "flex-start",
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 20,
  },
  detailText: {
    color: theme.colors.textPrimary,
    fontSize: theme.textSizes.sm,
  },
});
