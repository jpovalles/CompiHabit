import { AuthButton } from '@/components/AuthButton';
import { Text, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function pacts(){
    const {signOut} = useAuth()

    const handleLogout = async () => {
        try{
            await signOut()
        }catch(error){
            Alert.alert('Error', error.message)
        }
    }
    return(
        <View style={{flex:1, alignItems:'center'}}>
            <Text>
                Holaaaaaaaaaaaaaaaa
            </Text>
            <AuthButton label="Cerrar sesión" onPress={handleLogout}/>
        </View>
    )
}