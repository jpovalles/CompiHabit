import { StyleSheet } from "react-native";
import { theme } from "./theme";

export const presets = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.md,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  button_primary: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.radius.md,
    alignItems: "center",
  },
  button_secondary: {
    backgroundColor: theme.colors.border,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.radius.md,
    alignItems: "center",
    borderColor: theme.colors.primary,
    borderWidth: 1,
  },
  text_primary: {
    color: theme.colors.textPrimary,
    fontWeight: theme.font.semibold,
  },
  text_secondary: {
    color: theme.colors.primary,
    fontWeight: theme.font.semibold,
  },
});
