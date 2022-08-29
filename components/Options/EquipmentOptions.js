import { StyleSheet, View, Switch } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useGlobalStore } from '../../mobx/GlobalStore';
import { observer } from 'mobx-react-lite';
import TextInput from '../DefaultTextInput';
import Text from '../DefaultText';

export default observer(function EquipmentOptions({navigation}) {

  const { cameraSettings, telescopeSettings, setTelescopeSettings, setTelescopeProperty } = useGlobalStore();
//   const cameraSettings = activeProfile.CameraSettings;
//   const telescopeSettings = activeProfile.TelescopeSettings;

  const handleTextChange = () => {

  }

  const handleSyncSwitch = () => {
    setTelescopeProperty("NoSync", !telescopeSettings.NoSync);
  }

  return (
    <View>
        <View style={{flexDirection:"row", alignItems:'center', margin: 10, borderColor: "red"}}>
            <Text text={"Pixel size:"}/>
            <TextInput additionalStyles={{paddingRight: 50, marginLeft: 10}} defaultValue={cameraSettings?.PixelSize?.toString()}></TextInput>
            <Text text={"Bit depth:"}/>
            <TextInput defaultValue={cameraSettings?.BitDepth?.toString()}></TextInput>
        </View>
        <View style={{flexDirection:"row", alignItems:'center', margin: 10}}>
            <Text text={"Telescope Name:"}/>
            <TextInput defaultValue={telescopeSettings?.Name?.toString()}></TextInput>
            <Text text={"Focal length:"}/>
            <TextInput defaultValue={telescopeSettings?.FocalLength?.toString()}></TextInput>
            <Text text={"Focal ratio:"}/>
            <TextInput defaultValue={telescopeSettings?.FocalRatio?.toString()}></TextInput>
            <Text text={"Settle time after slew:"}/>
            <TextInput defaultValue={telescopeSettings?.SettleTime?.toString() + "s"}></TextInput>
            <Text text={"Do not sync:"}/>
            <Switch trackColor={{false: 'grey'}} value={telescopeSettings?.NoSync} onValueChange={handleSyncSwitch}/>
        </View>
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
})
