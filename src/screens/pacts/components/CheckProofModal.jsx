import BorderButton from "@/src/components/BorderButton";
import PrimaryButton from "@/src/components/PrimaryButton";
import { STREAK_USER_STATE } from "@/src/constants/db_constants/streak";
import { theme } from "@/src/constants/theme";
import { getProof } from "@/src/logic/proofLogic";
import { updateUserStateStreak } from "@/src/logic/streaksLogic";
import { FontAwesome5 } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Modal, StyleSheet, Text, View } from "react-native";
import { usePactCard } from "../hooks/usePactCard";
import ImageProof from "./proofModalComponents/ImageProof";
import ProofModalHeader from "./proofModalComponents/ProofModalHeader";
import ReadingProof from "./proofModalComponents/ReadingProof";

export default function CheckProofModal({ isOpen, onClose, pact, streak, onRefresh }) {
    const [loading, setLoading] = useState(false);
    const [textProof, setTextProof] = useState("");
    const [imageProof, setImageProof] = useState(null);

    const { partner, user } = usePactCard(pact, streak);
    const partnerName = partner?.name;
    const habitType = pact.habit_name;

    const handleClose = () => {
        setTextProof("");
        setImageProof(null);
        setLoading(false);
        onRefresh();
        onClose();
    };
    const renderContent = () => {
        if (!textProof && !imageProof) return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
        if (habitType === "Lectura") {
            return (
                <ReadingProof
                    textProof={textProof}
                    setTextProof={setTextProof}
                    readOnly={true}
                />
            );
        }

        if (habitType === "Actividad física" || habitType === "Tiempo en pantalla") {
            return (
                <ImageProof
                    imageProof={imageProof}
                    setImageProof={setImageProof}
                    title="Evidencia de Actividad Física"
                    subtitle="Revisa la imagen que subió tu compañero"
                    iconName="image"
                    readOnly={true}
                />
            );
        }

        return null;
    }

    const loadProofData = async () => {
        const data = await getProof(streak.id_streak, partner.id);
        setTextProof(data.summary);
        setImageProof(data.media_url);
    };

    useEffect(() => {
        if (isOpen) {
            setLoading(true);
            loadProofData();
            setLoading(false);
        }
    }, [isOpen]);

    const handleAccept = async () => {
        const userToUpdate = user.isHost ? "guest" : "host";
        try {
            await updateUserStateStreak(streak.id_streak, userToUpdate, STREAK_USER_STATE.VALIDATED);
            Alert.alert("Éxito", "Demostración aceptada correctamente.");
            onRefresh();
            handleClose();
        } catch (error) {
            Alert.alert("Error", "No se pudo aceptar la demostración.");
        }

    }

    const handleReject = async () => {
        const userToUpdate = user.isHost ? "guest" : "host";
        try {
            await updateUserStateStreak(streak.id_streak, userToUpdate, STREAK_USER_STATE.NOT_SUBMITTED);
            Alert.alert("Éxito", "Demostración rechazada correctamente.");
            onRefresh();
            handleClose();
        } catch (error) {
            Alert.alert("Error", "No se pudo rechazar la demostración.");
        }

    }

    useEffect(() => {
        console.log(textProof);
        console.log(imageProof);
    }, [textProof, imageProof]);

    return (
        <Modal
            visible={isOpen}
            transparent={true}
            animationType="fade"
            onRequestClose={handleClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalCard}>
                    <ProofModalHeader
                        habitType={habitType}
                        onClose={handleClose}
                    />
                    <Text style={styles.partnerName}>
                        Prueba enviada por {partnerName}
                    </Text>
                    {renderContent()}

                    <View style={styles.warningContainer}>
                        <FontAwesome5
                            name="info-circle"
                            size={14}
                            color={theme.colors.textMuted}
                        />
                        <Text style={styles.warningText}>
                            Revisa la evidencia de tu compañero para validar su progreso. Si la rechazas, se le solicitará subir una nueva prueba
                        </Text>
                    </View>

                    <View style={styles.footer}>
                        <BorderButton onPress={handleReject} style={styles.actionButton} label="Rechazar" />
                        <PrimaryButton onPress={handleAccept} style={styles.actionButton} label="Aceptar" />
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.75)",
        justifyContent: "center",
        alignItems: "center",
        padding: theme.spacing.md,
    },
    modalCard: {
        width: "100%",
        maxWidth: 400,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radius.xl || 20,
        borderWidth: 1,
        borderColor: theme.colors.border,
        padding: theme.spacing.lg,
        elevation: 5,
    },
    warningContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        backgroundColor: "#ffffff05",
        padding: theme.spacing.sm,
        borderRadius: theme.radius.sm || 6,
        marginBottom: theme.spacing.xl,
        gap: theme.spacing.sm,
    },
    warningText: {
        flex: 1,
        color: theme.colors.textMuted,
        fontSize: theme.textSizes.sm,
        lineHeight: 18,
    },
    footer: {
        flexDirection: "row",
        gap: theme.spacing.sm,
    },
    actionButton: {
        flex: 1,
    },
    loadingContainer: {
        marginVertical: theme.spacing.xl,
    },
    partnerName: {
        fontSize: theme.textSizes.md,
        fontWeight: theme.font.bold,
        color: theme.colors.textPrimary,
        letterSpacing: -0.3,
        alignItems: "center",
    },
});