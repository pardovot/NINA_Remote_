import React, { useState, useEffect } from 'react';
import { Image, View, Text, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Camera from './Camera';
import FilterWheel from './FilterWheel';
import Focuser from './Focuser';
import TopNav from '../TopNav';

const bottomTab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

// const TopNavigator = () => {
//   return (
//     <TopTab.Navigator >
//       <TopTab.Screen name="test" component={HomeScreen} />
//     </TopTab.Navigator>
//    );
// }

const Equipment = ({navigation, ip}) => {

  const [isTabHidden, setIsTabHidden] = useState(false);
  const [tabDisplay, setTabDisplay] = useState({ tabBarStyle: { position: 'absolute' }});

  const handleScreenTabClick = () => {
    console.log("Click");
    setIsTabHidden(!isTabHidden);
    if (isTabHidden) {
        setTabDisplay({ tabBarStyle: { position: 'absolute', display: 'none' }, tabBarIcon:() => <Icon size={ 20 } name={ 'cogs' } color={ 'red' }/>});
    } else {
        setTabDisplay({ tabBarStyle: { position: 'absolute'}, tabBarIcon:() => <Icon size={ 20 } name={ 'cogs' } color={ 'red' }/> });
    }
  }

  /*
    <Tab.Screen name="Camera" options={{headerShown: false, tabBarLabel: "", tabBarIcon: () => {return (
    <Image source={{uri: "https://www.freeiconspng.com/uploads/camera-icon-21.png"}} style={{width: 32, height: 32}}/>
  )}}} >
  tabBarLabel - display the name of the tab.
  */
  return (
    <bottomTab.Navigator screenOptions={ tabDisplay }> 
      <bottomTab.Screen name="Camera" options={{headerShown: false, tabBarIcon: () => {return (
        <Image source={ require("../../camera-shutter.png")} style={{width: 32, height: 32}}/>
        )}}} >
          {props => <Camera {...props} navigation={navigation} handleScreenTabClick={handleScreenTabClick} ip={ip} equipmentName={"Camera"}/>}
      </bottomTab.Screen>
      <bottomTab.Screen name="FilterWheel" options={{headerShown: false, tabBarIcon: () => {
        return <Image source={ require("../../FW.png")} style={{width: 18, height: 18}}/>
      }}} >
          {props => <FilterWheel {...props} navigation={navigation} handleScreenTabClick={handleScreenTabClick} ip={ip} equipmentName={"FilterWheel"}/>}
      </bottomTab.Screen>
      <bottomTab.Screen name="Focuser" options={{headerShown: false, tabBarIcon: () => {
        return <Image source={ require("../../Focus.png")} style={{width: 18, height: 18}}/>
      }}} >
          {props => <Focuser {...props} navigation={navigation} handleScreenTabClick={handleScreenTabClick} ip={ip} equipmentName={"Focuser"}/>}
      </bottomTab.Screen>
    </bottomTab.Navigator>
  );
}

export default Equipment;