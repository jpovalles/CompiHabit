import { theme } from "@/src/constants/theme";
import { FlatList, Text } from "react-native";
import InvitationCard from "./InvitationCard";

export default function RenderInvitations({
  invitations,
  type = "received",
  handleShowModal,
}) {
  return (
    <FlatList
      data={invitations}
      keyExtractor={(item) => item.id_pact.toString()}
      renderItem={({ item }) => (
        <InvitationCard
          invitation={item}
          type={type}
          handleShowModal={handleShowModal}
        />
      )}
      ListEmptyComponent={
        <Text
          style={{
            color: theme.colors.textMuted,
            textAlign: "center",
            marginTop: 20,
          }}
        >
          No tienes invitaciones{" "}
          {type === "received" ? "recibidas" : "enviadas"}
        </Text>
      }
    />
  );
}
