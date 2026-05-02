import { theme } from '@/src/constants/theme';
import { StyleSheet, Text, View } from 'react-native';

export default function AchievementProgressBar({ current, goal, achieved }) {
  const safeGoal = goal > 0 ? goal : 1;
  const progressPercent = Math.min(Math.max((current / safeGoal) * 100, 0), 100);

  const trackColor = achieved ? "#f59e0b22" : "#ffffff0a";
  const fillColor = achieved ? "#f59e0b" : theme.colors.textMuted;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.progressText, achieved ? styles.textAchieved : styles.textLocked]}>
          {progressPercent === 100 ? "Completado" : "Progreso"}
        </Text>
        <Text style={[styles.progressValues, achieved ? styles.textAchieved : styles.textLocked]}>
          {current} / {goal}
        </Text>
      </View>
      <View style={[styles.track, { backgroundColor: trackColor }]}>
        <View style={[styles.fill, { width: `${progressPercent}%`, backgroundColor: fillColor }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: theme.spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  progressText: {
    fontSize: theme.textSizes.sm,
    fontWeight: theme.font.semibold.toString(),
  },
  progressValues: {
    fontSize: theme.textSizes.sm,
    fontWeight: theme.font.bold.toString(),
  },
  textAchieved: {
    color: "#f59e0bd9", // amber with opacity
  },
  textLocked: {
    color: theme.colors.textMuted,
  },
  track: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 4,
  }
});
