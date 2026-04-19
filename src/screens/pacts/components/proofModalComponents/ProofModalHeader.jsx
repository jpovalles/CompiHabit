import { theme } from "@/src/constants/theme";
import { FontAwesome5 } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ProofModalHeader({
  habitType,
  partnerName,
  onClose
}) {
  return (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        <Text style={styles.modalTitle}>{habitType || "Nuevo Hábito"}</Text>
        <Text style={styles.modalSubtitle}>Con {partnerName || "tu colega"}</Text>
      </View>
      <Pressable onPress={onClose} style={({ pressed }) => [styles.closeIcon, pressed && styles.pressedState]}>
        <FontAwesome5 name="times" size={20} color={theme.colors.textMuted} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: theme.spacing.xl,
  },
  titleContainer: {
    flex: 1,
    paddingRight: theme.spacing.md,
  },
  modalTitle: {
    fontSize: theme.textSizes.xl,
    fontWeight: theme.font.bold.toString(),
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  modalSubtitle: {
    fontSize: theme.textSizes.md,
    color: theme.colors.primary,
    fontWeight: theme.font.semibold.toString(),
  },
  closeIcon: {
    padding: theme.spacing.sm,
    backgroundColor: "#ffffff08",
    borderRadius: theme.radius.full || 9999,
  },
  pressedState: {
    opacity: 0.7,
  },
});
