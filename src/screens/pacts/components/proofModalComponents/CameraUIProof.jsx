import { theme } from "@/src/constants/theme";
import { FontAwesome5 } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import PrimaryButton from "@/src/components/PrimaryButton";

export default function CameraUIProof({ imageProof, setImageProof, inputLabel }) {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.7,
      });
      setImageProof(photo.uri);
    }
  };

  return (
    <View style={styles.contentSection}>
      <Text style={styles.inputLabel}>{inputLabel}</Text>

      {imageProof ? (
        <View style={styles.imagePreviewContainer}>
          <Image source={{ uri: imageProof }} style={styles.previewImage} resizeMode="cover" />
          <Pressable style={styles.discardButton} onPress={() => setImageProof(null)}>
            <FontAwesome5 name="trash" size={14} color="#ffffff" />
          </Pressable>
        </View>
      ) : (
        <View style={styles.cameraWrapper}>
          {!permission ? (
            <View style={styles.permissionContainer} />
          ) : !permission.granted ? (
            <View style={styles.permissionContainer}>
              <Text style={styles.permissionText}>Se requiere acceso a la cámara</Text>
              <PrimaryButton 
                label="Otorgar permisos" 
                onPress={requestPermission} 
                style={{ marginTop: 10 }}
              />
            </View>
          ) : (
            <CameraView 
              style={styles.camera} 
              facing="back" 
              ref={cameraRef}
            >
              <View style={styles.cameraOverlay}>
                <Pressable style={styles.captureButton} onPress={takePicture}>
                  <View style={styles.captureButtonInner} />
                </Pressable>
              </View>
            </CameraView>
          )}
        </View>
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
  cameraWrapper: {
    height: 300,
    borderRadius: theme.radius.lg || 14,
    overflow: "hidden",
    backgroundColor: "#1e1e3a",
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.md,
  },
  permissionText: {
    color: theme.colors.textPrimary,
    fontSize: theme.textSizes.md,
    textAlign: "center",
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: theme.spacing.md,
  },
  captureButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButtonInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ffffff",
  },
  imagePreviewContainer: {
    height: 300,
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
