import { theme } from "@/src/constants/theme";
import { Pressable, StyleSheet, Text } from "react-native";

export default function BorderButton({
  onPress,
  label,
  borderColor = theme.colors.border,
  textColor = theme.colors.textPrimary,
  style,
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        style,
        { borderColor },
        pressed && styles.buttonPressed,
      ]}
      onPress={onPress}
      accessibilityLabel={label}
      accessibilityRole="button"
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "transparent",
    borderRadius: theme.radius.md || 10,
    borderWidth: 1.5,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: theme.textSizes.sm,
    fontWeight: "600",
  },
  buttonPressed: {
    opacity: 0.75,
  },
});
