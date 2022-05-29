import React, { useState, useEffect } from 'react';
import { Image, View, Text, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Camera from './Camera';
import FilterWheel from './FilterWheel';
import Focuser from './Focuser';
import { observer } from 'mobx-react-lite';
import { useGlobalStore } from '../../mobx/GlobalStore';

const bottomTab = createBottomTabNavigator();

const Equipment = observer(({navigation}) => {

  const { isTabHidden } = useGlobalStore();

  // const [isTabHidden, setIsTabHidden] = useState(false);
  // const [tabDisplay, setTabDisplay] = useState({ tabBarStyle: { position: 'absolute' }});

  const tabDisplay = isTabHidden ? 
  { tabBarStyle: { position: 'absolute', display: 'none' }, tabBarIcon:() => <Icon size={ 20 } name={ 'cogs' } color={ 'red' }/>} :
  { tabBarStyle: { position: 'absolute'}, tabBarIcon:() => <Icon size={ 20 } name={ 'cogs' } color={ 'red' }/> }

  // const handleScreenTabClick = () => {
  //   setIsTabHidden(!isTabHidden);
  // }

  /*
    <Tab.Screen name="Camera" options={{headerShown: false, tabBarLabel: "", tabBarIcon: () => {return (
    <Image source={{uri: "https://www.freeiconspng.com/uploads/camera-icon-21.png"}} style={{width: 32, height: 32}}/>
  )}}} >
  tabBarLabel - display the name of the tab.
  */
  return (
    <bottomTab.Navigator screenOptions={ tabDisplay }> 
      <bottomTab.Screen name="Camera" options={{headerShown: false, tabBarIcon: () => {return (
        <Image source={ require("../../public/camera-shutter.png")} style={{width: 32, height: 32, tintColor: "gray"}}/>
        )}}} >
          {props => <Camera {...props} navigation={navigation} equipmentName={"Camera"}/>}
      </bottomTab.Screen>
      <bottomTab.Screen name="FilterWheel" options={{headerShown: false, tabBarIcon: () => {
        return <Image source={ require("../../public/FW.png")} style={{width: 32, height: 32, tintColor: "gray"}}/>
      }}} >
          {props => <FilterWheel {...props} navigation={navigation} equipmentName={"FilterWheel"}/>}
      </bottomTab.Screen>
      <bottomTab.Screen name="Focuser" options={{headerShown: false, tabBarIcon: () => {
        return <Image source={ require("../../public/Focus.png")} style={{width: 32, height: 32, tintColor: "gray"}}/>
      }}} >
          {props => <Focuser {...props} navigation={navigation} equipmentName={"Focuser"}/>}
      </bottomTab.Screen>
    </bottomTab.Navigator>
  );
});

export default Equipment;