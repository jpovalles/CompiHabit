import FAB from "@/components/FAB";
import FancyButton from "@/components/FancyButton";
import { theme } from "@/constants/theme";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

export default function CreatePactModal({ visible, onClose }) {
  const TABS = [
    "Seleccionar hábitos",
    "Establecer frecuencia",
    "Seleccionar Compi",
  ];
  const [activeTab, setActiveTab] = useState(TABS[0]);

  const [selectedHabit, setSelectedHabit] = useState(null);

  const handleClose = () => {
    setActiveTab(TABS[0]);
    setSelectedHabit(null);
    onClose();
  };

  const renderContent = () => {
    switch (activeTab) {
      case TABS[0]:
        return (
          <HabitSelectionTab
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

function HabitSelectionTab({ selected, onSelect }) {
  return (
    <View style={styles.bentoContainer}>
      <Text style={styles.subtitle}>Crea tu nuevo pacto</Text>
      <Text style={styles.description}>
        Selecciona el hábito que quieres incluir en tu pacto
      </Text>

      <View style={styles.bentoGrid}>
        <Pressable
          style={[
            styles.bentoItem,
            styles.bentoItemLarge,
            selected === "actividad" && styles.bentoItemSelected,
          ]}
          onPress={() => onSelect("actividad")}
        >
          <View
            style={[
              styles.iconContainer,
              selected === "actividad" && styles.iconContainerSelected,
              { marginBottom: 0, marginRight: theme.spacing.md },
            ]}
          >
            <FontAwesome5
              name="dumbbell"
              size={24}
              color={
                selected === "actividad"
                  ? theme.colors.background
                  : theme.colors.primary
              }
            />
          </View>
          <Text style={styles.bentoText}>Actividad física</Text>
        </Pressable>

        <View style={styles.bentoRow}>
          <Pressable
            style={[
              styles.bentoItem,
              styles.bentoItemSmall,
              selected === "lectura" && styles.bentoItemSelected,
            ]}
            onPress={() => onSelect("lectura")}
          >
            <View
              style={[
                styles.iconContainer,
                selected === "lectura" && styles.iconContainerSelected,
              ]}
            >
              <MaterialCommunityIcons
                name="book-open-page-variant"
                size={28}
                color={
                  selected === "lectura"
                    ? theme.colors.background
                    : theme.colors.primary
                }
              />
            </View>
            <Text style={styles.bentoText}>Lectura diaria</Text>
          </Pressable>

          <Pressable
            style={[
              styles.bentoItem,
              styles.bentoItemSmall,
              selected === "pantalla" && styles.bentoItemSelected,
            ]}
            onPress={() => onSelect("pantalla")}
          >
            <View
              style={[
                styles.iconContainer,
                selected === "pantalla" && styles.iconContainerSelected,
              ]}
            >
              <MaterialCommunityIcons
                name="cellphone-check"
                size={28}
                color={
                  selected === "pantalla"
                    ? theme.colors.background
                    : theme.colors.primary
                }
              />
            </View>
            <Text style={styles.bentoText}>Tiempo en pantalla</Text>
          </Pressable>
        </View>
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
    padding: theme.spacing.lg,
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
