import { theme } from "@/src/constants/theme";
import { Pressable, StyleSheet, Text } from "react-native";

export default function PrimaryButton({
  onPress,
  label,
  backgroundColor = theme.colors.primary,
  textColor = theme.colors.textPrimary,
  fontSize = theme.textSizes.md,
  disabled = false,
  style,
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        style,
        { backgroundColor },
        pressed && styles.buttonPressed,
        disabled && styles.buttonDisabled,
      ]}
      onPress={onPress}
      disabled={disabled}
      accessibilityLabel={label}
      accessibilityRole="button"
    >
      <Text style={[styles.buttonText, { color: textColor, fontSize: fontSize }]}>{label}</Text>
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
    fontWeight: "600",
  },
  buttonPressed: {
    opacity: 0.75,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});
