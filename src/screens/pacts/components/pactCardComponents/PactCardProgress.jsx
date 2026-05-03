import { theme } from '@/src/constants/theme';
import FlameBadge from '@/src/screens/pacts/components/FlameBadge';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function PactCardProgress({
  nextBadge,
  progressPercent,
  currentDays,
  daysRequired,
}) {
  if (!nextBadge) return null;

  return (
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
          {currentDays} / {daysRequired} días
        </Text>
        <FlameBadge
          primary={nextBadge?.primary_color}
          secondary={nextBadge?.secondary_color}
          size={15}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
});
