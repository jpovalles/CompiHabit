import FAB from "@/components/FAB";
import FancyButton from "@/components/FancyButton";
import { theme } from "@/constants/theme";
import { Modal, StyleSheet, Text, View } from "react-native";

export default function CreatePactModal({ visible, onClose }) {
  return (
    <Modal visible={visible} animationType="slide">
      <View style={{ flex: 1 }}>
        <FAB
          onPress={onClose}
          icon="close"
          style={{
            top: theme.spacing.xl,
            bottom: "auto",
            width: 40,
            height: 40,
          }}
        />
      </View>
      <View style={styles.modalContent}>
        <Text>Create Pact</Text>
        <FancyButton label="Close" onPress={onClose} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
