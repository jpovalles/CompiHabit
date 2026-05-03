import { theme } from '@/src/constants/theme';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import AchievementIcon from './AchievementIcon';
import AchievementProgressBar from './AchievementProgressBar';

export default function AchievementCard({
  icon = "Trophy",
  achieved = false,
  title = "Logro",
  description = "Descripción del logro",
  current_progress = 0,
  goal_value = 1
}) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        achieved ? styles.containerAchieved : styles.containerLocked,
        pressed && styles.containerPressed
      ]}
      onPress={toggleExpand}
    >
      <View style={styles.header}>
        <AchievementIcon name={icon} achieved={achieved} size={36} />
        <View style={styles.info}>
          <Text style={[styles.title, achieved ? styles.titleAchieved : styles.titleLocked]}>
            {title}
          </Text>
          <AchievementProgressBar
            current={current_progress}
            goal={goal_value}
            achieved={achieved}
          />
        </View>
      </View>

      {expanded && (
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{description}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: 20,
    borderWidth: 1.5,
    overflow: 'hidden',
    marginBottom: theme.spacing.lg,
  },
  containerAchieved: {
    borderColor: "#f59e0b55", // striking amber border
    backgroundColor: "#1e1e3a", // surface+
  },
  containerLocked: {
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  containerPressed: {
    opacity: 0.8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 18,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: theme.textSizes.lg,
    fontWeight: theme.font.bold.toString(),
    marginBottom: 4,
  },
  titleAchieved: {
    color: theme.colors.textPrimary,
  },
  titleLocked: {
    color: theme.colors.textMuted,
  },
  descriptionContainer: {
    marginTop: theme.spacing.md,
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  description: {
    color: theme.colors.textPrimary,
    fontSize: theme.textSizes.md,
    lineHeight: 20,
  }
});
