import { theme } from "@/src/constants/theme";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CurrentDayPills() {
    const DAYS_OF_WEEK = [
        { id: 0, label: "D" },
        { id: 1, label: "L" },
        { id: 2, label: "M" },
        { id: 3, label: "M" },
        { id: 4, label: "J" },
        { id: 5, label: "V" },
        { id: 6, label: "S" },
    ];

    return (
        <View style={styles.daysContainer}>
            {DAYS_OF_WEEK.map((day) => {
                const isSelected = day.id === new Date().getDay();
                return (
                    <TouchableOpacity
                        key={day.id}
                        style={[styles.dayCircle, isSelected && styles.dayCircleSelected]}
                        activeOpacity={0.8}
                    >
                        <Text style={[styles.dayText, isSelected && styles.dayTextSelected]}>
                            {day.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    daysContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 50,
        gap: 5,
        marginBottom: theme.spacing.md,
        backgroundColor: theme.colors.background,
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.md,
    },
    dayCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
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
        fontSize: theme.textSizes.md,
        color: theme.colors.textMuted,
        fontWeight: theme.font.semibold.toString(),
    },
    dayTextSelected: {
        color: theme.colors.primary,
    },
});