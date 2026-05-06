import { theme } from "@/src/constants/theme";
import { useAuth } from "@/src/context/AuthContext";
import { fetchBadgeColors } from "@/src/logic/badgeLogic";
import { fetchNoCurrentDayPacts } from "@/src/logic/pactLogic";
import CurrentDayPills from "@/src/screens/pacts/components/CurrentDayPills";
import PactCard from "@/src/screens/pacts/components/PactCard";
import { getDateDay } from "@/src/utils/extractDate";
import { parsePact } from "@/src/utils/parsePact";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

const LoadingMessage = () => {
  return (
    <View style={styles.centered}>
      <Text style={styles.loadingText}>Cargando pactos...</Text>
    </View>
  );
};

const NoInactivePactsMessage = () => {
  return (
    <View style={styles.centered}>
      <Text style={styles.loadingText}>No hay pactos inactivos</Text>
    </View>
  );
};

export default function InactivePacts() {
  const [inactivePacts, setInactivePacts] = useState([]);
  const [badgeColors, setBadgeColors] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  const getInactivePacts = async () => {
    if (!user?.id) return;
    try {
      const response = await fetchNoCurrentDayPacts(user.id, getDateDay());
      const parsedPacts = response.map((pact) => parsePact(pact));
      setInactivePacts(parsedPacts);
    } catch (error) {
      Alert.alert("Error al obtener pactos inactivos: ", error.message);
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

  useEffect(() => {
    getInactivePacts();
    getBadgeLevels();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <CurrentDayPills />
      {loading ? (
        <LoadingMessage />
      ) : inactivePacts.length === 0 ? (
        <NoInactivePactsMessage />
      ) : (
        <View>
          <View
            style={{ marginBottom: 10, marginHorizontal: theme.spacing.md }}
          >
            <Text style={styles.title}>Pactos Inactivos</Text>
            <Text style={styles.subtitle}>
              Hoy no toca… pero sigue contando.
            </Text>
          </View>
          {inactivePacts.map((pact) => (
            <PactCard
              key={pact.pact.id_pact}
              pact={pact.pact}
              streak={pact.streak}
              badgeColors={badgeColors}
              isActive={false}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "flex-start",
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
