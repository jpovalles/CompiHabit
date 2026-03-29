import { theme } from "@/constants/theme";
import { FontAwesome5 } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";


export default function HabitButton({ selected, onSelect, habit }) {
    const icons = {
        "Actividad física": "dumbbell",
        "Lectura": "book-open",
        "Tiempo en pantalla": "hourglass",
    }

    return (
        <Pressable
            style={[
                styles.bentoItem,
                styles.bentoItemLarge,
                selected === habit.id_habit_type && styles.bentoItemSelected,
            ]}
            onPress={() => onSelect(habit.id_habit_type)}
        >
            <View
                style={[
                    styles.iconContainer,
                    selected === habit.id_habit_type && styles.iconContainerSelected,
                    { marginBottom: 0, marginRight: theme.spacing.md },
                ]}
            >
                <FontAwesome5
                    name={icons[habit.habit_name]}
                    size={24}
                    color={
                        selected === habit.id_habit_type
                            ? theme.colors.background
                            : theme.colors.primary
                    }
                />
            </View>
            <View style={styles.bentoTextContainer}>
                <Text style={styles.bentoText}>{habit.habit_name}</Text>
                <Text style={styles.bentoDescription}>{habit.habit_description}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    bentoItem: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radius.lg,
        padding: theme.spacing.md,
        borderWidth: 2,
        borderColor: "transparent",
    },
    bentoItemSelected: {
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.surface,
    },
    bentoItemLarge: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: theme.colors.background,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: theme.spacing.md,
    },
    iconContainerSelected: {
        backgroundColor: theme.colors.primary,
    },
    bentoTextContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        gap: theme.spacing.xs,
    },
    bentoDescription: {
        fontSize: theme.textSizes.sm,
        color: theme.colors.textMuted,
    },
    bentoText: {
        fontSize: theme.textSizes.md,
        fontWeight: theme.font.semibold.toString(),
        color: theme.colors.textPrimary,
    },
})