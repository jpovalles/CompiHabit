import { theme } from "@/constants/theme";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Redirect, Tabs } from "expo-router";
import { useAuth } from "../../context/AuthContext";

export default function TabsLayout() {
  const { session, loading } = useAuth();

  if (loading) return null;

  if (!session) return <Redirect href="/(auth)/login" />;
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneContainerStyle: {
          backgroundColor: theme.colors.border,
        },
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopWidth: 0,
          height: 90,
          paddingBottom: theme.spacing.xs,
          paddingTop: theme.spacing.xs,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarLabelStyle: {
          fontSize: theme.textSizes.sm,
          fontWeight: theme.font.semibold,
        },
      }}
    >
      <Tabs.Screen
        name="pacts/index"
        options={{
          title: "Pactos",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="handshake-angle" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="achievements/index"
        options={{
          title: "Logros",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="trophy" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="user-large" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
