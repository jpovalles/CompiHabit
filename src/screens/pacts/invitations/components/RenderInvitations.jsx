import { theme } from "@/src/constants/theme";
import { FlatList, Text } from "react-native";
import InvitationCard from "./InvitationCard";

export default function RenderInvitations({
  invitations,
  type = "received",
  handleShowModal,
  refreshInvitations,
}) {
  return (
    <FlatList
      data={invitations}
      keyExtractor={(item) => item.id_pact.toString()}
      contentContainerStyle={{ paddingBottom: 100 }}
      renderItem={({ item }) => (
        <InvitationCard
          invitation={item}
          type={type}
          handleShowModal={handleShowModal}
          refreshInvitations={refreshInvitations}
        />
      )}
      ListEmptyComponent={
        <Text
          style={{
            fontSize: theme.textSizes.md,
            color: theme.colors.textPrimary,
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
