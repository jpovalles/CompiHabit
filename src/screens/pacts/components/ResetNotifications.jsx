import { theme } from "@/src/constants/theme";
import { useAuth } from "@/src/context/AuthContext";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function ResetNotifications({
  notifications,
  onMarkAsSeen,
  onMarkAllAsSeen,
}) {
  const visible = notifications.length > 0;

  const { session } = useAuth();
  const userId = session?.user?.id;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Header */}
          <View style={styles.iconWrapper}>
            <FontAwesome5 name="heart-broken" size={32} color="#ff4d4d" />
          </View>
          <Text style={styles.title}>
            {notifications.length === 1
              ? "Una racha se reinició"
              : `${notifications.length} rachas se reiniciaron`}
          </Text>
          <Text style={styles.subtitle}>
            No se probaron los hábitos a tiempo. ¡Pueden volver a empezar!
          </Text>

          <FlatList
            data={notifications}
            keyExtractor={(item) => item.id_notification.toString()}
            style={styles.list}
            renderItem={({ item }) => (
              <View style={styles.notificationItem}>
                <View style={styles.notificationInfo}>
                  <FontAwesome5
                    name="fire"
                    size={16}
                    color={theme.colors.textMuted}
                  />
                  <Text style={styles.habitName}>{item.habit_name}</Text>
                  <Text style={styles.partnerName}>
                    con{" "}
                    {userId === item.id_host
                      ? item.guest_username
                      : item.host_username}
                  </Text>
                </View>
              </View>
            )}
          />
          <Pressable style={styles.button} onPress={onMarkAllAsSeen}>
            <Text style={styles.buttonText}>Entendido</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.lg,
  },
  modal: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.xl,
    width: "100%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  iconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255,77,77,0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: theme.textSizes.lg,
    fontWeight: theme.font.bold.toString(),
    color: theme.colors.textPrimary,
    textAlign: "center",
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.textSizes.sm,
    color: theme.colors.textMuted,
    textAlign: "center",
    marginBottom: theme.spacing.lg,
  },
  list: {
    width: "100%",
    marginBottom: theme.spacing.lg,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.sm,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  notificationInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  habitName: {
    fontSize: theme.textSizes.md,
    color: theme.colors.textPrimary,
  },
  dismissButton: {
    padding: theme.spacing.xs,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.md,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: theme.colors.background,
    fontSize: theme.textSizes.md,
    fontWeight: theme.font.semibold.toString(),
  },
  partnerName: {
    fontSize: theme.textSizes.md,
    fontWeight: theme.font.semibold.toString(),
    color: theme.colors.textMuted,
  },
});
