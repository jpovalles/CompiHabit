import { theme } from "@/src/constants/theme";
import { FlatList, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AchievementCard from "./components/AchievementCard";

export default function Achievements() {
    const achievements = [
        {
            "achieved": false,
            "current_progress": 0,
            "title": "Deber diario",
            "description": "Crea un pacto configurado para cumplirse todos los días y completa una semana de racha. Este logro refleja tu intención de construir hábitos sólidos y constantes.",
            "icon": "calendar-check",
            "goal_value": 1
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
            "description": "Activa una racha con tu compi después de las 9:00 p.m. Ideal para quienes encuentran su productividad en la noche.",
            "current_progress": 0,
            "goal_value": 1
        },
        {
            "icon": "cloud-sun",
            "achieved": false,
            "title": "Disciplina mañanera",
            "description": "Activa una racha con tu compi antes de las 10:00 a.m. Un logro para quienes empiezan el día con disciplina y energía.",
            "current_progress": 0,
            "goal_value": 1
        },
        {
            "icon": "balance-scale",
            "achieved": false,
            "title": "Maestro de la constancia",
            "description": "Obtén todas las insignias de racha disponibles en un mismo pacto. Este logro representa disciplina a largo plazo y dedicación continua.",
            "current_progress": 0,
            "goal_value": 5
        }
    ]

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
