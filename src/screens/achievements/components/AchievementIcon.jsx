import { theme } from '@/src/constants/theme';
import { FontAwesome5 } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

export default function AchievementIcon({ name, achieved, size = 32 }) {
  // Ensure the name is compatible with FontAwesome5 conventions (lowercase)
  const iconName = name ? name.toLowerCase() : 'trophy';

  const iconColor = achieved ? "#f59e0b" : theme.colors.textMuted;
  const bgColor = achieved ? "#f59e0b22" : "#ffffff0a";
  const borderColor = achieved ? "#f59e0b55" : theme.colors.border;

  return (
    <View style={[
      styles.container,
      {
        width: size + 16,
        height: size + 16,
        borderRadius: (size + 16) / 2,
        backgroundColor: bgColor,
        borderColor: borderColor,
      }
    ]}>
      <FontAwesome5 name={iconName} size={size * 0.75} color={iconColor} solid={achieved} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
  }
});
