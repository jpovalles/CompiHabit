import { theme } from '@/src/constants/theme';
import FlameBadge from '@/src/screens/pacts/components/FlameBadge';
import { FontAwesome5 } from '@expo/vector-icons';
import { Image, StyleSheet, Text, View } from 'react-native';


export default function PactCardHeader({
  habitName,
  pact_hours,
  partnerAvatar,
  partnerName,
  currentBadge,
  isDayCompleted,
  currentDays,
  isActive,
}) {
  const lightFlame = currentDays !== 0 && (isDayCompleted || !isActive);

  return (
    <View style={styles.topRow}>
      <View style={styles.titleBlock}>
        <Text style={styles.title}>{habitName}</Text>
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
        <View style={styles.partnerRow}>
          {partnerAvatar ? (
            <Image
              source={{ uri: partnerAvatar }}
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
          active={lightFlame}
        />
        <Text
          style={[
            styles.streakCount,
            {
              color: lightFlame
                ? theme.colors.primary
                : theme.colors.textMuted,
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
    fontSize: 13,
    color: theme.colors.textMuted,
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
    width: "50%",
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 20,
    textAlign: "center",
  },
  detailText: {
    color: theme.colors.textPrimary,
    fontSize: theme.textSizes.sm,
    marginLeft: theme.spacing.sm,
  },
});
