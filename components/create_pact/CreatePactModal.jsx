import FAB from "@/components/FAB";
import FancyButton from "@/components/FancyButton";
import { theme } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { getHabits } from "@/services/habits_service";
import { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, View } from "react-native";
import HabitSelectionTab from "./HabitSelectionTab";

export default function CreatePactModal({ visible, onClose }) {
  const { session } = useAuth();

  const [activeTab, setActiveTab] = useState(0);

  const [selectedHabit, setSelectedHabit] = useState(null);

  const nextStep = () => setActiveTab(prev => prev + 1);
  const prevStep = () => setActiveTab(prev => prev - 1);

  const [pactData, setPactData] = useState({
    id_host: session.user.id,
    id_guest: '',
    id_status_pact: 1,
    id_habit_type: 0,
    pact_days: [],
    pact_hours: null,
  });

  const handleClose = () => {
    setActiveTab(0);
    setSelectedHabit(null);
    onClose();
  };

  // Habits handle functions
  const [habits, setHabits] = useState([]);



  const loadHabits = async () => {
    try {
      const data = await getHabits();
      setHabits(data);
      console.log(data);
    } catch (error) {
      Alert.alert("Error al obtener hábitos: ", error.message);
    }
  };

  useEffect(() => {
    if (visible) {
      loadHabits();
    }
  }, [visible]);

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <HabitSelectionTab
            habits={habits}
            selected={selectedHabit}
            onSelect={setSelectedHabit}
          />
        );
      case 1:
        return <FrequencyTab />;
      case 2:
        return <CompaTab />;
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

        <View style={styles.header}>
          <Text style={styles.title}>{activeTab}</Text>
        </View>

        <View style={styles.body}>{renderContent()}</View>

        <View style={styles.footer}>
          {activeTab !== 0 && (
            <FancyButton
              label="Regresar"
              onPress={prevStep}
            />
          )}
          <FancyButton
            label={activeTab === 2 ? "Crear Pacto" : "Continuar"}
            onPress={nextStep}
          />
        </View>
      </View>
    </Modal>
  );
}

function FrequencyTab() {
  return (
    <View>
      <Text style={{ color: theme.colors.textPrimary }}>
        Establece la frecuencia
      </Text>
    </View>
  );
}

function CompaTab() {
  return (
    <View>
      <Text style={{ color: theme.colors.textPrimary }}>
        Selecciona tu Compi
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: theme.spacing.xl * 2.5,
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
