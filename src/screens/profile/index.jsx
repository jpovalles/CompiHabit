import { theme } from "@/src/constants/theme";
import { useAuth } from "@/src/context/AuthContext";
import { fetchUserById, handleEditUsername } from "@/src/logic/profileLogic";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logout from "./components/Logout";
import ProfileInfo from "./components/ProfileInfo";

const LoadingMessage = () => {
  return (
    <View style={styles.centered}>
      <Text style={styles.loadingText}>Cargando el perfil...</Text>
    </View>
  );
};

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  const email = user?.email;

  const getProfile = async () => {
    try {
      const data = await fetchUserById(user.id);
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
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {!profile ? (
        <LoadingMessage />
      ) : (
        <>
          <ProfileInfo profile={profile} onEditUsername={onEditUsername} />
          <Logout />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.border,
    paddingHorizontal: theme.spacing.lg,
    alignItems: "center",
  },
  title: {
    fontSize: theme.textSizes.xl,
    fontWeight: theme.font.bold.toString(),
    color: theme.colors.textPrimary,
    marginTop: theme.spacing.lg,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: theme.textSizes.md,
    color: theme.colors.textPrimary,
  },
});
