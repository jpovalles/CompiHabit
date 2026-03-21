import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { theme } from "../constants/theme";

export default function FancyInput(props) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholderTextColor={theme.colors.textMuted}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: theme.spacing.md,
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    color: theme.colors.textPrimary,
    fontSize: theme.textSizes.md,
  },
});
