import FAB from "@/src/components/FAB";
import { theme } from "@/src/constants/theme";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ActivesPacts from "./active";
import CreatePactModal from "./components/createPactModal/CreatePactModal";
import NavigationPill from "./components/NavigationPill";
import ConcludedPacts from "./concluded";
import InvitationsPacts from "./invitations";


export default function Pacts() {
    const tabs = [
        { id: 0, label: "Activos" },
        { id: 1, label: "Invitaciones" },
        { id: 2, label: "Concluidos" },
    ];
    const [activeTab, setActiveTab] = useState(0);

    const [showCreate, setShowCreate] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                {tabs.map((tab) => {
                    return (
                        <NavigationPill key={tab.id} tab={tab} activeTab={activeTab} setActiveTab={setActiveTab} />
                    );
                })}
            </View>

            {activeTab === 0 && (<ActivesPacts />)}
            {activeTab === 1 && (<InvitationsPacts />)}
            {activeTab === 2 && (<ConcludedPacts />)}

            <FAB onPress={() => setShowCreate(true)} />
            <CreatePactModal
                visible={showCreate}
                onClose={() => setShowCreate(false)}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.border,
        paddingHorizontal: theme.spacing.lg,
    },
    header: {
        flexDirection: "row",
        alignItems: "flex-start",
        paddingVertical: theme.spacing.md,
        marginTop: theme.spacing.md,
        gap: theme.spacing.sm,
        width: "100%",
    },
});