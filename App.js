import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import FirstConnect from './components/FirstConnect';
import Equipments from './components/Equipment/Equipments';

SystemNavigationBar.immersive();

const Stack = createNativeStackNavigator();

const App = () => {

  const [ip, setIP] = useState('192.168.1.2');

  return (
    <NavigationContainer>
      <StatusBar hidden translucate/>
      <Stack.Navigator screenOptions={{ headerShown: false }} >
        <Stack.Screen name="FirstConnect" >
          {props => <FirstConnect {...props} ip={ip} setIP={setIP} />}
        </Stack.Screen>
        <Stack.Screen name="Equipments">
          {props => <Equipments {...props} ip={ip} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
