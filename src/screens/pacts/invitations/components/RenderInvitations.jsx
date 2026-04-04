import { theme } from "@/src/constants/theme";
import InvitationCard from "@/src/screens/pacts/invitations/components/InvitationCard";
import { FlatList, Text } from "react-native";

export default function RenderInvitations({ invitations, type = "received" }) {
    return (
        <FlatList
            data={invitations}
            keyExtractor={(item) => item.id_pact.toString()}
            renderItem={({ item }) => (
                <InvitationCard
                    invitation={item}
                    type={type}
                />

            )}
            ListEmptyComponent={
                <Text style={{ color: theme.colors.textMuted, textAlign: "center", marginTop: 20 }}>
                    No tienes invitaciones recibidas
                </Text>
            }
        />
    )
}