import CreatePactModal from "@/components/create_pact/CreatePactModal";
import FAB from "@/components/FAB";
import PactCard from "@/components/pact_card/PactCard";
import { theme } from "@/constants/theme";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Pacts() {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text>This is pacts</Text>
        <PactCard onRegister={() => console.log("Registrado!")} />
      </View>
      <FAB onPress={() => setShowCreate(true)} />
      <CreatePactModal
        visible={showCreate}
        onClose={() => setShowCreate(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.border,
  },
});
