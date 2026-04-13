import PactCard from "@/src/screens/pacts/active/components/PactCard";
import { View } from "react-native";


export default function ActivesPacts() {
    return (
        <View>
            <PactCard
                habit="Hacer ejercicio"
                streakDays={5}
                badgeLevel={5}
                daysRemaining={25}
                progressPercent={50}
                todayStatus="pending"
                onRegister={() => console.log("Registrado!")} />
        </View>
    );
}