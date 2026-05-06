import { theme } from "@/src/constants/theme";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CurrentDayPills({ pactDays = [], style, fontSize = 16 }) {
    const DAYS_OF_WEEK = [
        { id: 0, label: "D" },
        { id: 1, label: "L" },
        { id: 2, label: "M" },
        { id: 3, label: "M" },
        { id: 4, label: "J" },
        { id: 5, label: "V" },
        { id: 6, label: "S" },
    ];

    const showCurrentDay = pactDays?.length === 0;

    return (
        <View style={[styles.daysContainer, style]}>
            {showCurrentDay && <Text style={styles.label}>Día en curso</Text>}
            {DAYS_OF_WEEK.map((day) => {
                const isSelected = showCurrentDay ? day.id === new Date().getDay() : pactDays.includes(day.id);
                return (
                    <TouchableOpacity
                        key={day.id}
                        style={[styles.dayCircle, isSelected && styles.dayCircleSelected]}
                        activeOpacity={0.8}
                    >
                        <Text style={[styles.dayText, isSelected && styles.dayTextSelected, fontSize && { fontSize }]}>
                            {day.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        fontSize: theme.textSizes.md,
        fontWeight: theme.font.semibold.toString(),
        color: theme.colors.primary,
        marginRight: theme.spacing.xs,
    },
    daysContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 50,
        gap: 5,
        backgroundColor: theme.colors.background,
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.md,
    },
    dayCircle: {
        height: "100%",
        width: "100%",
        flex: 1,
        aspectRatio: 1,
        borderRadius: 100,
        backgroundColor: theme.colors.surface,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "transparent",
    },
    dayCircleSelected: {
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.primary,
    },
    dayText: {
        fontSize: 16,
        color: theme.colors.textMuted,
        fontWeight: theme.font.semibold.toString(),
    },
    dayTextSelected: {
        color: theme.colors.primary,
    },
});