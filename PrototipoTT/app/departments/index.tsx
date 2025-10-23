import React, {useState, useEffect} from 'react'
import { View,Text,TextInput,TouchableOpacity,StyleSheet,Alert,Dimensions } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { showAlert } from '@/utils/alerts';
import { process, Operation } from '@/utils/api';


export default function NewDepartment() { 
    const [department, setDepartment] = useState({
        name: '',
    });
    
    const handleSubmit = async () => {
        const trimmedDepartment = { name: department.name.trim() };

        if (!trimmedDepartment.name) {
            return showAlert("Campo requerido", "Por favor, ingresa el nombre.");
        }

        try {
            const response = await process(Operation.SAVE, "department", trimmedDepartment);
            if (response?.status === 200 || response?.status === 201) {
                setDepartment({ name: "" });
                 return showAlert("Éxito", "Jefatura agregada exitosamente.");
            } else {
                 return showAlert("Error", "El servidor no respondió correctamente.");
            }
        } catch (e) {
             return showAlert("Error", "No se pudo agregar la jefatura.");
        }
    };

    return(
         <View style={{ flex: 1, padding: 20 }}>
            <Text style={styles.text}>Nombre de jefatura</Text>
            <TextInput
                value={department.name}
                style={styles.input}
                onChangeText={(text)=>setDepartment({...department,name:text})}
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={{ fontSize: 18, color: 'white' }}>Registrar Jefatura</Text>
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