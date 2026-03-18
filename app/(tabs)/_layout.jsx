import { Redirect, Tabs } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function TabsLayout() {
  const { session, loading } = useAuth()

  if (loading) return null // o un splash screen

  if (!session) return <Redirect href="/(auth)/login" />
  return (
    <Tabs>

      <Tabs.Screen name="pacts" options={{ title: "Pacts" }} />
    </Tabs>
  );
}