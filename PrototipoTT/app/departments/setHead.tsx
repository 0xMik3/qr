import React, {useState, useEffect} from 'react'
import { View,Text,TextInput,TouchableOpacity,StyleSheet,Alert,Dimensions } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { process, Operation } from '@/utils/api';
import { showAlert } from '@/utils/alerts';


type Department = {
  id: number;
  name: string;
};

type User = {
  id: number;
  firstName: string;
  lastName: string;
};


export default function NewDepartment() {
    // const {updateScreen,setUpdateScreen} = useUpdate()
    const [department, setDepartment] = useState({
        head_id: '',
        id: '',
    });
    
    const [loading, setLoading] = useState(false);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);
   
    const fetchDepartments = async () => {
        setLoading(true);
        setError(null);
        try {
           const response = await process(Operation.FIND, "department");
           if (response?.data) {
               setDepartments(response.data);
           } else {
               setError("No se recibieron datos de la API.");
           }
        } catch (e) {
           console.error(e);
           setError("Error al obtener los datos.");
        } finally {
            setLoading(false);
        }
    };

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
           const response = await process(Operation.FIND, "user");
           if (response?.data) {
               setUsers(response.data);
           } else {
               setError("No se recibieron datos de la API.");
           }
        } catch (e) {
           console.error(e);
           setError("Error al obtener los datos.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDepartments();
        fetchUsers();
    }, []);

    const handleSubmit = async () => {
        try {
           const response = await process(Operation.UPDATE, `department`, department, {id: department.id});
           if (response?.data) {
               return showAlert("Éxito", "Se actualizó correctamente el jefe de departamento.");
           } else {
               return showAlert("Error", "No se pudo actualizar el jefe.");
           }
        } catch (e) {
           console.error(e);
           return showAlert("Error", "Error al actualizar los datos.");
        }
    };

    return(
         <View style={{ flex: 1, padding: 20 }}>
            <Text style={styles.text}>Jefatura</Text>
            <View style={styles.input}>
                <RNPickerSelect
                    onValueChange={(value) => setDepartment({...department,id:value})}
                    items={departments.map((department) => ({
                        label: department.name,
                        value: department.id.toString(),
                        }))}
                    placeholder={{
                        label: '--Seleccione--',
                        value: null,
                        color: 'black',
                    }}
                />
           </View>

            <Text style={styles.text}>Jefe de Departamento</Text>
            <View style={styles.input}>
                <RNPickerSelect
                    onValueChange={(value) => setDepartment({...department, head_id:value})}
                    items={users.map((user) => ({
                        label: user.firstName + ' ' + user.lastName,
                        value: user.id.toString(),
                        }))}
                    placeholder={{
                        label: '--Seleccione--',
                        value: null,
                        color: 'black',
                    }}
                />
           </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={{ fontSize: 18, color: 'white' }}>Actualizar Jefe</Text>
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