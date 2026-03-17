import { useState } from "react";
import {
  Alert,
  Animated,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Button from "@/components/button";

import * as Haptics from "expo-haptics";

// ─── Color Palette ───────────────────────────────────────────────
const C = {
  bg: "#0A0A0F",
  card: "#13131A",
  border: "#1E1E2E",
  accent: "#6EE7B7",
  accentDim: "#1A3D30",
  text: "#E8E8F0",
  muted: "#5A5A7A",
  danger: "#F87171",
  warn: "#FBBF24",
  blue: "#60A5FA",
};

// ─── Counter Card ─────────────────────────────────────────────────
function CounterCard() {
  const [count, setCount] = useState(0);
  const scale = new Animated.Value(1);

  const pulse = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.15,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const increment = () => {
    pulse();
    setCount((c) => c + 1);
  };
  const decrement = () => {
    pulse();
    setCount((c) => c - 1);
  };
  const reset = () => {
    pulse();
    setCount(0);
  };

  const color = count > 0 ? C.accent : count < 0 ? C.danger : C.muted;

  const HapticButton1 = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    increment();
  };
  const HapticButton2 = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    decrement();
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardLabel}>COUNTER</Text>
      <Animated.Text
        style={[styles.counterValue, { color, transform: [{ scale }] }]}
      >
        {count > 0 ? `+${count}` : count}
      </Animated.Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.btn, styles.btnOutline]}
          onPress={HapticButton2}
        >
          <Text style={styles.btnOutlineText}>−</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.btnGhost]} onPress={reset}>
          <Text style={styles.btnGhostText}>RESET</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, styles.btnAccent]}
          onPress={HapticButton1}
        >
          <Text style={styles.btnAccentText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── Input Card ───────────────────────────────────────────────────
function InputCard() {
  const [text, setText] = useState("");
  const [saved, setSaved] = useState([]);

  const save = () => {
    if (!text.trim()) return Alert.alert("Empty", "Type something first.");
    setSaved((s) => [text.trim(), ...s.slice(0, 3)]);
    setText("");
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardLabel}>INPUT TEST</Text>
      <TextInput
        style={styles.input}
        placeholder="Type something..."
        placeholderTextColor={C.muted}
        value={text}
        onChangeText={setText}
        onSubmitEditing={save}
        returnKeyType="done"
      />
      <TouchableOpacity
        style={[styles.btn, styles.btnAccent, { alignSelf: "flex-end" }]}
        onPress={save}
      >
        <Text style={styles.btnAccentText}>SAVE</Text>
      </TouchableOpacity>
      {saved.map((item, i) => (
        <View key={i} style={styles.savedItem}>
          <Text style={styles.savedDot}>▸</Text>
          <Text style={styles.savedText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

// ─── Alert Card ───────────────────────────────────────────────────
function AlertCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.cardLabel}>ALERTS</Text>
      <View style={styles.alertRow}>
        <Button
          title="Ejemplo"
          onPress={() => console.log("working")}
          variant="primary"
        />
        <Button
          title="Ejemplo"
          onPress={() => console.log("working")}
          variant="secondary"
        />
      </View>
    </View>
  );
}

// ─── Status Card ─────────────────────────────────────────────────
function StatusCard() {
  const items = [
    { label: "React Native", status: "✓ Ready", color: C.accent },
    { label: "Expo Router", status: "✓ Ready", color: C.accent },
    { label: "TypeScript", status: "✓ Ready", color: C.accent },
    { label: "Native Modules", status: "○ None yet", color: C.muted },
  ];

  return (
    <View style={styles.card}>
      <Text style={styles.cardLabel}>PROJECT STATUS</Text>
      {items.map(({ label, status, color }) => (
        <View key={label} style={styles.statusRow}>
          <Text style={styles.statusLabel}>{label}</Text>
          <Text style={[styles.statusValue, { color }]}>{status}</Text>
        </View>
      ))}
    </View>
  );
}

// ─── Modal Card ──────────────────────────────────────────────────
function ModalCard() {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.card}>
      <Text style={styles.cardLabel}>MODAL TEST</Text>
      <Text style={styles.subtitle}>
        Test React Natives built-in Modal component.
      </Text>

      <TouchableOpacity
        style={[
          styles.btn,
          styles.btnAccent,
          { alignSelf: "flex-start", marginTop: 14 },
        ]}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.btnAccentText}>OPEN MODAL</Text>
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        {/* Backdrop */}
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          {/* Sheet — stop propagation so tapping inside doesn't close */}
          <TouchableOpacity activeOpacity={1} style={styles.modalSheet}>
            <Text style={styles.modalBadge}>MODAL</Text>
            <Text style={styles.modalTitle}>It works!</Text>
            <Text style={styles.modalBody}>
              This is a native Modal component. Tap outside or press Close to
              dismiss it.
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.btn, styles.btnOutline, { flex: 1 }]}
                onPress={() => setVisible(false)}
              >
                <Text style={styles.btnOutlineText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btn, styles.btnAccent, { flex: 1 }]}
                onPress={() => {
                  setVisible(false);
                  Alert.alert(
                    "Confirmed!",
                    "Action was confirmed from the modal.",
                  );
                }}
              >
                <Text style={styles.btnAccentText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────
export default function WelcomeScreen() {
  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.badge}>EXPO · RN · TS</Text>
        <Text style={styles.title}>Test{"\n"}Playground</Text>
        <Text style={styles.subtitle}>
          Interact with each card to verify your setups is working correctly.
        </Text>
      </View>

      <CounterCard />
      <InputCard />
      <AlertCard />
      <ModalCard />
      <StatusCard />

      <Text style={styles.footer}>All systems nominal ✦</Text>
    </ScrollView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg, width: "100%" },
  content: { padding: 20, paddingBottom: 60 },

  // Header
  header: { marginBottom: 32, paddingTop: 20 },
  badge: {
    fontSize: 10,
    letterSpacing: 4,
    color: C.accent,
    fontWeight: "700",
    marginBottom: 12,
  },
  title: {
    fontSize: 48,
    fontWeight: "800",
    color: C.text,
    lineHeight: 52,
    marginBottom: 12,
  },
  subtitle: { fontSize: 14, color: C.muted, lineHeight: 22, maxWidth: 280 },

  // Card
  card: {
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  cardLabel: {
    fontSize: 10,
    letterSpacing: 3,
    color: C.muted,
    fontWeight: "700",
    marginBottom: 16,
  },

  // Counter
  counterValue: {
    fontSize: 72,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 20,
    letterSpacing: -2,
  },
  row: { flexDirection: "row", gap: 10, justifyContent: "center" },

  // Buttons
  btn: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    minWidth: 60,
    alignItems: "center",
  },
  btnAccent: { backgroundColor: C.accent },
  btnAccentText: { color: C.bg, fontWeight: "800", fontSize: 16 },
  btnOutline: { borderWidth: 1, borderColor: C.border },
  btnOutlineText: { color: C.text, fontWeight: "800", fontSize: 20 },
  btnGhost: { backgroundColor: "transparent" },
  btnGhostText: {
    color: C.muted,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
  },

  // Input
  input: {
    backgroundColor: C.bg,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 10,
    padding: 14,
    color: C.text,
    fontSize: 15,
    marginBottom: 12,
  },
  savedItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 8,
  },
  savedDot: { color: C.accent, fontSize: 12 },
  savedText: { color: C.text, fontSize: 14 },

  // Alerts
  alertRow: { flexDirection: "row", gap: 10 },
  alertBtn: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  alertBtnText: { fontSize: 12, fontWeight: "700", letterSpacing: 1 },

  // Status
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  statusLabel: { color: C.text, fontSize: 14 },
  statusValue: { fontSize: 13, fontWeight: "600" },

  // Footer
  footer: {
    textAlign: "center",
    color: C.muted,
    fontSize: 12,
    letterSpacing: 2,
    marginTop: 16,
  },

  // Modal
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalSheet: {
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 20,
    padding: 28,
    width: "100%",
  },
  modalBadge: {
    fontSize: 10,
    letterSpacing: 3,
    color: C.accent,
    fontWeight: "700",
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: C.text,
    marginBottom: 12,
  },
  modalBody: {
    fontSize: 14,
    color: C.muted,
    lineHeight: 22,
    marginBottom: 28,
  },
  modalActions: { flexDirection: "row", gap: 12 },
});
