import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, ImageBackground } from 'react-native';
import { BarCodeScanner ,scanFromURLAsync } from 'expo-barcode-scanner';
import * as Network from 'expo-network';
export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned , scanFromURLAsync] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data,   }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`) 
    await Network.getIpAddressAsync(data);
    
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'red',
  },
    BarCodeScanner:{
      width:'50%',
    }
  
  });
