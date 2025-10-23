import React, {useState, useEffect} from 'react'
import { View,Text,TextInput,TouchableOpacity,StyleSheet,Alert,FlatList, Platform } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { process, Operation } from '@/utils/api';
import { showAlert } from '@/utils/alerts';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from "@expo/vector-icons/Ionicons";
import { Table, Row, Rows } from 'react-native-table-component';


type Classroom = {
  id: number;
  name: string;
};

type User = {
  id: number;
  firstName: string;
  lastName: string;
};

type Schedules = {
    id: number;
    start_time: string;
    end_time: string;
    day: string;
}

const DAYS = [
    {label: 'Lunes', value: 1},
    {label: 'Martes', value: 2},
    {label: 'Miercoles', value: 3},
    {label: 'Jueves', value: 4},
    {label: 'Viernes', value: 5},
    {label: 'Sabado', value: 6},
]


export default function NewDepartment() {
    // const {updateScreen,setUpdateScreen} = useUpdate()
    const [schedule, setSchedule] = useState({
        day: '',
        user_id: '',
        start_time: '',
        end_time: '',
        classroom_id: '',
    });
    
    const [loading, setLoading] = useState(false);
    const [classrooms, setClassrooms] = useState<Classroom[]>([]);
    const [schedulesC, setSchedulesC] = useState<Schedules[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [groupedSchedules, setGroupedSchedules] = useState<{ [day: number]: string[] }>({});

    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);

    const getDayLabel = (dayValue: number) => {
        const dayObj = DAYS.find(d => d.value === dayValue);
        return dayObj ? dayObj.label : 'Desconocido';
    };
   
    const fetchClassrooms = async () => {
        setLoading(true);
        setError(null);
        try {
           const response = await process(Operation.FIND, "classroom");
           if (response?.data) {
               setClassrooms(response.data);
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

    const getSchedulesForClassroom = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
           const response = await process(Operation.FIND, "class/by-classroom-id/"+id);
           if (response?.data) {
               setSchedulesC(response.data);
           } else {
               setError("No se recibieron datos de la API.");
           }
        } catch (e) {
           console.error(e);
           setError("Error al obtener los datos.");
        } finally {
            setLoading(false);
        }
    }

    const groupSchedulesByDay = (items: Schedules[]) => {
        return items.reduce<{ [day: number]: string[] }>((acc, item) => {
            const range = `${item.start_time} - ${item.end_time}`;
            const dayNum = parseInt(item.day);
            if (!acc[dayNum]) acc[dayNum] = [];
            acc[dayNum].push(range);
            return acc;
        }, {});
    };

    useEffect(() => {
        if (schedulesC.length > 0) {
            const grouped = groupSchedulesByDay(schedulesC);
            setGroupedSchedules(grouped);
        } else {
            setGroupedSchedules({});
        }
        fetchClassrooms();
        fetchUsers();
    }, [schedulesC]);

    const handleSubmit = async () => {
        try {
           const response = await process(Operation.SAVE, `class`, schedule);
           if (response?.data) {
                getSchedulesForClassroom(schedule.classroom_id)
                setSchedule({
                    user_id: schedule.user_id,
                    start_time: '',
                    end_time: '',
                    classroom_id: schedule.classroom_id,
                    day: schedule.day
                })
               return showAlert("Éxito", "Se creó clase correctamente.");
           } else {
               return showAlert("Error", "No se pudo crear clase.");
           }
        } catch (e) {
           console.error(e);
           return showAlert("Error", "Error al actualizar los datos.");
        }
    };

    const onChangeTime = (field: 'start_time' | 'end_time', date?: Date) => {
        if (!date) return;
        const formatted = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setSchedule((prev) => ({ ...prev, [field]: formatted }));
    };

    const flatGroupedSchedules = Object.keys(groupedSchedules).map(day => ({
        day: Number(day),
        times: groupedSchedules[Number(day)],
    }));

    const tableHead = ['Día', 'Inicio', 'Fin', 'Acción'];
    const tableData = schedulesC.map(item => [
        getDayLabel(parseInt(item.day)),
        item.start_time,
        item.end_time,
        'Eliminar'
    ]);

    const sortedSchedules = [...schedulesC].sort((a, b) => {
        if (parseInt(a.day) !== parseInt(b.day)) {
            return parseInt(a.day) - parseInt(b.day);
        }

        const [aHour, aMin] = a.start_time.split(':').map(Number);
        const [bHour, bMin] = b.start_time.split(':').map(Number);
        return aHour !== bHour ? aHour - bHour : aMin - bMin;
    });

    const handleDelete = async (id: number) => {
        try {
           const response = await process(Operation.DELETE, `class`, undefined, {id: id});
           if (response?.data) {
                getSchedulesForClassroom(schedule.classroom_id)
               return showAlert("Éxito", "Se eliminó clase correctamente.");
           } else {
               return showAlert("Error", "No se pudo eliminar clase.");
           }
        } catch (e) {
           console.error(e);
           return showAlert("Error", "Error al eliminar los datos.");
        }
    }
    return(
         <View style={{ flex: 1, padding: 20 }}>
            <Text style={styles.text}>Asignar a salón...</Text>
            <View style={styles.input}>
                <RNPickerSelect
                    onValueChange={(value) => {
                        getSchedulesForClassroom(value)
                        setSchedule({...schedule,classroom_id:value})
                    }}
                    items={classrooms.map((classroom) => ({
                        label: classroom.name,
                        value: classroom.id.toString(),
                        }))}
                    placeholder={{
                        label: '--Seleccione--',
                        value: null,
                        color: 'black',
                    }}
                />
           </View>

            <Text style={styles.text}>Asignar clase a...</Text>
            <View style={styles.input}>
                <RNPickerSelect
                    onValueChange={(value) => setSchedule({...schedule, user_id:value})}
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

           <Text style={styles.text}>Hora de inicio</Text>
            <TouchableOpacity
                style={styles.input}
                onPress={() => (Platform.OS === 'web' ? null : setShowStartPicker(true))}
                >
                {Platform.OS === 'web' ? (

                    <input
                    type="time"
                    value={schedule.start_time}
                    onChange={(e) => setSchedule({ ...schedule, start_time: e.target.value })}
                    style={{
                        height: '100%',
                        fontSize: 16,
                        width: '100%',
                        border: 'none',
                        backgroundColor: 'transparent',
                    }}
                    />
                ) : (
                    <Text>{schedule.start_time || 'Seleccionar hora'}</Text>
                )}
            </TouchableOpacity>

            {showStartPicker && (
            <DateTimePicker
                mode="time"
                value={new Date()}
                onChange={(e, date) => {
                setShowStartPicker(false);
                if (date) onChangeTime('start_time', date);
                    }}
                />
            )}


             <Text style={styles.text}>Hora de fin</Text>
            <TouchableOpacity
                style={styles.input}
                onPress={() => (Platform.OS === 'web' ? null : setShowStartPicker(true))}
                >
                {Platform.OS === 'web' ? (

                    <input
                    type="time"
                    value={schedule.end_time}
                    onChange={(e) => setSchedule({ ...schedule, end_time: e.target.value })}
                    style={{
                        height: '100%',
                        fontSize: 16,
                        width: '100%',
                        border: 'none',
                        backgroundColor: 'transparent',
                    }}
                    />
                ) : (
                    <Text>{schedule.end_time || 'Seleccionar hora'}</Text>
                )}
            </TouchableOpacity>

            {showStartPicker && (
            <DateTimePicker
                mode="time"
                value={new Date()}
                onChange={(e, date) => {
                setShowStartPicker(false);
                if (date) onChangeTime('end_time', date);
                    }}
                />
            )}


            <Text style={styles.text}>Día de la semana</Text>
            <View style={styles.input}>
                <RNPickerSelect
                    onValueChange={(value) => setSchedule({...schedule,day:value})}
                    items={DAYS}
                    placeholder={{
                        label: '--Seleccione--',
                        value: null,
                        color: 'black',
                    }}
                />
            </View>

            <Text style={styles.text}>Horario para el salón</Text>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#ccc' }}>
                <Row
                    data={tableHead}
                    style={{ backgroundColor: '#f0f0f0' }}
                    textStyle={{ textAlign: 'center', fontWeight: 'bold' }}
                />
                {sortedSchedules.map((item, index) => (
                    <Row
                    key={item.id}
                    data={[
                        getDayLabel(parseInt(item.day)),
                        item.start_time,
                        item.end_time,
                        <TouchableOpacity
                            onPress={() => handleDelete(item.id)}
                            style={{ alignItems: 'center', justifyContent: 'center' }}
                        >
                            <Ionicons name="trash-outline" size={24} color="#E53E3E" />
                        </TouchableOpacity>,
                    ]}
                    textStyle={{ textAlign: 'center' }}
                    />
                ))}
            </Table>

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
    card: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginVertical: 6,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 10,
    },
    time: {
        color: '#555',
        marginTop: 4,
    },
    empty: {
        textAlign: 'center',
        color: '#777',
        marginTop: 20,
    },
    name: {
        fontSize: 18,
        fontWeight: '500',
  },
});