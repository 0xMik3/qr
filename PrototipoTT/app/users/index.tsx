import React, {useState, useEffect } from 'react'
import { View,Text,TextInput,TouchableOpacity,StyleSheet,Alert,Dimensions,FlatList, ActivityIndicator  } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { process, Operation } from '@/utils/api';
import { showAlert } from '@/utils/alerts';
import Ionicons from "@expo/vector-icons/Ionicons";


const USERS = [
    {label: 'Profesor', value: 4},
    {label: 'Prefecto', value: 2},
    {label: 'Admin', value: 1}
]

type Department = {
  id: number;
  name: string;
};

export default function NewUser() {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        password: '',
        email: '',
        type: '',
        department_id: ''
    });

    const [hidePassword, setHidePassword] = useState(true);
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<Department[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchItems = async () => {
        setLoading(true);
        setError(null);
        try {
        const response = await process(Operation.FIND, "department");
        if (response?.data) {
            setItems(response.data);
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
        fetchItems();
    }, []);


    
    
    const handleSubmit = async () => {
        const trimmedUser = {
            fistName: user.firstName.trim(),
            lastName: user.lastName.trim(),
            phone: user.phone.trim(),
            password: user.password.trim(),
            email: user.email.trim(),
            type: parseInt(user.type),
            department_id: parseInt(user.department_id)
        };

        if (!trimmedUser.fistName) {
            return showAlert('Campo requerido', 'Por favor, ingresa el nombre.');
        }
        if (!trimmedUser.lastName) {
            return showAlert('Campo requerido', 'Por favor, ingresa el apellido.');
        }
        if (!trimmedUser.phone) {
            return showAlert('Teléfono inválido', 'El teléfono debe contener 10 dígitos numéricos.');
        }

        if (!trimmedUser.email) {
           return showAlert('Correo inválido', 'Por favor, ingresa un correo electrónico válido.');
        }

        if (!trimmedUser.password || trimmedUser.password.length < 6) {
            return showAlert('Contraseña inválida', 'La contraseña debe tener al menos 6 caracteres.');
        }

        if (!trimmedUser.type) {
            return showAlert('Campo requerido', 'Selecciona el tipo de usuario.');
        }
        if (!trimmedUser.department_id) {
            return showAlert('Campo requerido', 'Selecciona la jefatura del usuario.');
        }

        try {
            const response = await process(Operation.SAVE, 'user', trimmedUser);
            if (response?.status === 200 || response?.status === 201) {
                setUser({
                    firstName: '',
                    lastName: '',
                    phone: '',
                    password: '',
                    email: '',
                    type: '',
                    department_id: ''
                });
                return showAlert('Éxito', 'Usuario agregado exitosamente.');
            } else {
                return showAlert('Error', 'El servidor no respondió correctamente.');
            }
        }catch(e){
            
            return showAlert('Error', 'No se pudo agregar el usuario.');
        }
    };
    
    return(
         <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 25 }}>Registrar usuario</Text>
            <Text style={styles.text}>Nombre</Text>
            <TextInput
                value={user.firstName}
                style={styles.input}
                onChangeText={(text)=>setUser({...user,firstName:text})}
            />
            <Text style={styles.text}>Apellido</Text>
            <TextInput
                value={user.lastName}
                style={styles.input}
                onChangeText={(text)=>setUser({...user,lastName:text})}
            />
            <Text style={styles.text}>Contraseña</Text>
            <View style={styles.passwordContainer}>
                <TextInput
                value={user.password}
                onChangeText={(text) => setUser({ ...user, password: text })}
                style={[styles.input, { flex: 1 }]}
                placeholder="Contraseña"
                secureTextEntry={hidePassword}
                />
                <TouchableOpacity onPress={() => setHidePassword(!hidePassword)} style={styles.eyeButton}>
                <Ionicons name={hidePassword ? "eye-off" : "eye"} size={24} color="#000" />
                </TouchableOpacity>
            </View>
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

            <Text style={styles.text}>Jefatura</Text>
            <View style={styles.input}>
                <RNPickerSelect
                    onValueChange={(value) => setUser({...user,department_id:value})}
                    items={items.map((item) => ({
                        label: item.name,
                        value: item.id.toString(),
                        }))}
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