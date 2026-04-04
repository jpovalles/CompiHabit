import { theme } from "@/src/constants/theme";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Achievements() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>This is achievements</Text>
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
