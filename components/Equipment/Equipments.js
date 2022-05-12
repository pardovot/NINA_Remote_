import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Camera from './Camera';
import FilterWheel from './FilterWheel';
import Focuser from './Focuser';

const Tab = createBottomTabNavigator();

const Equipment = ({ip}) => {

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
      <Tab.Navigator screenOptions={ tabDisplay } navigationOptions> 
        <Tab.Screen name="Camera" options={{headerShown: false, tabBarIcon: () => {return (
          <Image source={ require("../../camera-shutter.png")} style={{width: 32, height: 32}}/>
        )}}} >
            {props => <Camera {...props} handleScreenTabClick={handleScreenTabClick} ip={ip} equipmentName={"Camera"}/>}
        </Tab.Screen>
        <Tab.Screen name="FilterWheel" options={{headerShown: false, tabBarIcon: () => {
          return <Image source={ require("../../FW.png")} style={{width: 18, height: 18}}/>
          }}} >
            {props => <FilterWheel {...props} handleScreenTabClick={handleScreenTabClick} ip={ip} equipmentName={"FilterWheel"}/>}
        </Tab.Screen>
        <Tab.Screen name="Focuser" options={{headerShown: false, tabBarIcon: () => {
          return <Image source={ require("../../Focus.png")} style={{width: 18, height: 18}}/>
        }}} >
            {props => <Focuser {...props} handleScreenTabClick={handleScreenTabClick} ip={ip} equipmentName={"Focuser"}/>}
        </Tab.Screen>
      </Tab.Navigator>
  );
}

export default Equipment;