export default function ConfirmModal({
  onCancel,
  onConfirm,
  title,
  subtitle,
  color,
}) {
  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <View style={styles.modalIconContainer}>
          <FontAwesome5 name="exclamation-triangle" size={48} color={color} />
        </View>
        <Text style={styles.modalTitle}>{title}</Text>
        <Text style={styles.modalSubtitle}>{subtitle}</Text>
        <View style={styles.modalActions}>
          <Pressable
            style={({ pressed }) => [
              styles.modalCancelButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={onCancel}
            accessibilityLabel="Cancelar"
            accessibilityRole="button"
          >
            <Text style={styles.modalCancelButtonText}>Cancelar</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.modalConfirmButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={onConfirm}
            accessibilityLabel="Confirmar"
            accessibilityRole="button"
          >
            <Text style={styles.modalConfirmButtonText}>Confirmar</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
