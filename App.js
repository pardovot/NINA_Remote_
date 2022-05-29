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

const App = observer(() => {

  return (
    <NavigationContainer>
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
