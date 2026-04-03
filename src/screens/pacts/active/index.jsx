import { View } from "react-native";
import PactCard from "@/src/screens/pacts/active/components/PactCard";


export default function ActivesPacts() {
    return (
        <View>
            <PactCard onRegister={() => console.log("Registrado!")} />
        </View>
    );
}