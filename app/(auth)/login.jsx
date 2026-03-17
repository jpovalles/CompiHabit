import { Link, useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AuthButton } from '../../components/AuthButton';
import { AuthInput } from '../../components/AuthInput';
import { theme } from '../../constants/theme';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);
  const router = useRouter();

  const handleLogin = () => {
    // Implement login logic here
    console.log('Login with', username, password);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <Image
          source={require("../../assets/images/isotype_nobg.webp")}
          style={styles.logo}
        />
        <View style={styles.header}>
          <Text style={styles.title}>Bienvenido de vuelta!</Text>
          <Text style={styles.subtitle}>Inicia sesión para continuar</Text>
        </View>

        <View style={styles.form}>
          <AuthInput
            placeholder="Usuario"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
          />
          <AuthInput
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            ref={passwordRef}
            returnKeyType="done"
            onSubmitEditing={handleLogin}
          />

          <AuthButton label="Iniciar sesión" onPress={handleLogin} />

          <View style={styles.footer}>
            <Text style={styles.footerText}>¿No tienes una cuenta? </Text>
            <Link href="/(auth)/register" style={styles.link}>
              Registrarse
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
    flex: 1,
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  header: {
    marginBottom: theme.spacing.xl,
    alignItems: 'center',
  },
  title: {
    fontSize: theme.textSizes.xl,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.textSizes.md,
    color: theme.colors.textMuted,
  },
  form: {
    width: '100%',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.spacing.lg,
  },
  footerText: {
    color: theme.colors.textMuted,
    fontSize: theme.textSizes.sm,
  },
  link: {
    color: theme.colors.primary,
    fontWeight: theme.font.semibold,
    fontSize: theme.textSizes.sm,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: theme.spacing.xl,
    objectFit: 'contain',
  }
});
