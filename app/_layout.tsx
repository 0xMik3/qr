import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  createStaticNavigation,
} from '@react-navigation/native';

import { useColorScheme } from '@/hooks/useColorScheme';





export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  } 

  return (
      <Drawer>
        <Drawer.Screen
          name="index" 
          options={{
            drawerLabel: 'Inicio',
            title: 'Inicio',
          }}
        />
        <Drawer.Screen
          name="users/takeAssistance" 
          options={{
            drawerLabel: 'Tomar asistencia',
            title: 'Tomar Asistencia',
          }}
        />
        <Drawer.Screen
          name="users/index" 
          options={{
            drawerLabel: 'Registrar Usuario',
            title: 'Registrar Usuario',
          }}
        />
        <Drawer.Screen
          name="departments/index" 
          options={{
            drawerLabel: 'Registrar Jefatura',
            title: 'Registrar Jefatura',
          }}
        />
        <Drawer.Screen
          name="classrooms/index" 
          options={{
            drawerLabel: 'Registrar Aula',
            title: 'Registrar Aula',
          }}
        />
    
      </Drawer>
     );
}

    //  <GestureHandlerRootView style={{ flex: 1 }}>
    //   <Drawer>
    //     <Drawer.Screen
    //       name="index" // This is the name of the page and must match the url from root
    //       options={{
    //         drawerLabel: 'Home',
    //         title: 'overview',
    //       }}
    //     />
    //     <Drawer.Screen
    //       name="explore" // This is the name of the page and must match the url from root
          
    //       options={{
    //         drawerLabel: 'Explore',
    //         title: 'overview',
    //       }}
    //     />
    //   </Drawer>
    // </GestureHandlerRootView>
 