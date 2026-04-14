import FancyInput from "@/src/components/FancyInput";
import PrimaryButton from "@/src/components/PrimaryButton";
import { theme } from "@/src/constants/theme";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const AVATAR_SIZE = 96;

export default function ProfileInfo({ profile, onEditPhoto, onEditUsername }) {
    const [showInput, setShowInput] = useState(false);
    const [newUsername, setNewUsername] = useState(profile?.username);

    const handleEditUsername = () => {
        onEditUsername(newUsername?.trim());
        setShowInput(false);
    }

    const handleCancelEditUsername = () => {
        setNewUsername(profile?.username);
        setShowInput(false);
    }

    const checkUsername = () => {
        return newUsername?.trim() === profile?.username || newUsername?.trim().length < 3;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Tu perfil</Text>
            </View>
            {/* Avatar with edit overlay */}
            <Pressable
                onPress={onEditPhoto}
                accessibilityLabel="Cambiar foto de perfil"
                accessibilityRole="button"
                style={({ pressed }) => [
                    styles.avatarOuter,
                    pressed && styles.avatarPressed,
                ]}
            >
                <View style={styles.avatarWrapper}>
                    {profile?.avatar_url ? (
                        <Image
                            source={{ uri: profile.avatar_url }}
                            style={styles.avatarImage}
                            accessibilityLabel={`Foto de perfil de ${profile.username}`}
                        />
                    ) : (
                        <Text style={styles.avatarInitial}>
                            {profile?.username?.[0]?.toUpperCase() ?? "?"}
                        </Text>
                    )}
                </View>

                {/* Camera badge */}
                <View style={styles.cameraBadge}>
                    <FontAwesome5 name="camera" size={12} color="#ffffff" />
                </View>
            </Pressable>

            {/* User info */}
            <View style={styles.infoBlock}>
                <View style={styles.usernameRow}>
                    {showInput ? (
                        <View style={styles.editUsername}>
                            <FancyInput
                                placeholder="Nombre de usuario"
                                value={newUsername}
                                onChangeText={setNewUsername}
                                onSubmitEditing={handleEditUsername}
                                style={{ width: "100%" }}
                                textAlign="center"
                            />
                            <View style={styles.editUsernameButtons}>
                                <PrimaryButton onPress={handleCancelEditUsername} label="Cancelar" style={{ flex: 1 }} />
                                <PrimaryButton onPress={handleEditUsername} label="Guardar" style={{ flex: 1 }} disabled={checkUsername()} />
                            </View>
                        </View>
                    ) : (
                        <>
                            <Text style={styles.username} numberOfLines={1}>
                                {profile?.username}
                            </Text>
                            <Pressable
                                onPress={() => setShowInput(!showInput)}
                                accessibilityLabel="Editar nombre de usuario"
                                accessibilityRole="button"
                                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                                style={({ pressed }) => [
                                    styles.editIcon,
                                    pressed && styles.editIconPressed,
                                ]}
                            >
                                <FontAwesome5 name="pen" size={12} color={theme.colors.primary} />
                            </Pressable>
                        </>
                    )}
                </View>
                <Text style={styles.email} numberOfLines={1}>
                    {profile.email}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingVertical: theme.spacing.lg,
        paddingHorizontal: theme.spacing.md,
        gap: theme.spacing.md,
    },
    title: {
        fontSize: theme.textSizes.xl,
        fontWeight: theme.font.bold.toString(),
        color: theme.colors.textPrimary,
        marginTop: theme.spacing.lg,
    },
    avatarOuter: {
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
    },
    avatarWrapper: {
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        borderRadius: AVATAR_SIZE / 2,
        backgroundColor: "#6c63ff22",
        borderWidth: 2,
        borderColor: "#6c63ff44",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    avatarPressed: {
        opacity: 0.75,
    },
    avatarImage: {
        width: "100%",
        height: "100%",
    },
    avatarInitial: {
        color: theme.colors.primary,
        fontSize: AVATAR_SIZE * 0.4,
        fontWeight: theme.font.bold.toString(),
    },
    cameraBadge: {
        position: "absolute",

        bottom: 0,
        right: 0,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: theme.colors.primary,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: theme.colors.background,
    },

    // Info
    infoBlock: {
        alignItems: "center",
        gap: theme.spacing.xs,
    },
    usernameRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: theme.spacing.sm,
    },
    editUsername: {
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        //backgroundColor: "lime"

    },
    editUsernameButtons: {
        flexDirection: "row",
        gap: theme.spacing.sm,
    },
    username: {
        color: theme.colors.textPrimary,
        fontSize: theme.textSizes.xl,
        fontWeight: theme.font.bold.toString(),
        letterSpacing: -0.3,
    },
    editIcon: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: "#6c63ff22",
        justifyContent: "center",
        alignItems: "center",
    },
    editIconPressed: {
        backgroundColor: "#6c63ff44",
    },
    email: {
        color: theme.colors.textMuted,
        fontSize: theme.textSizes.md,
    },


});