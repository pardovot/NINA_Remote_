import { StyleSheet, Text, TextInput, Switch } from 'react-native';
import React from 'react';
import { useGlobalStore } from '../../mobx/GlobalStore';


export default function EquipmentOption({setting, value, defaultValue, isSwitch = false, placeholder = ""}) {
    const { cameraSettings, telescopeSettings, setTelescopeProperty } = useGlobalStore();

    const handleTextChange = () => {
  
  }
    
  const handleSyncSwitch = () => {
    setTelescopeProperty("NoSync", !telescopeSettings.NoSync);
  }

  return (
    <Text style={styles.text}>{setting + "\t\t"}
        {isSwitch ?
        <Switch style={styles.switch} value={value} onValueChange={handleSyncSwitch}/> :
        <TextInput style={styles.textInput} placeholder={placeholder} defaultValue={defaultValue}>{value + placeholder}</TextInput>}
    </Text>
  )



};


const styles = StyleSheet.create({
    text: {
    },
    textInput: {
    },
    switch: {
    }
});