import PactCard from "@/components/activePactCard/PactCard";
import CreatePactModal from "@/components/createPactModal/CreatePactModal";
import FAB from "@/components/FAB";
import RenderInvitations from "@/components/invitationsCards/RenderInvitations";
import { theme } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { getReceivedInvitations, getSentInvitations } from "@/services/pactService";
import { useCallback, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Pacts() {
  const [showCreate, setShowCreate] = useState(false);    // Control create pact modal visibility
  const [activeTab, setActiveTab] = useState(0);          // Control active tab
  const [invitationsTab, setInvitationsTab] = useState(0);  // Control invitations tab switch between sent and received
  const [loading, setLoading] = useState(false);

  const tabs = [
    { id: 0, label: "Activos" },
    { id: 1, label: "Invitaciones" },
    { id: 2, label: "Concluidos" },
  ];

  const invitationsTabs = [
    { id: 0, label: "Recibidas" },
    { id: 1, label: "Enviadas" },
  ];

  const { session } = useAuth();


  // Pending pacts logic
  const [invitations, setInvitations] = useState([]);

  const fetchInvitations = useCallback(async () => {
    if (!session?.user?.id) return;

    setLoading(true);
    try {
      const fetchFunction = invitationsTab === 0 ? getReceivedInvitations : getSentInvitations;
      const response = await fetchFunction(session.user.id);
      setInvitations(response || []);
    } catch (e) {
      Alert.alert("Error", e.message);
    } finally {
      setLoading(false);
    }
  }, [session?.user?.id, invitationsTab]);

  useEffect(() => {
    if (activeTab === 1) {
      fetchInvitations();
    }
  }, [activeTab, fetchInvitations]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {tabs.map((tab) => {
          return (
            <Pressable key={tab.id} onPress={() => setActiveTab(tab.id)}>
              <Text
                style={[
                  styles.tabButton,
                  activeTab === tab.id && styles.tabButtonSelected
                ]}
              >
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <View style={styles.content}>
        {activeTab === 0 && (<PactCard onRegister={() => console.log("Registrado!")} />)}

        {activeTab === 1 && (
          <View style={{ flex: 1 }}>
            {/* Sub-tabs buttons for invitations */}
            <View style={styles.subTabContainer}>
              {invitationsTabs.map((subTab) => (
                <Pressable
                  key={subTab.id}
                  onPress={() => setInvitationsTab(subTab.id)}
                  style={[
                    styles.subTabitem,
                    invitationsTab === subTab.id && styles.subTabItemSelected
                  ]}
                >
                  <Text style={[
                    styles.subTabText,
                    invitationsTab === subTab.id && styles.subTabTextSelected
                  ]}>
                    {subTab.label}
                  </Text>
                </Pressable>
              ))}
            </View>

            {loading ? (
              <Text style={styles.emptyText}>Cargando...</Text>
            ) : (
              <>
                {invitationsTab === 0 && <RenderInvitations invitations={invitations} type="received" />}
                {invitationsTab === 1 && <RenderInvitations invitations={invitations} type="sent" />}
              </>
            )}
          </View>
        )}

        {activeTab === 2 && (
          <Text style={styles.emptyText}>
            No tienes pactos concluidos
          </Text>
        )}
      </View>
      <FAB onPress={() => setShowCreate(true)} />
      <CreatePactModal
        visible={showCreate}
        onClose={() => setShowCreate(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.border
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    marginTop: theme.spacing.md,
    gap: theme.spacing.sm,
    width: "100%",
  },
  tabButton: {
    fontSize: theme.textSizes.md,
    fontWeight: theme.font.semibold,
    color: theme.colors.textMuted,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.sm,
    borderWidth: 2,
    borderColor: "transparent",
  },
  tabButtonSelected: {
    color: theme.colors.background,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
  },
  subTabContainer: {
    flexDirection: "row",
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.lg,
    padding: 4,
    marginBottom: theme.spacing.md,
  },
  subTabitem: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: theme.radius.lg,
  },
  subTabItemSelected: {
    backgroundColor: theme.colors.primary,
  },
  subTabText: {
    fontSize: theme.textSizes.sm,
    color: theme.colors.textMuted,
    fontWeight: theme.font.semibold,
  },
  subTabTextSelected: {
    fontSize: theme.textSizes.sm,
    color: theme.colors.textPrimary,
    fontWeight: theme.font.semibold,
  },
  emptyText: {
    color: theme.colors.textMuted,
    textAlign: "center",
    marginTop: 20,
    fontSize: theme.textSizes.sm,
  }
});
