import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

export default function NewUser() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
        <View style={styles.cameraContainer}>
            <Text style={styles.message}>We need your permission to show the camera</Text>
            <Button onPress={requestPermission} title="grant permission" />
        </View>
        );
    }
    function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 25 }}>Escanear QR</Text>
       
        <View style={styles.cameraContainer}>
            <CameraView style={styles.camera} facing={facing}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                        <Text style={styles.text}>Flip Camera</Text>
                    </TouchableOpacity>
                </View>
            </CameraView>
        </View>
        <Text style={{ fontSize: 25 }}>Datos</Text>
    </View>


    );
}

const styles = StyleSheet.create({
  cameraContainer: {
    justifyContent: 'center',  // Centra la cámara en la vista
    alignItems: 'center',      // Centra la cámara en el contenedor
    height: 250,               // Define una altura más pequeña para la cámara
    width: '100%',             // Mantiene el ancho completo
    marginTop: 20,             // Espaciado superior
  },
  camera: {
    height: '100%',           // Asegura que la cámara ocupe toda la altura disponible
    width: '90%',             // Mantiene el ancho de la cámara con un pequeño margen
    borderRadius: 10,         // Opcional: Bordes redondeados para la cámara
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginTop: 10,
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'black', // Puedes cambiar el color del botón si lo deseas
    borderRadius: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
});