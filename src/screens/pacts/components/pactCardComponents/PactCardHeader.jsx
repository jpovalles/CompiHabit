import { theme } from '@/src/constants/theme';
import FlameBadge from '@/src/screens/pacts/components/FlameBadge';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function PactCardHeader({
  habitName,
  partnerAvatar,
  partnerName,
  currentBadge,
  isDayCompleted,
  currentDays,
  isActive,
}) {
  return (
    <View style={styles.topRow}>
      <View style={styles.titleBlock}>
        <Text style={styles.title}>{habitName}</Text>
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
          active={isDayCompleted || !isActive}
        />
        <Text
          style={[
            styles.streakCount,
            {
              color: isDayCompleted || !isActive
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
});
