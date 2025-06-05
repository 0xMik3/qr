import React, {useState} from 'react'
import { View,Text,TextInput,TouchableOpacity,StyleSheet,Alert,Dimensions } from "react-native";
import RNPickerSelect from 'react-native-picker-select';


const CLASSROOMS = [
    {label: 'Aula', value: '01'},
    {label: 'Laboratorio', value: '02'},
]

export default function NewUser() {
    const [classroom, setClassroom] = useState({
        number: '',
        type: '',
        assignedTo: '',
        buildingNumber: '' 
    });
    
    const handleSubmit = () => {
        try {
            // const response = await process(SAVE,'orders',order)
            setClassroom({
                number: '',
                type: '',
                assignedTo: '',
                buildingNumber: '' 
                })
            Alert.alert('Aula agregada exitosamente')
            } catch(e){
                console.log(e)
            }
    }
    return(
         <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 25 }}>Registrar aula</Text>
            <Text style={styles.text}>Número de aula</Text>
            <TextInput
                value={classroom.number}
                style={styles.input}
                onChangeText={(text)=>setClassroom({...classroom,number:text})}
            />

            <Text style={styles.text}>Tipo de aula</Text>
            <View style={styles.input}>
                <RNPickerSelect
                    onValueChange={(value) => setClassroom({...classroom,type:value})}
                    items={CLASSROOMS}
                    placeholder={{
                        label: '--Seleccione--',
                        value: null,
                        color: 'black',
                    }}
                />
            </View>

            <Text style={styles.text}>Carrera asignada</Text>
            <TextInput
                value={classroom.assignedTo}
                keyboardType="numeric"
                placeholder="#"
                style={styles.input}
                onChangeText={(text)=>setClassroom({...classroom,assignedTo:text})}
            />
            <Text style={styles.text}>Número de edificio</Text>
            <TextInput
                value={classroom.buildingNumber}
                keyboardType="numeric"
                placeholder="#"
                style={styles.input}
                onChangeText={(text)=>setClassroom({...classroom,buildingNumber:text})}
            />
            

            
            
            

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