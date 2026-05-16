import { theme } from "@/src/constants/theme";
import { useAuth } from "@/src/context/AuthContext";
import { useStreakListener } from "@/src/hooks/useStreakListener";
import { fetchBadgeColors } from "@/src/logic/badgeLogic";
import { fetchCurrentDayPact } from "@/src/logic/pactLogic";
import CurrentDayPills from "@/src/screens/pacts/components/CurrentDayPills";
import PactCard from "@/src/screens/pacts/components/PactCard";
import { getDateDay } from "@/src/utils/extractDate";
import { parsePact } from "@/src/utils/parsePact";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import CheckProofModal from "../components/CheckProofModal";
import ResetNotifications from "../components/ResetNotifications";
import UploadProofModal from "../components/UploadProofModal";
import { useStreakNotifications } from "../hooks/useStreakNotifications";

const LoadingMessage = () => {
  return (
    <View style={styles.centered}>
      <Text style={styles.loadingText}>Cargando pactos...</Text>
    </View>
  );
};

const NoActivePactsMessage = () => {
  return (
    <View style={styles.centered}>
      <Text style={styles.loadingText}>
        No hay pactos para hoy. ¡Anímate a crear uno!
      </Text>
    </View>
  );
};

export default function ActivesPacts() {
  const [activePacts, setActivePacts] = useState([]);
  const [badgeColors, setBadgeColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProofModal, setShowProofModal] = useState(false);
  const [showCheckProofModal, setShowCheckProofModal] = useState(false);
  const [selectedPact, setSelectedPact] = useState(null);

  const {
    notifications,
    markAsSeen,
    markAllAsSeen,
    fetchPendingNotifications,
  } = useStreakNotifications();

  const { user } = useAuth();

  const getActivePacts = async () => {
    if (!user?.id) return;
    try {
      const response = await fetchCurrentDayPact(user.id, getDateDay());
      const parsedPacts = response.map((pact) => parsePact(pact));
      setActivePacts(parsedPacts);
    } catch (error) {
      Alert.alert("Error al obtener pactos activos: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  const getBadgeLevels = async () => {
    if (!user?.id) return;
    try {
      const response = await fetchBadgeColors();
      setBadgeColors(response);
    } catch (error) {
      Alert.alert("Error al obtener colores de insignias: ", error.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getActivePacts();
      getBadgeLevels();
      fetchPendingNotifications();
    }, []),
  );

  useStreakListener(() => {
    getActivePacts();
  });

  if (loading) {
    return (
      <View style={{ flex: 1 }}>
        <CurrentDayPills />
        <LoadingMessage />
      </View>
    );
  }

  if (activePacts.length === 0) {
    return (
      <View style={{ flex: 1 }}>
        <CurrentDayPills />
        <NoActivePactsMessage />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <CurrentDayPills />
      {/*<FlameBadgeShowcase />*/}
      <View style={{ marginVertical: 10, marginHorizontal: theme.spacing.md }}>
        <Text style={styles.title}>Pactos de hoy</Text>
        <Text style={styles.subtitle}>
          ¡Hagan sus hábitos y mantengan la racha como equipo!
        </Text>
      </View>
      <FlatList
        data={activePacts}
        keyExtractor={(item) => item.pact.id_pact.toString()}
        renderItem={({ item }) => (
          <PactCard
            pact={item.pact}
            streak={item.streak}
            badgeColors={badgeColors}
            onPressSubmit={() => {
              setShowProofModal(true);
              setSelectedPact(item);
            }}
            onPressValidate={() => {
              setShowCheckProofModal(true);
              setSelectedPact(item);
            }}
            onRefresh={getActivePacts}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.loadingText}>No hay pactos activos</Text>
        }
        contentContainerStyle={{ paddingBottom: 100 }}
      />
      {selectedPact && showProofModal && (
        <UploadProofModal
          isOpen={showProofModal}
          onClose={() => setShowProofModal(false)}
          pact={selectedPact.pact}
          streak={selectedPact.streak}
          onRefresh={getActivePacts}
        />
      )}
      {selectedPact && showCheckProofModal && (
        <CheckProofModal
          isOpen={showCheckProofModal}
          onClose={() => setShowCheckProofModal(false)}
          pact={selectedPact.pact}
          streak={selectedPact.streak}
          onRefresh={getActivePacts}
        />
      )}
      <ResetNotifications
        notifications={notifications}
        onMarkAsSeen={markAsSeen}
        onMarkAllAsSeen={markAllAsSeen}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: theme.textSizes.md,
    color: theme.colors.textPrimary,
  },
  title: {
    fontSize: theme.textSizes.lg,
    fontWeight: theme.font.bold.toString(),
    color: theme.colors.textPrimary,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: theme.textSizes.sm,
    color: theme.colors.textPrimary,
    letterSpacing: -0.3,
  },
});
