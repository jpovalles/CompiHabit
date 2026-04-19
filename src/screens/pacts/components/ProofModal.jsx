import { theme } from "@/src/constants/theme";
import { FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert, Modal, StyleSheet, Text, View } from "react-native";
import { usePactCard } from "../hooks/usePactCard";
import CameraUIProof from "./proofModalComponents/CameraUIProof";
import ImageProof from "./proofModalComponents/ImageProof";
import ProofModalFooter from "./proofModalComponents/ProofModalFooter";
import ProofModalHeader from "./proofModalComponents/ProofModalHeader";
import ReadingProof from "./proofModalComponents/ReadingProof";

export default function ProofModal({
  isOpen,
  onClose,
  onSubmit,
  pact,
  streak,
}) {
  const [loading, setLoading] = useState(false);
  const [textProof, setTextProof] = useState("");
  const [imageProof, setImageProof] = useState(null);

  const { participant } = usePactCard(pact, streak);
  const partnerName = participant.partnerName;
  const habitType = pact.habit_name;

  const handleClose = () => {
    setTextProof("");
    setImageProof(null);
    setLoading(false);
    onClose();
  };

  const loadGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permiso denegado", "Se necesita acceso a la galería para esta acción.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImageProof(result.assets[0].uri);
    }
  };

  const validateSubmit = () => {
    if (habitType === "Lectura") return textProof.length >= 150;
    if (habitType === "Actividad física" || habitType === "Tiempo en pantalla") return imageProof !== null;
    return false;
  };

  const handleSubmit = async () => {
    if (!validateSubmit()) return;
    setLoading(true);

    const data = {
      habitType,
      type: habitType === "Lectura" ? "text" : "image",
      value: habitType === "Lectura" ? textProof : imageProof,
    };

    try {
      await onSubmit(data);
      handleClose();
    } catch (error) {
      Alert.alert("Error", "No se pudo enviar la demostración.");
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (habitType === "Lectura") {
      return <ReadingProof textProof={textProof} setTextProof={setTextProof} />;
    }

    if (habitType === "Actividad física") {
      return (
        <CameraUIProof
          imageProof={imageProof}
          setImageProof={setImageProof}
          inputLabel="Evidencia del entrenamiento"
        />
      );
    }

    if (habitType === "Tiempo en pantalla") {
      return (
        <ImageProof
          imageProof={imageProof}
          setImageProof={setImageProof}
          onLoadPress={loadGallery}
          title="Subir captura local"
          subtitle="Selecciona la evidencia desde tu galería."
          iconName="image"
          inputLabel="Captura de uso digital"
        />
      );
    }

    return null;
  };

  return (
    <Modal visible={isOpen} transparent={true} animationType="fade" onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <ProofModalHeader habitType={habitType} partnerName={partnerName} onClose={handleClose} />

          {renderContent()}

          <View style={styles.warningContainer}>
            <FontAwesome5 name="info-circle" size={14} color={theme.colors.textMuted} />
            <Text style={styles.warningText}>Tu compañero revisará esta evidencia para validar el hábito de hoy</Text>
          </View>

          <ProofModalFooter
            onClose={handleClose}
            onSubmit={handleSubmit}
            loading={loading}
            isValid={validateSubmit()}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.md,
  },
  modalCard: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.xl || 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
    elevation: 5,
  },
  warningContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#ffffff05",
    padding: theme.spacing.sm,
    borderRadius: theme.radius.sm || 6,
    marginBottom: theme.spacing.xl,
    gap: theme.spacing.sm,
  },
  warningText: {
    flex: 1,
    color: theme.colors.textMuted,
    fontSize: theme.textSizes.sm,
    lineHeight: 18,
  },
});
