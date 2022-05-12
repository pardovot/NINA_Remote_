import React from 'react';
import { SafeAreaView, Text, StatusBar, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import FirstConnect from './components/FirstConnect';

SystemNavigationBar.immersive();

const { Navigator, Screen } = createStackNavigator();

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden translucent />
      <NavigationContainer>
        <Navigator initialRouteName="FirstConnect">
          <Screen
            options={{ headerShown: false }}
            name="Connect"
            component={FirstConnect}></Screen>
        </Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default App;
