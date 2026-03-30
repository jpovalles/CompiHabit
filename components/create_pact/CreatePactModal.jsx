import FAB from "@/components/FAB";
import FancyButton from "@/components/FancyButton";
import { theme } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import FrequencyTab from "./FrequencyTab";
import GuestSelectionTab from "./GuestSelectionTab";
import HabitSelectionTab from "./HabitSelectionTab";

export default function CreatePactModal({ visible, onClose }) {
  const { session } = useAuth();

  // Tabs Handling
  const [activeTab, setActiveTab] = useState(0);
  const [fieldFilled, setFieldFilled] = useState(false);

  const nextStep = () => setActiveTab(prev => prev + 1);
  const prevStep = () => setActiveTab(prev => prev - 1);

  // Object to be sent to the database
  const [pactData, setPactData] = useState({
    id_host: session.user.id,
    id_guest: '',
    guest_name: '',
    id_status_pact: 1,
    id_habit_type: 0,
    pact_days: [],
    pact_hours: null,
  });

  const handleClose = () => {
    setActiveTab(0);
    setPactData({
      id_host: session.user.id,
      id_guest: '',
      guest_name: '',
      id_status_pact: 1,
      id_habit_type: 0,
      pact_days: [],
      pact_hours: null,
    });
    onClose();
  };

  // Rendering tabs
  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <HabitSelectionTab
            pactData={pactData}
            setPactData={setPactData}
            setFieldFilled={setFieldFilled}
          />
        );
      case 1:
        return (
          <FrequencyTab
            pactData={pactData}
            setPactData={setPactData}
            setFieldFilled={setFieldFilled}
          />
        );
      case 2:
        return (
          <GuestSelectionTab
            pactData={pactData}
            setPactData={setPactData}
            setFieldFilled={setFieldFilled}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContent}>
        <FAB
          onPress={handleClose}
          icon="close"
          style={{
            top: theme.spacing.xl,
            bottom: "auto",
            width: 40,
            height: 40,
          }}
        />

        <View style={styles.body}>{renderContent()}</View>

        <View style={styles.footer}>
          {activeTab !== 0 && (
            <FancyButton
              label="Regresar"
              onPress={prevStep}
              style={{ width: "25%" }}
            />
          )}
          <FancyButton
            label={activeTab === 2 ? "Crear Pacto" : "Continuar"}
            onPress={nextStep}
            style={{ flex: 1 }}
            disabled={!fieldFilled}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: theme.spacing.xl * 3,
    paddingHorizontal: theme.spacing.lg,
  },
  header: {
    marginBottom: theme.spacing.lg,
    paddingTop: theme.spacing.sm,
  },
  title: {
    fontSize: theme.textSizes.md,
    fontWeight: theme.font.semibold.toString(),
    color: theme.colors.primary,
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  body: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    gap: theme.spacing.md,
    paddingVertical: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  iconContainerSelected: {
    backgroundColor: theme.colors.primary,
  },
});
