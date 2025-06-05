import React, {useState, useEffect} from 'react'
import { View,Text,TextInput,TouchableOpacity,StyleSheet,Alert,Dimensions } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
// import { useUpdate } from '../../Context/updateScreenContext';


const USERS = [
    {name: 'Profesor', id: 1},
    {name: 'Profesor 2', id: 2},
    {name: 'Profesor 3', id: 3}
]

export default function NewDepartment() {
    // const {updateScreen,setUpdateScreen} = useUpdate()
    const [department, setDepartment] = useState({
        userId: 0,
        name: '',
        email: '',
        extension: '' 
    });
    
    const [loading,setLoading] = useState(true)
    const [users,setUsers] = useState([])
    
    async function fetchData(){
        try {
            setLoading(true)
              // const clientsResponse = await process(FIND,'clients')
    
            const responseUsers = USERS
            let mutatedUsers: any = []
            responseUsers.forEach(user => {
            let newUser = {
                label:user.name,
                value:user.id
            }
            mutatedUsers.push(newUser)
            });
            setUsers(mutatedUsers)
    
            setLoading(false)
        } catch(e){
            console.log(e)
        }
    }
        
    useEffect(()=>{
        fetchData()
    },[])
          
    // useEffect(()=>{
    //     if(updateScreen){
    //         fetchData()
    //         setUpdateScreen(false)
    //     }
    // },[updateScreen])


    const handleSubmit = () => {
        console.log(department)
        try {
            // const response = await process(SAVE,'orders',order)
            Alert.alert('Jefatura agregado exitosamente')
            } catch(e){
                console.log(e)
            }
    }
    return(
         <View style={{ flex: 1, padding: 20 }}>
            

            <Text style={{ fontSize: 25 }}>Registrar jefatura</Text>

            <Text style={styles.text}>Jefe de departamento</Text>
            <View style={styles.input}>
                <RNPickerSelect
                    onValueChange={(value) => setDepartment({...department,userId:value})}
                    items={users}
                    placeholder={{
                        label: '--Seleccione--',
                        value: null,
                        color: 'black',
                    }}
                />
           </View>

            <Text style={styles.text}>Nombre del departamento</Text>
            <TextInput
                value={department.name}
                style={styles.input}
                onChangeText={(text)=>setDepartment({...department,name:text})}
            />

            <Text style={styles.text}>Correo</Text>
            <TextInput
                value={department.email}
                keyboardType="numeric"
                placeholder="#"
                style={styles.input}
                onChangeText={(text)=>setDepartment({...department,email:text})}
            />

            <Text style={styles.text}>Extensión</Text>
            <TextInput
                value={department.extension}
                keyboardType="numeric"
                placeholder="#"
                style={styles.input}
                onChangeText={(text)=>setDepartment({...department,extension:text})}
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