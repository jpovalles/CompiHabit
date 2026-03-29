import { theme } from "@/constants/theme";
import { StyleSheet, Text, View } from "react-native";
import HabitButton from "./HabitButton";



export default function HabitSelectionTab({ habits, selected, onSelect, pactData, setPactData }) {
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

const styles = StyleSheet.create({
    bentoContainer: {
        flex: 1,
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
    bentoGrid: {
        gap: theme.spacing.md,
    },
});