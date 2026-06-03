import { theme } from "@/src/constants/theme";
import { useAuth } from "@/src/context/AuthContext";
import { usePactListener } from "@/src/hooks/usePactListener";
import { useStreakListener } from "@/src/hooks/useStreakListener";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AchievementCard from "./components/AchievementCard";
import useCheckAchievements from "./hooks/useCheckAchievements";

const LoadingMessage = () => {
  return (
    <View style={styles.centered}>
      <Text style={styles.loadingText}>Cargando logros...</Text>
    </View>
  );
};

export default function Achievements() {
  const { session } = useAuth();

  const [achievements, setAchievements] = useState([]);

  const checkAchievements = async () => {
    const data = await useCheckAchievements(session?.user?.id);
    setAchievements(data);
  };

  useFocusEffect(
    useCallback(() => {
      checkAchievements();
    }, []),
  );

  useStreakListener(async () => {
    await useCheckAchievements(session?.user?.id);
  });

  usePactListener(async () => {
    await useCheckAchievements(session?.user?.id);
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mis logros</Text>
      {achievements.length === 0 && <LoadingMessage />}
      <FlatList
        data={achievements}
        style={{ flex: 1, marginTop: theme.spacing.lg, width: "100%" }}
        numColumns={1}
        renderItem={({ item }) => (
          <AchievementCard
            icon={item.icon}
            achieved={item.achieved}
            title={item.title}
            description={item.description}
            current_progress={item.current_progress}
            goal_value={item.goal_value}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.border,
    paddingHorizontal: theme.spacing.sm,
    alignItems: "center",
  },
  title: {
    fontSize: theme.textSizes.xl,
    fontWeight: theme.font.bold.toString(),
    color: theme.colors.textPrimary,
    marginTop: theme.spacing.lg,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: theme.textSizes.md,
    color: theme.colors.textPrimary,
  },
});
