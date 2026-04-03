import { theme } from "@/src/constants/theme";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProfileCard({ user, selected, onSelect }) {
    const initial = user?.username ? user.username.charAt(0).toUpperCase() : "?";

    return (
        <TouchableOpacity
            style={[
                styles.container,
                selected && styles.containerSelected
            ]}
            onPress={() => onSelect(user)}
            activeOpacity={0.8}
        >
            <View style={styles.avatarContainer}>
                {user?.avatar_url ? (
                    <Image source={{ uri: user.avatar_url }} style={styles.avatarImage} />
                ) : (
                    <Text style={styles.avatarInitial}>{initial}</Text>
                )}
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.usernameText}>{user?.username}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        padding: theme.spacing.md,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radius.lg || 16,
        marginBottom: theme.spacing.sm,
        borderWidth: 2,
        borderColor: "transparent",
    },
    containerSelected: {
        borderColor: "#4CAF50", // Verde solicitado
        backgroundColor: "rgba(76, 175, 80, 0.05)",
    },
    avatarContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: theme.colors.background,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        marginRight: theme.spacing.md,
    },
    avatarImage: {
        width: "100%",
        height: "100%",
    },
    avatarInitial: {
        fontSize: theme.textSizes.lg,
        fontWeight: theme.font.bold.toString(),
        color: theme.colors.textPrimary,
    },
    infoContainer: {
        flex: 1,
        justifyContent: "center",
    },
    usernameText: {
        color: theme.colors.textPrimary,
        fontSize: theme.textSizes.md,
        fontWeight: theme.font.semibold.toString(),
    },
});