import FancyInput from "@/components/FancyInput";
import { theme } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { searchUsers } from "@/services/profileService";
import Entypo from '@expo/vector-icons/Entypo';
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ProfileCard from "./ProfileCard";

export default function GuestSelectionTab() {
    const [searchQuery, setSearchQuery] = useState("");
    const [results, setResults] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const { session } = useAuth();

    const loadUsers = async () => {
        try {
            const data = await searchUsers(searchQuery, session.user.id);
            console.log(data);
            setResults(data);
        } catch (error) {
            Alert.alert("Error al obtener usuarios: ", error.message);
        }
    };

    useEffect(() => {
        if (searchQuery.length < 2) return;
        const timer = setTimeout(async () => {
            loadUsers();
        }, 400);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Selecciona tu Compi</Text>
            <Text style={styles.description}>
                Elige una persona para acompañarte en esta actividad. Podrán ver el progreso y motivarse mutuamente.
            </Text>
            <View style={styles.searchContainer}>
                <FancyInput
                    placeholder="Nombre de usuario"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    style={{ flex: 1 }}
                />
                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={() => console.log(searchQuery)}
                >
                    <Entypo name="magnifying-glass" size={20} color={theme.colors.textPrimary} />
                </TouchableOpacity>
            </View>
            {selectedUser && (
                <ProfileCard
                    key={selectedUser.id_profile}
                    user={selectedUser}
                    selected={selectedUser === selectedUser.id_profile}
                    onSelect={setSelectedUser}
                />
            )}
            {results.length > 0 ? (
                <View style={[styles.resultsContainer, { width: '100%' }]}>
                    {results.map((user) => (
                        <ProfileCard
                            key={user.id_profile}
                            user={user}
                            selected={selectedUser === user.id_profile}
                            onSelect={setSelectedUser}
                        />
                    ))}
                </View>
            ) : (
                <View style={styles.resultsContainer}>
                    <Text style={styles.resultText}>No se encontraron usuarios</Text>
                </View>
            )}

        </View>
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
    searchContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: theme.spacing.md,
        marginBottom: theme.spacing.md,
    },
    searchButton: {
        backgroundColor: theme.colors.primary,
        paddingVertical: theme.spacing.md,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
    },
    searchButtonText: {
        color: theme.colors.textPrimary,
        fontSize: theme.textSizes.md,
        fontWeight: theme.font.semibold.toString(),
    },
    resultsContainer: {
        flex: 1,
        marginTop: theme.spacing.md,
        alignItems: "center",
    },
    result: {
        padding: theme.spacing.md,
        backgroundColor: theme.colors.backgroundSecondary,
        borderRadius: 50,
        marginBottom: theme.spacing.sm,
    },
    resultText: {
        color: theme.colors.textMuted,
        fontSize: theme.textSizes.md,
        fontWeight: theme.font.semibold.toString(),
    },

});