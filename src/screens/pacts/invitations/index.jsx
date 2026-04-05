import { theme } from "@/src/constants/theme";
import { useAuth } from "@/src/context/AuthContext";
import InvitationNav from "@/src/screens/pacts/invitations/components/InvitationsNav";
import RenderInvitations from "@/src/screens/pacts/invitations/components/RenderInvitations";
import {
  getReceivedInvitations,
  getSentInvitations,
} from "@/src/services/pactService";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import ConfirmModal from "./components/ConfirmModal";

export default function InvitationsPacts() {
  const [activeTab, setActiveTab] = useState(0);
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState({ title: "", subtitle: "" });
  const [selectedInvitation, setSelectedInvitation] = useState(null);

  const { session } = useAuth();

  const handleInvitationsFetching = async () => {
    if (!session?.user?.id) return;

    setLoading(true);
    try {
      const fetchFunction =
        activeTab === 0 ? getReceivedInvitations : getSentInvitations;
      const response = await fetchFunction(session.user.id);
      setInvitations(response || []);
    } catch (e) {
      Alert.alert("Error", e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleShowModal = (id, msg) => {
    setSelectedInvitation(id);
    setShowModal({ title: msg.title, subtitle: msg.subtitle });
    console.log("Selected invitation:", id);
  };

  const handleConfirmCancel = async () => {
    if (!selectedInvitation) return;

    // TODO: Call your delete API function here using selectedInvitation
    console.log("Canceling invitation with id:", selectedInvitation);

    setShowModal({ title: "", subtitle: "" });
    setSelectedInvitation(null);
    setInvitations(
      invitations.filter((inv) => inv.id_pact !== selectedInvitation),
    );
    //handleInvitationsFetching(); // Refresh the list
  };

  useEffect(() => {
    handleInvitationsFetching();
  }, [activeTab]);
  return (
    <View>
      <InvitationNav activeTab={activeTab} setActiveTab={setActiveTab} />
      {loading ? (
        <Text style={styles.emptyText}>Cargando...</Text>
      ) : (
        <>
          {activeTab === 0 && (
            <RenderInvitations
              invitations={invitations}
              type="received"
              handleShowModal={handleShowModal}
            />
          )}
          {activeTab === 1 && (
            <RenderInvitations
              invitations={invitations}
              type="sent"
              handleShowModal={handleShowModal}
            />
          )}
        </>
      )}

      <ConfirmModal
        visible={!!showModal.title}
        title={showModal.title}
        subtitle={showModal.subtitle}
        onCancel={() => {
          setShowModal({ title: "", subtitle: "" });
          setSelectedInvitation(null);
        }}
        onConfirm={handleConfirmCancel}
        color={theme.colors.error}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  emptyText: {
    color: theme.colors.textMuted,
    textAlign: "center",
    marginTop: 20,
    fontSize: theme.textSizes.sm,
  },
});
