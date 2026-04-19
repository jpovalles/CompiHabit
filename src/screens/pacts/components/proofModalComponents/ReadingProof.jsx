import { theme } from "@/src/constants/theme";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function ReadingProof({ textProof, setTextProof }) {
  const isValid = textProof.length >= 150;
  
  return (
    <View style={styles.contentSection}>
      <Text style={styles.inputLabel}>¿Qué aprendiste hoy?</Text>
      <View style={[styles.inputWrapper, isValid && styles.inputWrapperValid]}>
        <TextInput
          style={styles.textArea}
          placeholder="Escribe aquí los detalles principales de tu sesión (mínimo 150 caracteres)..."
          placeholderTextColor={theme.colors.textMuted}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
          value={textProof}
          onChangeText={setTextProof}
        />
      </View>
      <Text style={[styles.validationText, isValid && styles.validationTextValid]}>
        {textProof.length}/150 {textProof.length >= 150 && " - Excelente extensión"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contentSection: {
    marginBottom: theme.spacing.lg,
  },
  inputLabel: {
    fontSize: theme.textSizes.md,
    color: theme.colors.textPrimary,
    fontWeight: theme.font.semibold.toString(),
    marginBottom: theme.spacing.sm,
  },
  inputWrapper: {
    backgroundColor: "#1e1e3a",
    borderRadius: theme.radius.md || 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.sm,
    height: 140,
  },
  inputWrapperValid: {
    borderColor: "#22c55e",
  },
  textArea: {
    flex: 1,
    color: theme.colors.textPrimary,
    fontSize: theme.textSizes.md,
  },
  validationText: {
    color: theme.colors.textMuted,
    fontSize: theme.textSizes.xs || 12,
    marginTop: theme.spacing.xs,
    textAlign: "right",
  },
  validationTextValid: {
    color: "#22c55e",
  },
});
