import { StyleSheet } from 'react-native';

import { View,Text,TouchableOpacity} from "react-native";


export default function HomeScreen() {

   const navigateToNewUser = () => {
        // navigation.navigate('NewUser');
        console.log("navigation")
    };
  return (
      <View style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 25 }}>Salones disponibles</Text>
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
