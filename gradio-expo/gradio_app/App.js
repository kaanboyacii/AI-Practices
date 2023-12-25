import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import { StatusBar } from 'expo-status-bar';
import { Camera } from 'expo-camera';

export default function App() {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [microphonePermission, setMicrophonePermission] = useState(null);
  const [permissionMessage, setPermissionMessage] = useState('');

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(cameraStatus.status === 'granted');

      const microphoneStatus = await Camera.requestMicrophonePermissionsAsync();
      setMicrophonePermission(microphoneStatus.status === 'granted');
    })();
  }, []);

  const askForPermissions = async () => {
    const cameraStatus = await Camera.requestCameraPermissionsAsync();
    setCameraPermission(cameraStatus.status === 'granted');

    const microphoneStatus = await Camera.requestMicrophonePermissionsAsync();
    setMicrophonePermission(microphoneStatus.status === 'granted');

    updatePermissionMessage();
  };

  const updatePermissionMessage = () => {
    if (cameraPermission && microphonePermission) {
      setPermissionMessage('İzinler verildi');
    } else {
      setPermissionMessage('İzinler reddedildi');
    }
  };

  return (
    <View style={styles.container}>
      {cameraPermission === null || microphonePermission === null ? (
        <Text>İzin bekleniyor...</Text>
      ) : (
        <View style={{ flex: 1 }}>
          <WebView source={{ uri: 'https://imageomics-bioclip-demo.hf.space/--replicas/8mbcf/' }} style={{ flex: 1 }} />
          <Text>{permissionMessage}</Text>
          <Button title="İzinleri Kontrol Et" onPress={askForPermissions} />
          <StatusBar style="auto" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
