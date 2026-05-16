import { theme } from "@/src/constants/theme";
import { getBadgeColors } from "@/src/services/database/badgeColorsService";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import FlameBadge from "./FlameBadge";

const DAYS = [0, 3, 7, 15, 30, 60];

export default function FlameBadgeShowcase() {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getBadgeColors();
        setBadges(data.filter((badge) => badge.id_streak_colors !== 0) || []);
      } catch (e) {
        console.error("Error fetching badge colors:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => console.log(badges[0]), [badges]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView horizontal contentContainerStyle={styles.content}>
      {badges.map((badge, i) => (
        <View key={badge.id_streak_colors} style={styles.item}>
          <Text style={styles.days}>{DAYS[i] + " días" ?? "?"}</Text>
          <FlameBadge
            primary={badge.primary_color}
            secondary={badge.secondary_color}
            size={45}
            active={true}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  item: {
    alignItems: "center",
    gap: 4,
  },
  days: {
    fontSize: theme.textSizes.sm,
    fontWeight: theme.font.semibold.toString(),
    color: theme.colors.textPrimary,
  },
});
