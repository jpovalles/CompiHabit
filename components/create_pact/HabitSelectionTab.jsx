import { theme } from "@/constants/theme";
import { getHabits } from "@/services/habits_service";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import HabitButton from "./HabitButton";



export default function HabitSelectionTab({ pactData, setPactData }) {
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
        loadHabits();
    }, []);

    const [selectedHabit, setSelectedHabit] = useState(null);

    const handleSelect = (id_selected) => {
        setSelectedHabit(id_selected);
        setPactData({ ...pactData, id_habit_type: id_selected });
    };

    return (
        <View style={styles.bentoContainer}>
            <Text style={styles.title}>Crea tu nuevo pacto</Text>
            <Text style={styles.description}>
                Selecciona el hábito que quieres incluir en tu pacto
            </Text>

            <View style={styles.bentoGrid}>
                {habits?.length > 0 ? (
                    habits.map((habit) => (
                        <HabitButton
                            key={habit.id_habit_type}
                            selected={selectedHabit}
                            onSelect={handleSelect}
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

const styles = StyleSheet.create({
    bentoContainer: {
        flex: 1,
    },
    title: {
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
    bentoGrid: {
        gap: theme.spacing.md,
    },
});