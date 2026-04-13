import PrimaryButton from "@/src/components/PrimaryButton";
import { theme } from "@/src/constants/theme";
import { useAuth } from "@/src/context/AuthContext";
import { StyleSheet, View } from "react-native";

export default function Logout() {
    const { signOut } = useAuth();
    const handleLogout = () => {
        signOut();
    }
    return (
        <View style={styles.container}>
            <PrimaryButton onPress={handleLogout} label="Cerrar sesión" style={styles.logoutButton} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingHorizontal: theme.spacing.lg,
        justifyContent: "center",
        alignItems: "center",
    },
    logoutButton: {
        width: "100%",
    },
});