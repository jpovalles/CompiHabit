import { theme } from "@/src/constants/theme";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Pressable, StyleSheet } from "react-native";

export default function FAB({ onPress, icon = "plus", style, children }) {
  return (
    <Pressable style={[styles.fab, style]} onPress={onPress}>
      <AntDesign name={icon} size={24} color={theme.colors.textPrimary} />
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: theme.spacing.xl,
    right: theme.spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
});
