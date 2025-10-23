import React, {useState, useEffect } from 'react'
import { View,Text,TextInput,TouchableOpacity,StyleSheet,Alert,Dimensions,FlatList, ActivityIndicator  } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { process, Operation } from '@/utils/api';
import { showAlert } from '@/utils/alerts';
import Ionicons from "@expo/vector-icons/Ionicons";


export default function NewUser() {
    const [password, setPassword] = useState({
        actual_password: '',
        new_password: '',
        confirmation_password: '',
    });

    const [hidePassword1, setHidePassword1] = useState(true);
    const [hidePassword2, setHidePassword2] = useState(true);
    const [hidePassword3, setHidePassword3] = useState(true);

    
    
    const handleSubmit = async () => {
        if (!password.actual_password) {
            return showAlert('Campo requerido', 'Por favor, ingresa la contraseña actual.');
        }
        if (!password.new_password) {
            return showAlert('Campo requerido', 'Por favor, ingresa la nueva contraseña.');
        }
        if (password.new_password.length < 6) {
            return showAlert('Contraseña invalida', 'La nueva contraseña debe ser mayor a 6 digitos.');
        }
        if (!password.confirmation_password) {
            return showAlert('Campo requerido', 'Por favor, confirma la nueva contraseña.');
        }

        if (password.confirmation_password !== password.new_password) {
           return showAlert('Contraseña inválida', 'Por favor, verifica la nueva contraseña.');
        }
        try {
            const response = await process(Operation.UPDATE, 'user',  password, {id: 1}, );
            if (response?.status === 200 || response?.status === 201) {
                setPassword({
                    actual_password: '',
                    new_password: '',
                    confirmation_password: '',
                });
                return showAlert('Éxito', 'Contraseña actualizada exitosamente.');
            } else {
                return showAlert('Error', 'El servidor no respondió correctamente.');
            }
        }catch(e){
            return showAlert('Error', 'No se pudo actualizar la contraseña.');
        }
    };
    
    return(
         <View style={{ flex: 1, padding: 20 }}>
            <Text style={styles.text}>Contraseña actual</Text>

            <View style={styles.passwordContainer}>
                <TextInput
                value={password.actual_password}
                onChangeText={(text) => setPassword({ ...password, actual_password: text })}
                style={[styles.input, { flex: 1 }]}
                placeholder="Contraseña Actual"
                secureTextEntry={hidePassword1}
                />
                <TouchableOpacity onPress={() => setHidePassword1(!hidePassword1)} style={styles.eyeButton}>
                <Ionicons name={hidePassword1 ? "eye-off" : "eye"} size={24} color="#000" />
                </TouchableOpacity>
            </View> 
            <Text style={styles.text}>Nueva contraseña</Text>
            <View style={styles.passwordContainer}>
                <TextInput
                value={password.new_password}
                onChangeText={(text) => setPassword({ ...password, new_password: text })}
                style={[styles.input, { flex: 1 }]}
                placeholder="Nueva Contraseña"
                secureTextEntry={hidePassword2}
                />
                <TouchableOpacity onPress={() => setHidePassword2(!hidePassword2)} style={styles.eyeButton}>
                <Ionicons name={hidePassword2 ? "eye-off" : "eye"} size={24} color="#000" />
                </TouchableOpacity>
            </View>

            <Text style={styles.text}>Confirmar nueva contraseña</Text>
            <View style={styles.passwordContainer}>
                <TextInput
                value={password.confirmation_password}
                onChangeText={(text) => setPassword({ ...password, confirmation_password: text })}
                style={[styles.input, { flex: 1 }]}
                placeholder="Confirmar Contraseña"
                secureTextEntry={hidePassword3}
                />
                <TouchableOpacity onPress={() => setHidePassword3(!hidePassword3)} style={styles.eyeButton}>
                <Ionicons name={hidePassword3? "eye-off" : "eye"} size={24} color="#000" />
                </TouchableOpacity>
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
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    eyeButton: {
        paddingHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
        height: 50,
    },
});