import React, {useState, useEffect} from 'react'
import { View,Text,TextInput,TouchableOpacity,StyleSheet,Alert,Dimensions } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { process, Operation } from '@/utils/api';
import { showAlert } from '@/utils/alerts';

//import { Checkbox } from 'react-native-paper';


const CLASSROOMS = [
    {label: 'Aula', value: 2},
    {label: 'Laboratorio', value: 1},
    {label: 'No Aplica', value: 3}
]




export default function NewClassroom() {
        
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    


    const [classroom, setClassroom] = useState({
        name: '',
        type: '',
    });
    
    const handleSubmit = async () => {
            const trimmedClassroom = {
                name: classroom.name.trim(),
                type: parseInt(classroom.type)
            };
    
            if (!trimmedClassroom.name) {
                return showAlert('Campo requerido', 'Por favor, ingresa el nombre.');
            }
    
            try {
                const response = await process(Operation.SAVE, 'classroom', trimmedClassroom);
                if (response?.status === 200 || response?.status === 201) {
                    setClassroom({
                        name: '',
                        type: ''
                    });
                    return showAlert('Éxito', 'Aula agregada exitosamente.');
                } else {
                    return showAlert('Error', 'El servidor no respondió correctamente.');
                }
            }catch(e){
                
                return showAlert('Error', 'No se pudo agregar el aula.');
            }
        };

    return(
         <View style={{ flex: 1, padding: 20 }}>
            <Text style={styles.text}>Nombre de la carrera</Text>
            <TextInput
                value={classroom.name}
                style={styles.input}
                onChangeText={(text)=>setClassroom({...classroom,name:text})}
            />

            <Text style={styles.text}>Tipo de Aula</Text>
            <View style={styles.input}>
                <RNPickerSelect
                    onValueChange={(value) => setClassroom({...classroom, type:value})}
                    items={CLASSROOMS}
                    placeholder={{
                        label: '--Seleccione--',
                        value: null,
                        color: 'black',
                    }}
                />
           </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={{ fontSize: 18, color: 'white' }}>Registrar Aula</Text>
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