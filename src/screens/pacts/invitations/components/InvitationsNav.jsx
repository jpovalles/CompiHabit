import { theme } from "@/src/constants/theme";
import { Pressable, StyleSheet, Text, View } from "react-native";


export default function InvitationsNav({ activeTab, setActiveTab }) {
    const tabLabel = [
        { id: 0, label: "Recibidas" },
        { id: 1, label: "Enviadas" },
    ];
    return (
        <View style={styles.subTabContainer}>
            {tabLabel.map((tab) => (
                <Pressable
                    key={tab.id}
                    onPress={() => setActiveTab(tab.id)}
                    style={[
                        styles.subTabitem,
                        activeTab === tab.id && styles.subTabItemSelected
                    ]}
                >
                    <Text style={[
                        styles.subTabText,
                        activeTab === tab.id && styles.subTabTextSelected
                    ]}>
                        {tab.label}
                    </Text>
                </Pressable>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    subTabContainer: {
        flexDirection: "row",
        backgroundColor: theme.colors.background,
        borderRadius: theme.radius.lg,
        padding: 4,
        marginBottom: theme.spacing.md,
    },
    subTabitem: {
        flex: 1,
        paddingVertical: 8,
        alignItems: "center",
        borderRadius: theme.radius.lg,
    },
    subTabItemSelected: {
        backgroundColor: theme.colors.primary,
    },
    subTabText: {
        fontSize: theme.textSizes.sm,
        color: theme.colors.textMuted,
        fontWeight: theme.font.semibold,
    },
    subTabTextSelected: {
        fontSize: theme.textSizes.sm,
        color: theme.colors.textPrimary,
        fontWeight: theme.font.semibold,
    },
});