import FancyButton from "@/src/components/FancyButton";
import FancyInput from "@/src/components/FancyInput";
import { error_msg_register } from "@/src/constants/auth/error_msg";
import { theme } from "@/src/constants/theme";
import { useAuth } from "@/src/context/AuthContext";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function RegisterScreen() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    // Field validations
    if (!email || !password || !username) {
      Alert.alert("Error", error_msg_register.required_fields);
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", error_msg_register.password_mismatch);
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", error_msg_register.weak_password);
      return;
    }

    try {
      await signUp(email, password, username);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Image
          source={require("@/assets/images/isotype_nobg.webp")}
          style={styles.logo}
        />
        <View style={styles.header}>
          <Text style={styles.title}>Crear cuenta</Text>
          <Text style={styles.subtitle}>Registrate para comenzar</Text>
        </View>

        <View style={styles.form}>
          <FancyInput
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <FancyInput
            placeholder="Nombre de usuario"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
          <FancyInput
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <FancyInput
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <FancyButton label="Registrarse" onPress={handleRegister} />

          <View style={styles.footer}>
            <Text style={styles.footerText}>¿Ya tienes una cuenta? </Text>
            <Link href="/(auth)/login" style={styles.link}>
              Inicia sesión
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing.xl,
  },
  header: {
    marginBottom: theme.spacing.xl,
    alignItems: "center",
  },
  title: {
    fontSize: theme.textSizes.xl,
    fontWeight: "700",
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.textSizes.md,
    color: theme.colors.textMuted,
  },
  form: {
    width: "100%",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: theme.spacing.lg,
  },
  footerText: {
    color: theme.colors.textMuted,
    fontSize: theme.textSizes.sm,
  },
  link: {
    color: theme.colors.primary,
    fontWeight: "600",
    fontSize: theme.textSizes.sm,
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: theme.spacing.xl,
    objectFit: "contain",
  },
});
