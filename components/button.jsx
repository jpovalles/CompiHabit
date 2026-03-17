import { presets } from "@/constants/global";
import { theme } from "@/constants/theme";
import { Pressable, StyleSheet, Text } from "react-native";

export default function Button({
  title,
  onPress,
  variant = "primary",
  font_size = theme.textSizes.md,
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        presets[`button_${variant}`],
        pressed && styles.pressed,
      ]}
    >
      <Text style={[presets[`text_${variant}`], { fontSize: font_size }]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});
