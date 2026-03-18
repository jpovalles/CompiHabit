import { useAuth } from '@/context/AuthContext';
import { Link, useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AuthButton } from '../../components/AuthButton';
import { AuthInput } from '../../components/AuthInput';
import { error_msg } from '../../constants/error_msg';
import { theme } from '../../constants/theme';

export default function LoginScreen() {
  
  const { session, signIn } = useAuth()
  

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);
  const router = useRouter();

    const handleLogin = async () => {
    try {
      await signIn(email, password)
    } catch (error) {
    Alert.alert('Error', error_msg[error.message])
    }
  }

  

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
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            keyboardType="email-address"
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
    justifyContent: 'center',
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
    width: 160,
    height: 160,
    marginBottom: theme.spacing.xl,
    objectFit: 'contain',
  }
});
