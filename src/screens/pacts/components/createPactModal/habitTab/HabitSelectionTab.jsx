import { theme } from "@/src/constants/theme";
import { getHabits } from "@/src/services/habitsService";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import HabitButton from "@/src/screens/pacts/components/createPactModal/habitTab/HabitButton";



export default function HabitSelectionTab({ pactData, setPactData, setFieldFilled }) {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadHabits = async () => {
        try {
            setLoading(true);
            const data = await getHabits();
            setHabits(data);
        } catch (error) {
            Alert.alert("Error al obtener hábitos: ", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadHabits();
    }, []);

    const [selectedHabit, setSelectedHabit] = useState(pactData.id_habit_type);

    const handleSelect = (id_selected, habit_name, habit_description) => {
        setSelectedHabit(id_selected);
        setPactData({ ...pactData, pact_hours: null, id_habit_type: id_selected, habit_name: habit_name, habit_description: habit_description });
    };

    useEffect(() => {
        if (selectedHabit) {
            setFieldFilled(true);
        } else {
            setFieldFilled(false);
        }
    }, [selectedHabit]);

    return (
        <View style={styles.bentoContainer}>
            <Text style={styles.title}>Crea tu nuevo pacto</Text>
            <Text style={styles.description}>
                Selecciona el hábito que quieres incluir en tu pacto
            </Text>

            <View style={styles.bentoGrid}>
                {loading ? (
                    <Text style={styles.emptyText}>Cargando hábitos...</Text>
                ) : habits?.length > 0 ? (
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
    emptyText: {
        color: theme.colors.textMuted,
        textAlign: "center",
        marginTop: 20,
        fontSize: theme.textSizes.sm,
    }
});