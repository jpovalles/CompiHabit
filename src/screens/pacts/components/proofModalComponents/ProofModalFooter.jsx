import BorderButton from "@/src/components/BorderButton";
import PrimaryButton from "@/src/components/PrimaryButton";
import { theme } from "@/src/constants/theme";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function ProofModalFooter({
  onClose,
  onSubmit,
  loading,
  isValid
}) {
  return (
    <View style={styles.footer}>
      <BorderButton
        label="Cancelar"
        onPress={onClose}
        style={styles.actionButton}
      />
      {loading ? (
        <View style={styles.loadingButtonWrapper}>
          <ActivityIndicator size="small" color="#ffffff" />
        </View>
      ) : (
        <PrimaryButton
          label="Enviar Prueba"
          onPress={onSubmit}
          disabled={!isValid}
          style={styles.actionButton}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    gap: theme.spacing.md,
  },
  actionButton: {
    flex: 1,
  },
  loadingButtonWrapper: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.md || 10,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
  }
});
