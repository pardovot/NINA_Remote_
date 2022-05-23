import { StyleSheet, Text, View, TextInput, Switch } from 'react-native';
import React, { useState, useEffect } from 'react';

export default function EquipmentOptions({navigation, ip, activeProfile}) {
  

  const cameraSettings = activeProfile.CameraSettings;
  const telescopeSettings = activeProfile.TelescopeSettings;


  const handleTextChange = () => {

  }

  return (
    <View>
        <View style={{flexDirection:"row-reverse", alignItems:'center', margin: 10, borderColor: "red"}}>
            <Text>Pixel size:</Text>
            <TextInput defaultValue={cameraSettings?.PixelSize?.toString()}></TextInput>
            <Text style={{marginRight: 10}}>Bit depth:</Text>
            <TextInput defaultValue={cameraSettings?.BitDepth.toString()}></TextInput>
        </View>
        <View style={{flexDirection:"row-reverse", alignItems:'center', margin: 10}}>
            <Text>Telescope name:</Text>
            <TextInput defaultValue={telescopeSettings?.Name?.toString()}></TextInput>
            <Text style={{marginRight: 10}}>Focal length:</Text>
            <TextInput defaultValue={telescopeSettings?.FocalLength?.toString()}></TextInput>
            <Text style={{marginRight: 10}}>Focal ratio:</Text>
            <TextInput defaultValue={telescopeSettings?.FocalRatio?.toString()}></TextInput>
            <Text>Settle time after slew:</Text>
            <TextInput defaultValue={telescopeSettings?.SettleTime.toString() + "s"}></TextInput>
            <Text style={{marginRight: 10}}>Do not sync:</Text>
            <Switch value={telescopeSettings?.NoSync} onValueChange={(() => {telescopeSettings.NoSync = !telescopeSettings.NoSync})}/>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    camera: {
        flex: 1,
        margin: 10,
        flexDirection: "row-reverse"
    },
    telescope: {
        flex: 1,
        margin: 10,
    },
    filterWheel: {
        flex: 1,
        margin: 10,
    },
})
