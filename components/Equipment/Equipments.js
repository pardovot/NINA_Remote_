import React, { useState, useEffect } from 'react';
import { Image, View, Text, Button, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Camera from './Camera';
import FilterWheel from './FilterWheel';
import Focuser from './Focuser';
import { observer } from 'mobx-react-lite';
import { useGlobalStore } from '../../mobx/GlobalStore';

const bottomTab = createBottomTabNavigator();

const Equipment = observer(({navigation}) => {

  const { isTabHidden } = useGlobalStore();

  const iconSize = 20;
  const iconName = "cogs";
  const iconColor = "red";

  const tabDisplay = isTabHidden ? 
  { tabBarStyle: styles.hidden, tabBarIcon:() => <Icon size={ iconSize } name={ iconName } color={ iconColor }/>} :
  { tabBarStyle: styles.shown, tabBarIcon:() => <Icon size={ iconSize } name={ iconName } color={ iconColor }/> }

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
        <Image source={ require("../../public/camera-shutter.png")} style={styles.tab}/>
        )}}} >
          {props => <Camera {...props} navigation={navigation} equipmentName={"Camera"}/>}
      </bottomTab.Screen>
      <bottomTab.Screen name="FilterWheel" options={{headerShown: false, tabBarIcon: () => {
        return <Image source={ require("../../public/FW.png")} style={styles.tab}/>
      }}} >
          {props => <FilterWheel {...props} navigation={navigation} equipmentName={"FilterWheel"}/>}
      </bottomTab.Screen>
      <bottomTab.Screen name="Focuser" options={{headerShown: false, tabBarIcon: () => {
        return <Image source={ require("../../public/Focus.png")} style={styles.tab}/>
      }}} >
          {props => <Focuser {...props} navigation={navigation} equipmentName={"Focuser"}/>}
      </bottomTab.Screen>
    </bottomTab.Navigator>
  );
});

export default Equipment;

const styles = StyleSheet.create({
  tab: {
    width: 32,
    height: 32,
    tintColor: "gray"
  },
  hidden: {
    position: 'absolute',
    display: 'none'
  },
  shown: {
    position: 'absolute'
  },
})
