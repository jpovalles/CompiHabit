import FAB from "@/src/components/FAB";
import PrimaryButton from "@/src/components/PrimaryButton";
import { theme } from "@/src/constants/theme";
import { useAuth } from "@/src/context/AuthContext";
import { createPact } from "@/src/logic/pactLogic";
import FrequencyTab from "@/src/screens/pacts/components/createPactModal/frequencyTab/FrequencyTab";
import GuestSelectionTab from "@/src/screens/pacts/components/createPactModal/guestTab/GuestSelectionTab";
import HabitSelectionTab from "@/src/screens/pacts/components/createPactModal/habitTab/HabitSelectionTab";
import PactSummaryTab from "@/src/screens/pacts/components/createPactModal/summaryTab/PactSummaryTab";
import { useState } from "react";
import { Alert, Modal, StyleSheet, View } from "react-native";

export default function CreatePactModal({ visible, onClose }) {
  const { session } = useAuth();

  // Tabs Handling
  const [activeTab, setActiveTab] = useState(0);
  const [fieldFilled, setFieldFilled] = useState(false);

  const nextStep = () => {
    setActiveTab((prev) => prev + 1);
    setFieldFilled(false);
  };
  const prevStep = () => {
    setActiveTab((prev) => prev - 1);
    setFieldFilled(false);
  };

  const pact_data = {
    id_host: session.user.id,
    id_guest: "",
    guest_name: "",
    id_status_pact: 1,
    id_habit_type: 0,
    habit_name: "",
    habit_description: "",
    pact_days: [],
    pact_hours: null,
  };

  // Object to be sent to the database
  const [pactData, setPactData] = useState(pact_data);

  const handleCreatePact = async () => {
    const { guest_name, habit_name, habit_description, ...rest } = pactData;
    try {
      await createPact(rest);
      Alert.alert("Invitación creada correctamente!");
      handleClose();
    } catch (error) {
      Alert.alert("Error al crear la invitación:", error.message);
    }
  };

  const handleClose = () => {
    setActiveTab(0);
    setPactData(pact_data);
    onClose();
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

        {activeTab === 0 && (
          <HabitSelectionTab
            pactData={pactData}
            setPactData={setPactData}
            setFieldFilled={setFieldFilled}
          />
        )}
        {activeTab === 1 && (
          <FrequencyTab
            pactData={pactData}
            setPactData={setPactData}
            setFieldFilled={setFieldFilled}
          />
        )}
        {activeTab === 2 && (
          <GuestSelectionTab
            pactData={pactData}
            setPactData={setPactData}
            setFieldFilled={setFieldFilled}
          />
        )}
        {activeTab === 3 && (
          <PactSummaryTab pactData={pactData} setFieldFilled={setFieldFilled} />
        )}

        <View style={styles.footer}>
          {activeTab !== 0 && (
            <PrimaryButton
              label="Regresar"
              onPress={prevStep}
              style={{ width: "25%" }}
            />
          )}
          <PrimaryButton
            label={activeTab === 3 ? "Crear Pacto" : "Continuar"}
            onPress={activeTab === 3 ? handleCreatePact : nextStep}
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
