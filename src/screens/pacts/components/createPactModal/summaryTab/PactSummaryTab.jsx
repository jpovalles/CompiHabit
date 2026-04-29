import { theme } from "@/src/constants/theme";
import ProfileCard from "@/src/screens/pacts/components/createPactModal/guestTab/ProfileCard";
import HabitButton from "@/src/screens/pacts/components/createPactModal/habitTab/HabitButton";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";


export default function PactSummaryTab({ pactData, setFieldFilled }) {
    useEffect(() => {
        // User just checks the data so the create pact button must be active
        setFieldFilled(true);
    }, []);

    const DAYS_OF_WEEK = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>Resumen del Pacto</Text>
            <Text style={styles.description}>
                Revisa los detalles antes de crear tu pacto.
            </Text>

            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Hábito seleccionado</Text>
                <View pointerEvents="none">
                    <HabitButton
                        habit={{
                            id_habit_type: pactData.id_habit_type,
                            habit_name: pactData.habit_name,
                            habit_description: pactData.habit_description
                        }}
                        selected={null}
                        onSelect={() => { }}
                    />
                </View>
            </View>

            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Frecuencia</Text>
                <View style={[styles.summaryCard, { marginTop: theme.spacing.xs }]}>
                    <View style={styles.summaryItem}>
                        <Text style={styles.itemLabel}>Días seleccionados:</Text>
                        <Text style={styles.itemValue}>
                            {pactData.pact_days && pactData.pact_days.length > 0
                                ? pactData.pact_days.map(dayId => DAYS_OF_WEEK[dayId]).join(", ")
                                : "Ninguno"}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Compañero</Text>
                <View pointerEvents="none">
                    <ProfileCard
                        user={{
                            username: pactData.guest_name || pactData.id_guest || "Sin compañero seleccionado",
                        }}
                        selected={false}
                        onSelect={() => { }}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
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
    sectionContainer: {
        marginBottom: theme.spacing.lg,
        gap: theme.spacing.sm,
    },
    sectionTitle: {
        fontSize: theme.textSizes.md,
        color: theme.colors.textPrimary,
        fontWeight: theme.font.bold.toString(),
    },
    summaryCard: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radius.md,
        padding: theme.spacing.lg,
        gap: theme.spacing.md,
    },
    summaryItem: {
        flexDirection: "column",
        gap: theme.spacing.xs,
    },
    itemLabel: {
        fontSize: theme.textSizes.sm,
        color: theme.colors.textMuted,
        fontWeight: theme.font.regular.toString(),
    },
    itemValue: {
        fontSize: theme.textSizes.md,
        color: theme.colors.textPrimary,
        fontWeight: theme.font.semibold.toString(),
    },
});
