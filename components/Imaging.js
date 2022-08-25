import { StyleSheet, Text, View, TouchableOpacity, Image, Button, Switch } from 'react-native';
import React, { useState, useEffect } from 'react';
import FastImage from 'react-native-fast-image';
import { useGlobalStore } from '../mobx/GlobalStore';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import { observer } from 'mobx-react-lite';

export default observer(function Imaging({navigation}) {

  const { ip, base64Image, setBase64Image, autoRefreshImage, setAutoRefreshImage, fetchLastImage } = useGlobalStore();
  const defaultImage = require("../public/no-image.png");
  const [shouldButtonsShow, setShouldButtonsShow] = useState(true);
  const [buttonOpacity, setButtonOpcaity] = useState(1);

  useEffect(() => {
    fetchLastImage();
  }, [])

  const zoomEndHandler = (event, gestureState, zoomableViewEventObject) => {
    const currentZoom = zoomableViewEventObject.zoomLevel;
    if (currentZoom > 1 && currentZoom < 1.2) setButtonOpcaity(1 - (currentZoom % 1 * 7));
    if (currentZoom > 1.2 && currentZoom < 3 || currentZoom == 3) setButtonOpcaity(0);
    if (currentZoom == 1) setButtonOpcaity(1);
  }

  const handleRefreshToggle = () => {
    setAutoRefreshImage(!autoRefreshImage);
  }

  //navigation.navigate("MainView");
  
  return (
      <View style={{flex: 1}} onPress={() => console.log("LONG")}>
        <ReactNativeZoomableView
        maxZoom={3}
        initialZoom={1}
        minZoom={0.98}
        zoomStep={3}
        bindToBorders={true}
        onZoomAfter={zoomEndHandler}
        >
          <Image source={base64Image ? { uri: base64Image } : defaultImage } resizeMode="contain" style={styles.image} onPress={() => console.log("press")}>
          </Image>
        </ReactNativeZoomableView>
          {shouldButtonsShow && <View style={{position: "absolute", right: "1%", width: 100, opacity: buttonOpacity}}>
            <View style={{flex: 1, alignItems: "center", marginTop: 20}}>
              <TouchableOpacity style={styles.MainMenuBtn} >
                <Button title="Main Menu" onPress={() => navigation.navigate("MainView")}/>
              </TouchableOpacity>
              <Button title="REFRESH" onPress={fetchLastImage}/>
              <Text style={{marginTop: 20}}>Auto Refresh:</Text>
              <Switch value={autoRefreshImage} onValueChange={handleRefreshToggle} style={{textAlign: "center"}}/>
            </View>
          </View>}
      </View>
  )
});

const styles = StyleSheet.create({
  MainMenuBtn: {
    // position: "absolute",
    // width: "15%",
    // right: "5%",
    marginBottom: 20,
    // marginTop: 10,
  },
  image: {
    flex: 1,

  }
});
