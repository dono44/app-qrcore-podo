import React, { useState, useEffect,Component} from 'react';
import {View , Text ,StyleSheet ,TouchableOpacity, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BarCodeScanner} from 'expo-barcode-scanner';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
import * as Updates from 'expo-updates';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', fontSize: 90 }}>
      <Text style={{ fontSize: 50 }}>BIENVENUE</Text>
  
       <TouchableOpacity onPress={() => navigation.navigate('QRCODE')} style={styles.button}>
        <Text style={styles.buttonText}>QRCODE</Text>
      </TouchableOpacity>
           <TouchableOpacity onPress={() => navigation.navigate('podometre')} style={styles.button}>
        <Text style={styles.buttonText}>podometre</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('about')} style={styles.button}>
        <Text style={styles.buttonText}>about</Text>
      </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.close("close")} style={styles.button}>
        <Text style={styles.buttonText}>fermer</Text>
      </TouchableOpacity>
    </View>
  );
}

function PodometreScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  
   <TouchableOpacity onPress={() => navigation.goBack("retour")} style={styles.button}>
        <Text style={styles.buttonText}>retour</Text>
      </TouchableOpacity>
    </View>
  );
}

function QRScreen(){
const [hasPermission, setHasPermission] = useState(null);
const [scanned, setScanned] = useState(false);

useEffect(() => {
  (async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  })();
          }, []);

    const handleBarCodeScanned = ({ type, data,  }) => {
       setScanned(true);
         alert(`${data} + ${type} +${Linking.openURL(data)} `);
         ///(fonctionel)//// alert(`${data}  ++  ${type}`)
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

function AboutScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
   <TouchableOpacity onPress={() => navigation.goBack("retour")} style={styles.button}>
        <Text style={styles.buttonText}>retour</Text>
      </TouchableOpacity>
         <TouchableOpacity onPress={() => navigation.close("fermer l'app")} style={styles.button}>
        <Text style={styles.buttonText}>fermer</Text>
      </TouchableOpacity>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HOME" component={HomeScreen} />
      <Stack.Screen name="QRCODE" component={QRScreen} />
      <Stack.Screen name="podometre" component={PodometreScreen} />
      <Stack.Screen name="about" component={AboutScreen} />
    </Stack.Navigator>
  );
}

export default function App()
 {  <QRScreen/>
  return (
    
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: "black",
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 50,
    color: 'red',
  }

});
