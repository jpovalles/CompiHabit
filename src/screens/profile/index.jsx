import { theme } from "@/src/constants/theme";
import { useAuth } from "@/src/context/AuthContext";
import { handleEditUsername } from "@/src/logic/profileLogic";
import { searchUserById } from "@/src/services/profileService";
import { useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logout from "./components/Logout";
import ProfileInfo from "./components/ProfileInfo";

export default function Profile() {
    const { user } = useAuth();
    const [profile, setProfile] = useState(null);

    const email = user?.email;

    const getProfile = async () => {
        try {
            const data = await searchUserById(user.id);
            setProfile({ ...data, email });
        } catch (error) {
            Alert.alert("Error al obtener perfil: ", error.message);
        }
    };

    const onEditUsername = async (newUsername) => {
        try {
            await handleEditUsername(user.id, newUsername);
            setProfile({ ...profile, username: newUsername });
        } catch (error) {
            Alert.alert("Error al editar nombre de usuario: ", error.message);
        }
    }

    useEffect(() => {
        getProfile();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ProfileInfo profile={profile} onEditUsername={onEditUsername} />
            <Logout />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: theme.colors.border,
        paddingHorizontal: theme.spacing.lg,
    },
});