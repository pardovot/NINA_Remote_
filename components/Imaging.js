import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Button, Switch } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useGlobalStore } from '../mobx/GlobalStore';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import { observer } from 'mobx-react-lite';

export default observer(function Imaging({navigation}) {

  const {  base64Image, autoRefreshImage, setAutoRefreshImage, fetchLastImage } = useGlobalStore();
  const defaultImage = require("../public/no-image.png");
  const [shouldButtonsShow, setShouldButtonsShow] = useState(true);
  const [buttonOpacity, setButtonOpcaity] = useState(1);

  // Zoom settings
  const defaultZoom = 1;
  const maximumOpacityZoom = 1.2;
  const maxZoom = 3;
  const minZoom = 0.98;
  const zoomStep = 3;

  useEffect(() => {
    (async() => {
      fetchLastImage();
    })();
  }, []);

  const zoomEndHandler = (event, gestureState, zoomableViewEventObject) => {
    const currentZoom = zoomableViewEventObject.zoomLevel;
    if (currentZoom > defaultZoom && currentZoom < maximumOpacityZoom) setButtonOpcaity(1 - (currentZoom % 1 * 7));
    if (currentZoom > maximumOpacityZoom && currentZoom < maxZoom || currentZoom == maxZoom) setButtonOpcaity(0);
    if (currentZoom == defaultZoom) setButtonOpcaity(1);
  }

  const handleRefreshToggle = () => {
    setAutoRefreshImage(!autoRefreshImage);
  }
  
  return (

    <View style={styles.container} onPress={() => console.log("LONG")}>
    <ReactNativeZoomableView
    maxZoom={maxZoom}
    initialZoom={defaultZoom}
    minZoom={minZoom}
    zoomStep={zoomStep}
    bindToBorders={true}
    onZoomAfter={zoomEndHandler}
    >
      <ImageBackground source={base64Image ? { uri: base64Image } : defaultImage } resizeMode="contain" style={styles.image} onPress={() => console.log("press")}>
      </ImageBackground>
    </ReactNativeZoomableView>
      {shouldButtonsShow && <View style={[styles.menuContainer, {opacity: buttonOpacity}]}>
        <View style={styles.menuView}>
          <TouchableOpacity style={styles.MainMenuBtn} >
            <Button title="Main Menu" onPress={() => navigation.navigate("MainView")}/>
          </TouchableOpacity>
          <Button title="REFRESH" onPress={fetchLastImage}/>
          <Text style={styles.autoRefreshText}>Auto Refresh:</Text>
          <Switch value={autoRefreshImage} onValueChange={handleRefreshToggle} style={styles.switchButton}/>
        </View>
      </View>}
  </View>
  )
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuContainer: {
    position: "absolute",
    right: "1%",
    width: 100,
  },
  menuView: {
      flex: 1,
      alignItems: "center",
      marginTop: 20,
  },
  MainMenuBtn: {
    marginBottom: 20,
  },
  image: {
    flex: 1,
  },
  autoRefreshText: {
    marginTop: 20,
  },
  switchButton: {
    textAlign: "center"
  },
});
