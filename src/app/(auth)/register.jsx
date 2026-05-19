import FancyInput from "@/src/components/FancyInput";
import PrimaryButton from "@/src/components/PrimaryButton";
import { theme } from "@/src/constants/theme";
import { useAuth } from "@/src/context/AuthContext";
import { validateRegisterFields } from "@/src/logic/authLogic";
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
    try {
      validateRegisterFields({ email, username, password, confirmPassword });
      await signUp(email, password, username);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const catchUsername = (username) => {
    const newUsername = username.toLowerCase().trim();
    if (newUsername.includes(" ")) {
      Alert.alert("Error", "El nombre de usuario no puede contener espacios");
      return;
    }
    setUsername(newUsername);
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
            onChangeText={catchUsername}
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

          <PrimaryButton label="Registrarse" onPress={handleRegister} />

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
