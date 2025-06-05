import React, {useState} from 'react'
import { View,Text,TextInput,TouchableOpacity,StyleSheet,Alert,Dimensions } from "react-native";
import RNPickerSelect from 'react-native-picker-select';


const USERS = [
    {label: 'Profesor', value: '01'},
    {label: 'Prefecto', value: '02'},
    {label: 'Admin', value: '03'}
]

export default function NewUser() {
    const [user, setUser] = useState({
        name: '',
        phone: '',
        email: '',
        type: '' 
    });
    
    const handleSubmit = () => {
        console.log(user)
        try {
            // const response = await process(SAVE,'orders',order)
            setUser({
                name:'',
                phone: '',
                email: '',
                type: '',
                })
            Alert.alert('Usuario agregado exitosamente')
            } catch(e){
                console.log("Error")
            }
    }
    return(
         <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 25 }}>Registrar usuario</Text>
            <Text style={styles.text}>Nombre del usuario</Text>
            <TextInput
                value={user.name}
                style={styles.input}
                onChangeText={(text)=>setUser({...user,name:text})}
            />
            <Text style={styles.text}>Teléfono</Text>
            <TextInput
                value={user.phone}
                keyboardType="numeric"
                placeholder="#"
                style={styles.input}
                onChangeText={(text)=>setUser({...user,phone:text})}
            />
            <Text style={styles.text}>Correo</Text>
            <TextInput
                value={user.email}
                keyboardType="numeric"
                placeholder="#"
                style={styles.input}
                onChangeText={(text)=>setUser({...user,email:text})}
            />
            <Text style={styles.text}>Tipo de usuario</Text>

            <View style={styles.input}>
                <RNPickerSelect
                    onValueChange={(value) => setUser({...user,type:value})}
                    items={USERS}
                    placeholder={{
                        label: '--Seleccione--',
                        value: null,
                        color: 'black',
                    }}
                />
           </View>
            
            

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={{ fontSize: 18, color: 'white' }}>Registrar Usuario</Text>
            </TouchableOpacity>
        </View>

        
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        marginTop: 10
    },
    input: {
        borderStyle: 'solid',
        borderRadius: 7,
        borderWidth: 1,
        fontSize: 15,
        height: 50,
        paddingStart: 10,
        marginTop: 10,
    },
    button: {
        height: 50,
        marginTop: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5188E3'
    },
});