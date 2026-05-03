import { theme } from "@/src/constants/theme";
import { useAuth } from "@/src/context/AuthContext";
import { fetchUserAchievements } from "@/src/logic/achievements";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AchievementCard from "./components/AchievementCard";
import { check_morning_streak, check_night_streak } from "./hooks/useCheckAchievements";


export default function Achievements() {
    const { session } = useAuth();
    const achievements = [
        {
            "achieved": false,
            "current_progress": 0,
            "title": "Deber diario",
            "description": "Crea un pacto configurado para cumplirse todos los días y completa una semana de racha.",
            "icon": "calendar-check",
            "goal_value": 7
        },
        {
            "icon": "palette",
            "achieved": false,
            "title": "Arcoíris de hábitos",
            "description": "Crea un total de 3 pactos de hábitos diferentes. Explora distintas áreas de tu vida y comienza a construir una rutina sólida.",
            "current_progress": 0,
            "goal_value": 3
        },
        {
            "icon": "moon",
            "achieved": false,
            "title": "Guardián de la noche",
            "description": "Activa una racha con tu compi después de las 9:00 p.m.",
            "current_progress": 0,
            "goal_value": 1
        },
        {
            "icon": "cloud-sun",
            "achieved": false,
            "title": "Disciplina mañanera",
            "description": "Activa una racha con tu compi antes de las 10:00 a.m.",
            "current_progress": 0,
            "goal_value": 1
        },
        {
            "icon": "balance-scale",
            "achieved": false,
            "title": "Maestro de la constancia",
            "description": "Obtén todas las insignias de racha disponibles en un mismo pacto.",
            "current_progress": 0,
            "goal_value": 5
        }
    ]


    useFocusEffect(
        useCallback(() => {
            const run = async () => {
                const data = await fetchUserAchievements(session?.user?.id);
                data.forEach((achievement) => {
                    if (achievement.title === "Disciplina mañanera") {
                        check_morning_streak(achievement);
                    }
                    if (achievement.title === "Guardián de la noche") {
                        check_night_streak(achievement);
                    }
                });
            };
            run();
        }, [])
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Mis logros</Text>
            <FlatList
                data={achievements}
                style={{ flex: 1, marginTop: theme.spacing.lg, width: "100%" }}
                contentContainerStyle={{ justifyContent: "space-between" }}
                numColumns={2}
                columnWrapperStyle={{
                    justifyContent: "space-between"
                }}
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
});
