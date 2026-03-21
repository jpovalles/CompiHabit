import PactCard from "@/components/PactCard";
import { theme } from "@/constants/theme";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Pacts() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>This is pacts</Text>
        <PactCard onRegister={() => console.log("Registrado!")} />
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
