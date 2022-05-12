import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import FirstConnect from './components/FirstConnect';
import SystemNavigationBar from 'react-native-system-navigation-bar';
 
SystemNavigationBar.immersive();

const { Navigator, Screen } = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar hidden translucent/>
      <Navigator initialRouteName='FirstConnect'>
        <Screen options={{headerShown: false}} name="Connect" component={FirstConnect}></Screen>
      </Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: "center",
  },
});