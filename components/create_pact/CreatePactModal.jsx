import FAB from "@/components/FAB";
import FancyButton from "@/components/FancyButton";
import { theme } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { getHabits } from "@/services/habits_service";
import { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, View } from "react-native";
import HabitButton from "./HabitButton";

export default function CreatePactModal({ visible, onClose }) {
  const TABS = [
    "Seleccionar hábitos",
    "Establecer frecuencia",
    "Seleccionar Compi",
  ];
  const [activeTab, setActiveTab] = useState(TABS[0]);

  const [selectedHabit, setSelectedHabit] = useState(null);

  const { session } = useAuth();

  const [pactData, setPactData] = useState({
    id_host: session.user.id,
    id_guest: '',
    id_status_pact: 1,
    id_habit_type: 0,
    pact_days: [],
    pact_hours: 0,
  });

  const handleClose = () => {
    setActiveTab(TABS[0]);
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
      case TABS[0]:
        return (
          <HabitSelectionTab
            habits={habits}
            selected={selectedHabit}
            onSelect={setSelectedHabit}
          />
        );
      case TABS[1]:
        return <FrequencyTab />;
      case TABS[2]:
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
          <FancyButton
            label={activeTab === TABS[2] ? "Crear Pacto" : "Continuar"}
            onPress={() => {
              if (activeTab === TABS[0]) setActiveTab(TABS[1]);
              else if (activeTab === TABS[1]) setActiveTab(TABS[2]);
              else {
                onClose();
              }
            }}
          />
        </View>
      </View>
    </Modal>
  );
}

function HabitSelectionTab({ habits, selected, onSelect, pactData, setPactData }) {
  return (
    <View style={styles.bentoContainer}>
      <Text style={styles.subtitle}>Crea tu nuevo pacto</Text>
      <Text style={styles.description}>
        Selecciona el hábito que quieres incluir en tu pacto
      </Text>

      <View style={styles.bentoGrid}>
        {habits?.length > 0 ? (
          habits.map((habit) => (
            <HabitButton
              key={habit.id_habit_type}
              selected={selected}
              onSelect={onSelect}
              habit={habit}
              pactData={pactData}
              setPactData={setPactData}
            />
          ))
        ) : (
          <Text style={[styles.description, { textAlign: "center" }]}>No hay hábitos para mostrar</Text>
        )}
      </View>
    </View>
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
  subtitle: {
    fontSize: theme.textSizes.xl,
    fontWeight: theme.font.bold.toString(),
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  description: {
    fontSize: theme.textSizes.md,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.xl,
  },
  body: {
    flex: 1,
  },
  footer: {
    paddingVertical: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  bentoContainer: {
    flex: 1,
  },
  bentoTextContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    gap: theme.spacing.xs,
  },
  bentoDescription: {
    fontSize: theme.textSizes.sm,
    color: theme.colors.textMuted,
  },
  bentoGrid: {
    gap: theme.spacing.md,
  },
  bentoRow: {
    flexDirection: "row",
    gap: theme.spacing.md,
  },
  bentoItem: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    borderWidth: 2,
    borderColor: "transparent",
  },
  bentoItemSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.surface,
  },
  bentoItemLarge: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  bentoItemSmall: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: "space-between",
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
  bentoText: {
    fontSize: theme.textSizes.md,
    fontWeight: theme.font.semibold.toString(),
    color: theme.colors.textPrimary,
  },
});
