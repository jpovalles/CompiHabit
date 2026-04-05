import BorderButton from "@/src/components/BorderButton";
import PrimaryButton from "@/src/components/PrimaryButton";
import { theme } from "@/src/constants/theme";
import { FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet, Text, View, Modal } from "react-native";

export default function ConfirmModal({
  visible,
  onCancel,
  onConfirm,
  title,
  subtitle,
  color = theme.colors.border,
}) {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { borderColor: color }]}>
          <View style={styles.modalIconContainer}>
            <FontAwesome5 name="exclamation-triangle" size={48} color={color} />
          </View>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalSubtitle}>{subtitle}</Text>
          <View style={styles.modalActions}>
            <BorderButton style={{ flex: 1 }} onPress={onCancel} label="Cancelar" />
            <PrimaryButton style={{ flex: 1 }} onPress={onConfirm} label="Confirmar" />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: theme.colors.background,
    padding: 24,
    borderRadius: theme.radius?.md || 12,
    borderWidth: 1.5,
    width: "85%",
  },
  modalIconContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.textSizes?.lg || 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  modalSubtitle: {
    color: theme.colors.textMuted,
    fontSize: theme.textSizes?.sm || 14,
    textAlign: "center",
    marginBottom: 24,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
});
