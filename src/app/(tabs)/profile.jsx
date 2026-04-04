import FancyButton from "@/src/components/FancyButton";
import { theme } from "@/src/constants/theme";
import { Alert, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/src/context/AuthContext";

export default function Profile() {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>This is profile</Text>
        <FancyButton label="Cerrar sesión" onPress={handleLogout} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.border,
  },
});
