import { useAuth } from "@/src/context/AuthContext";
import PactCard from "@/src/screens/pacts/active/components/PactCard";
import { getBadgeColors } from "@/src/services/badgeColors";
import { getCurrentDayPact } from "@/src/services/pactService";
import { getDateDay } from "@/src/utils/extractDate";
import { parsePact } from "@/src/utils/parsePact";
import { useEffect, useState } from "react";
import { Alert, View } from "react-native";

export default function ActivesPacts() {
  const [activePacts, setActivePacts] = useState([]);
  const [badgeColors, setBadgeColors] = useState([]);

  const { user } = useAuth();

  const getActivePacts = async () => {
    try {
      const response = await getCurrentDayPact(user.id, getDateDay());
      const parsedPacts = response.map((pact) => parsePact(pact));
      setActivePacts(parsedPacts);
    } catch (error) {
      Alert.alert("Error al obtener pactos activos: ", error.message);
    }
  };

  const getBadgeLevels = async () => {
    try {
      const response = await getBadgeColors();
      setBadgeColors(response);
    } catch (error) {
      Alert.alert("Error al obtener colores de insignias: ", error.message);
    }
  };

  useEffect(() => {
    getActivePacts();
    getBadgeLevels();
  }, []);

  useEffect(() => {
    console.log("activePacts ", activePacts);
    badgeColors.forEach((badgeColor) => {
      console.log("badgeColor ", badgeColor);
    });
  }, [activePacts, badgeColors]);

  return (
    <View>
      {activePacts.map((pact) => (
        <PactCard
          key={pact.id_pact}
          habit={pact.habit_name}
          streakDays={pact.streak.streak_days}
          badgeLevel={pact.streak.badge_level}
          daysRemaining={pact.streak.days_remaining}
          progressPercent={pact.streak.progress_percent}
          todayStatus={pact.streak.today_status}
          onRegister={() => console.log("Registrado!")}
          onCheck={() => console.log("Verificado!")}
        />
      ))}
    </View>
  );
}
