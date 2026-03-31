import PactCard from "@/components/activePactCard/PactCard";
import CreatePactModal from "@/components/createPactModal/CreatePactModal";
import FAB from "@/components/FAB";
import ReceivedInvitationCard from "@/components/invitationsCards/ReceivedInvitationCard";
import { theme } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { getReceivedInvitations } from "@/services/pactService";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Pacts() {
  const [showCreate, setShowCreate] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, label: "Activos" },
    { id: 1, label: "Pendientes" },
    { id: 2, label: "Concluidos" },
  ];

  const [pendingPacts, setPendingPacts] = useState([]);


  const { session } = useAuth();

  const fetchReceivedInvitations = async () => {
    try {
      const response = await getReceivedInvitations(session.user.id);
      setPendingPacts(response || []);
    } catch (e) {
      console.log(e.message)
    }
  }

  useEffect(() => {
    fetchReceivedInvitations();
  }, [activeTab])

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
      <View style={{ flex: 1, paddingHorizontal: theme.spacing.lg }}>
        {activeTab === 1 ? (
          <FlatList
            data={pendingPacts}
            keyExtractor={(item) => item.id_pact.toString()}
            renderItem={({ item }) => (
              <ReceivedInvitationCard
                invitation={item}
                onAccept={() => console.log("Aceptar", item.id_pact)}
                onReject={() => console.log("Rechazar", item.id_pact)}
              />
            )}
            contentContainerStyle={{ paddingVertical: theme.spacing.md }}
            ListEmptyComponent={
              <Text style={{ color: theme.colors.textMuted, textAlign: "center", marginTop: 20 }}>
                No tienes invitaciones pendientes
              </Text>
            }
          />
        ) : (
          <PactCard onRegister={() => console.log("Registrado!")} />
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
    backgroundColor: theme.colors.border,
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
    fontWeight: theme.font.semibold.toString(),
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

});
