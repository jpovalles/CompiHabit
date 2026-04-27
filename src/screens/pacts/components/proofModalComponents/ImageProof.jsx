import { theme } from "@/src/constants/theme";
import { FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function ImageProof({
  imageProof,
  setImageProof,
  title,
  subtitle,
  iconName,
  inputLabel,
}) {
  const loadGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permiso denegado",
        "Se necesita acceso a la galería para esta acción.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.7,
      base64: true,
    });

    if (!result.canceled) {
      setImageProof(result.assets[0]);
    }
  };
  return (
    <View style={styles.contentSection}>
      <Text style={styles.inputLabel}>{inputLabel}</Text>
      {imageProof ? (
        <View style={styles.imagePreviewContainer}>
          <Image
            source={{ uri: imageProof.uri }}
            style={styles.previewImage}
            resizeMode="cover"
          />
          <Pressable
            style={styles.discardButton}
            onPress={() => setImageProof(null)}
          >
            <FontAwesome5 name="trash" size={14} color="#ffffff" />
          </Pressable>
        </View>
      ) : (
        <Pressable style={styles.uploadPlaceholder} onPress={loadGallery}>
          <View style={styles.placeholderIconContainer}>
            <FontAwesome5
              name={iconName}
              size={32}
              color={theme.colors.primary}
            />
          </View>
          <Text style={styles.placeholderTitle}>{title}</Text>
          <Text style={styles.placeholderSubtitle}>{subtitle}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contentSection: {
    marginBottom: theme.spacing.lg,
  },
  inputLabel: {
    fontSize: theme.textSizes.md,
    color: theme.colors.textPrimary,
    fontWeight: theme.font.semibold.toString(),
    marginBottom: theme.spacing.sm,
  },
  uploadPlaceholder: {
    height: 200,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg || 14,
    backgroundColor: "#1e1e3a",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.lg,
  },
  placeholderIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#6c63ff22",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  placeholderTitle: {
    color: theme.colors.textPrimary,
    fontSize: theme.textSizes.md,
    fontWeight: theme.font.semibold.toString(),
    marginBottom: 4,
  },
  placeholderSubtitle: {
    color: theme.colors.textMuted,
    fontSize: theme.textSizes.sm,
    textAlign: "center",
  },
  imagePreviewContainer: {
    height: 200,
    borderRadius: theme.radius.lg || 14,
    overflow: "hidden",
    position: "relative",
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  discardButton: {
    position: "absolute",
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    backgroundColor: "rgba(0,0,0,0.6)",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
