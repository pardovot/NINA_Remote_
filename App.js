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
import { observer } from 'mobx-react-lite';

SystemNavigationBar.immersive();

const Stack = createNativeStackNavigator();

const MyTheme = {
  colors: {
    background: "rgb(30, 30, 30)",
    border: "rgb(39, 39, 41)",
    card: "rgb(18, 18, 18)",
    notification: "rgb(255, 69, 58)",
    primary: "rgb(10, 132, 255)",
    text: "rgb(229, 229, 231)"
  },
  dark: true
}

const App = observer(() => {

  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar hidden translucate/>
      <Stack.Navigator screenOptions={{ headerShown: false }} >
        <Stack.Screen name="MainView" >
          {props => <MainView {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Equipments">
          {props => <Equipments {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Sequencer">
          {props => <Sequencer {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Imaging">
          {props => <Imaging {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Options">
          {props => <OptionsView {...props} />}
        </Stack.Screen>
        <Stack.Screen name="LiveView">
          {props => <LiveView {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
});

export default App;
