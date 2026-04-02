import { theme } from "@/constants/theme";
import { FontAwesome5 } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function InvitationCard({
  invitation,
  type = "received",
  onReject = null,
  onAccept = null,
  onCancel = null,
}) {
  const { host, guest, habit_type, pact_days, pact_hours } = invitation;

  const isReceived = type === "received";
  const person = isReceived ? host : guest;
  const username = person?.username || "Usuario";
  const habitName = habit_type?.habit_name || "Hábito";

  const shortDays = {
    0: "Dom",
    1: "Lun",
    2: "Mar",
    3: "Mié",
    4: "Jue",
    5: "Vie",
    6: "Sáb",
  };

  const days = pact_days.map((day) => shortDays[day]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarInitial}>{username[0]?.toUpperCase()}</Text>
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.title}>
            {isReceived ? (
              <>
                <Text style={styles.highlight}>{username}</Text> te ha invitado
              </>
            ) : (
              <>
                Has invitado a <Text style={styles.highlight}>{username}</Text>
              </>
            )}
          </Text>
          <Text style={styles.subtitle}>Pacto: {habitName}</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <FontAwesome5
            name="calendar-alt"
            size={14}
            color={theme.colors.textMuted}
            style={styles.icon}
          />
          <Text style={styles.detailText}>
            {days && days.length > 0 ? days.join(", ") : "Días no definidos"}
          </Text>
        </View>

        {pact_hours > 0 && (
          <View style={styles.detailItem}>
            <FontAwesome5
              name="clock"
              size={14}
              color={theme.colors.textMuted}
              style={styles.icon}
            />
            <Text style={styles.detailText}>{pact_hours} horas</Text>
          </View>
        )}
      </View>

      <View style={styles.actionsContainer}>
        {isReceived ? (
          <>
            <Pressable
              style={({ pressed }) => [
                styles.rejectButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={onReject}
              accessibilityLabel="Rechazar invitación"
              accessibilityRole="button"
            >
              <Text style={styles.rejectButtonText}>Rechazar</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.acceptButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={onAccept}
              accessibilityLabel="Aceptar invitación"
              accessibilityRole="button"
            >
              <Text style={styles.acceptButtonText}>Aceptar</Text>
            </Pressable>
          </>
        ) : (
          <Pressable
            style={({ pressed }) => [
              styles.cancelButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={onCancel}
            accessibilityLabel="Cancelar invitación"
            accessibilityRole="button"
          >
            <Text style={styles.cancelButtonText}>Cancelar invitación</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#6c63ff22",
    borderWidth: 1.5,
    borderColor: "#6c63ff44",
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.md,
  },
  avatarInitial: {
    color: theme.colors.primary,
    fontSize: theme.textSizes.lg || 20,
    fontWeight: "700",
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: theme.textSizes.md,
  },
  highlight: {
    fontWeight: "700", // using bold literal to ensure it overrides
    color: theme.colors.primary,
  },
  subtitle: {
    color: theme.colors.textMuted,
    fontSize: theme.textSizes.sm,
    marginTop: 2,
  },
  detailsContainer: {
    backgroundColor: "#1e1e3a", // surface+
    borderRadius: theme.radius.md || 10,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 20,
    textAlign: "center",
  },
  detailText: {
    color: theme.colors.textMuted,
    fontSize: theme.textSizes.sm,
    marginLeft: theme.spacing.sm,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: theme.spacing.md,
  },
  acceptButton: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.md || 10,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  acceptButtonText: {
    color: theme.colors.background,
    fontSize: theme.textSizes.sm,
    fontWeight: "600",
  },
  rejectButton: {
    flex: 1,
    backgroundColor: "transparent",
    borderRadius: theme.radius.md || 10,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  rejectButtonText: {
    color: theme.colors.textPrimary, // better visibility since it's an action
    fontSize: theme.textSizes.sm,
    fontWeight: "600",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "transparent",
    borderRadius: theme.radius.md || 10,
    borderWidth: 1.5,
    borderColor: theme.colors.error || "#ff4444",
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    color: theme.colors.error || "#ff4444",
    fontSize: theme.textSizes.sm,
    fontWeight: "600",
  },
  buttonPressed: {
    opacity: 0.75,
  },
});

