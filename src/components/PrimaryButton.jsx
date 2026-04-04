import { theme } from "@/src/constants/theme";
import { Pressable, StyleSheet, Text } from "react-native";

export default function PrimaryButton({
  onPress,
  label,
  backgroundColor = theme.colors.primary,
  textColor = theme.colors.textPrimary,
  style,
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        style,
        { backgroundColor },
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
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.md || 10,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: theme.colors.textPrimary,
    fontSize: theme.textSizes.sm,
    fontWeight: "600",
  },
  buttonPressed: {
    opacity: 0.75,
  },
});
