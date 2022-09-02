import { StyleSheet, Text, View, TextInput, Switch } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useGlobalStore } from '../../mobx/GlobalStore';
import { observer } from 'mobx-react-lite';
import EquipmentOption from '../Equipment/EquipmentOption';

export default observer(function EquipmentOptions({navigation}) {
  
  const { cameraSettings, telescopeSettings } = useGlobalStore();

  return (
    <View style={styles.container}>
        <EquipmentOption setting={"Pixel Size:"} value={cameraSettings?.PixelSize?.toString()} defaultValue={cameraSettings?.PixelSize?.toString()} isSwitch={false} placeholder=' μm'/>
    <EquipmentOption setting={"Bit Depth:"} value={cameraSettings?.BitDepth?.toString()} defaultValue={cameraSettings?.BitDepth?.toString()}/>
        <EquipmentOption setting={"Telescope name:"} value={telescopeSettings?.Name?.toString()} defaultValue={telescopeSettings?.Name?.toString()}/>
        <EquipmentOption setting={"Focal length:"} value={telescopeSettings?.FocalLength?.toString()} defaultValue={telescopeSettings?.FocalLength?.toString()} isSwitch={false} placeholder=' mm'/>
        <EquipmentOption setting={"Settle time after slew:"} value={telescopeSettings?.SettleTime?.toString()} defaultValue={telescopeSettings?.SettleTime?.toString()} isSwitch={false} placeholder='s'/>
        <EquipmentOption setting={"Do not sync:"} value={telescopeSettings?.NoSync} defaultValue={telescopeSettings?.NoSync} isSwitch={true}/>
        
        {/* <Text>Pixel size:
            <TextInput placeholder='μm' defaultValue={cameraSettings?.PixelSize?.toString() + " μm"}>{cameraSettings?.PixelSize?.toString() + " μm"}</TextInput>
        </Text> */}
        {/* <View style={{flexDirection:"row", alignItems:'center', margin: 10, borderColor: "red"}}>
            <Text>Pixel size:</Text>
            <TextInput defaultValue={cameraSettings?.PixelSize?.toString()}></TextInput>
            <Text style={{marginRight: 10}}>Bit depth:</Text>
            <TextInput defaultValue={cameraSettings?.BitDepth?.toString()}></TextInput>
        </View>
        <View style={{flexDirection:"row", alignItems:'center', margin: 10}}>
            <Text>Telescope name:</Text>
            <TextInput defaultValue={telescopeSettings?.Name?.toString()}></TextInput>
            <Text style={{marginRight: 10}}>Focal length:</Text>
            <TextInput defaultValue={telescopeSettings?.FocalLength?.toString()}></TextInput>
            <Text style={{marginRight: 10}}>Focal ratio:</Text>
            <TextInput defaultValue={telescopeSettings?.FocalRatio?.toString()}></TextInput>
            <Text>Settle time after slew:</Text>
            <TextInput defaultValue={telescopeSettings?.SettleTime?.toString() + "s"}></TextInput>
            <Text style={{marginRight: 10}}>Do not sync:</Text>
            <Switch value={telescopeSettings?.NoSync} onValueChange={handleSyncSwitch}/>
        </View> */}
    </View>
  )
});

const styles = StyleSheet.create({
    camera: {
        flex: 1,
        margin: 10,
        flexDirection: "row"
    },
    telescope: {
        flex: 1,
        margin: 10,
    },
    filterWheel: {
        flex: 1,
        margin: 10,
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-around',
    }
})
