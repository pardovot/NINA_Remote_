import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import General from './General';
import EquipmentOptions from './EquipmentOptions';
import Autofocus from './Autofocus';
import ImagingOptions from './ImagingOptions';
import { useGlobalStore } from '../../mobx/GlobalStore';

const Tab = createMaterialTopTabNavigator();

export default function OptionsView({navigation}) {

  const { setActiveProfile, fetchData } = useGlobalStore();

  useEffect(() => {
    const fetchActiveProfile = async() => {
      const { json } = await fetchData("profile?property=active");
      setActiveProfile(json.Response);
    }

    fetchActiveProfile();
  }, []);

  return (
    <Tab.Navigator>
      <Tab.Screen name="General" component={General}/>
      <Tab.Screen name="Equipment" component={EquipmentOptions}/>
      <Tab.Screen name="Autofocus" component={Autofocus}/>
      <Tab.Screen name="Imaging" component={ImagingOptions}/>
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  MainMenuBtn: {
    position: "absolute",
    width: "15%",
    left: "5%",
  },
});
