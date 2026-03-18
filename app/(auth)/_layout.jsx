import { Redirect, Slot } from "expo-router";
import { useAuth } from '../../context/AuthContext';

export default function AuthLayout() {
  const { session, loading } = useAuth()

  if (loading) return null // o un splash screen

  if (session) return <Redirect href="/(tabs)/pacts" />
  return <Slot />
}