import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import MainView from './components/MainView';
import Equipments from './components/Equipment/Equipments';
import Sequencer from './components/Sequencer';
import Imaging from './components/Imaging';
import OptionsView from './components/Options/OptionsView';
import LiveView from './components/LiveView';

SystemNavigationBar.immersive();

const Stack = createNativeStackNavigator();

const App = () => {

  const [ip, setIP] = useState('192.168.1.2');

  return (
    <NavigationContainer>
      <StatusBar hidden translucate/>
      <Stack.Navigator screenOptions={{ headerShown: false }} >
        <Stack.Screen name="MainView" >
          {props => <MainView {...props} ip={ip} setIP={setIP} />}
        </Stack.Screen>
        <Stack.Screen name="Equipments">
          {props => <Equipments {...props} ip={ip} />}
        </Stack.Screen>
        <Stack.Screen name="Sequencer">
          {props => <Sequencer {...props} ip={ip} />}
        </Stack.Screen>
        <Stack.Screen name="Imaging">
          {props => <Imaging {...props} ip={ip} />}
        </Stack.Screen>
        <Stack.Screen name="Options">
          {props => <OptionsView {...props} ip={ip} />}
        </Stack.Screen>
        <Stack.Screen name="LiveView">
          {props => <LiveView {...props} ip={ip} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
