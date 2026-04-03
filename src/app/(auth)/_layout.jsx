import { useAuth } from '@/src/context/AuthContext';
import { Redirect, Slot } from "expo-router";

export default function AuthLayout() {
  const { session, loading } = useAuth()

  if (loading) return null

  if (session) return <Redirect href="/(tabs)/pacts" />
  return <Slot />
}