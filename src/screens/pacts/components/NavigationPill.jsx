import { theme } from "@/src/constants/theme";
import { Pressable, StyleSheet, Text } from "react-native";


export default function NavigationPill({ tab, activeTab, setActiveTab }) {
    return (
        <Pressable key={tab.id} onPress={() => setActiveTab(tab.id)}>
            <Text
                style={[
                    styles.tabButton,
                    activeTab === tab.id && styles.tabButtonSelected
                ]}
            >
                {tab.label}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    tabButton: {
        fontSize: theme.textSizes.md,
        fontWeight: theme.font.semibold,
        color: theme.colors.textMuted,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radius.lg,
        padding: theme.spacing.sm,
        borderWidth: 2,
        borderColor: "transparent",
    },
    tabButtonSelected: {
        color: theme.colors.background,
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.primary,
    },
});