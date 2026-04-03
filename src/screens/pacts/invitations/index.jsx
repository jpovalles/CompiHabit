import { getReceivedInvitations, getSentInvitations } from "@/src/services/pactService";
import { useAuth } from "@/src/context/AuthContext";
import { theme } from "@/src/constants/theme";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import InvitationNav from "@/src/screens/pacts/invitations/components/InvitationsNav";
import RenderInvitations from "@/src/screens/pacts/invitations/components/RenderInvitations";

export default function InvitationsPacts() {
    const [activeTab, setActiveTab] = useState(0);
    const [invitations, setInvitations] = useState([]);
    const [loading, setLoading] = useState(false);

    const { session } = useAuth();

    const handleInvitationsFetching = async () => {
        if (!session?.user?.id) return;

        setLoading(true);
        try {
            const fetchFunction = activeTab === 0 ? getReceivedInvitations : getSentInvitations;
            const response = await fetchFunction(session.user.id);
            setInvitations(response || []);
        } catch (e) {
            Alert.alert("Error", e.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        handleInvitationsFetching();
    }, [activeTab])
    return (
        <View>
            <InvitationNav activeTab={activeTab} setActiveTab={setActiveTab} />
            {loading ? (
                <Text style={styles.emptyText}>Cargando...</Text>
            ) : (
                <>
                    {activeTab === 0 && <RenderInvitations invitations={invitations} type="received" />}
                    {activeTab === 1 && <RenderInvitations invitations={invitations} type="sent" />}
                </>
            )}
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

