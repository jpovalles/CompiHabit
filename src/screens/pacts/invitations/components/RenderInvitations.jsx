import { theme } from "@/src/constants/theme";
import { FlatList, Text } from "react-native";
import InvitationCard from "./InvitationCard";

export default function RenderInvitations({ invitations, type = "received" }) {
  return (
    <FlatList
      data={invitations}
      keyExtractor={(item) => item.id_pact.toString()}
      renderItem={({ item }) => (
        <InvitationCard invitation={item} type={type} />
      )}
      ListEmptyComponent={
        <Text
          style={{
            color: theme.colors.textMuted,
            textAlign: "center",
            marginTop: 20,
          }}
        >
          No tienes invitaciones recibidas
        </Text>
      }
    />
  );
}
