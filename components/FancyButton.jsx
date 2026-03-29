import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { theme } from "../constants/theme";

export default function FancyButton({ label, style, disabled = false, ...props }) {
  return (
    <TouchableOpacity
      style={[styles.button, style, disabled && { opacity: 0.5 }]}
      activeOpacity={0.8}
      disabled={disabled}
      {...props}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.md,
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  label: {
    color: theme.colors.textPrimary,
    fontSize: theme.textSizes.md,
    fontWeight: "600",
  },
});
