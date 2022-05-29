import { StyleSheet, Text, View, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import React, { useState, useEffect } from 'react';
import FastImage from 'react-native-fast-image';
import { useGlobalStore } from '../mobx/GlobalStore';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import { observer } from 'mobx-react-lite';

export default observer(function Imaging({navigation}) {

  const { ip, base64Image, setBase64Image } = useGlobalStore();
  const defaultImage = require("../public/no-image.png");

  useEffect(() => {
    fetchLastImage();
  }, [])


  const fetchLastImage = () => {
    fetch(`http://${ip}:1888/api/get/equipment?property=image`)
    .then(response => response.json())
    .then(json => {
      const image = json.Result.Response;
      if (image.split(" ").length == 1) setBase64Image(image);
    })
    .catch(error => console.log(error));
  }
  
  return (
    // <FastImage
    // source={base64Image ? { uri: base64Image, priority: FastImage.priority.high } : defaultImage }
    // resizeMode={FastImage.resizeMode.contain}
    // style={ base64Image ? { flex: 1} : { flex: 1, width: "30%", alignSelf: "center"}}
    // >
    // </FastImage>
    // <View>
    //   <Text>Imaging</Text>
    //   <TouchableOpacity style={styles.MainMenuBtn}>
    //         <Button title="Main Menu" onPress={() => navigation.navigate("MainView")}/>
    //     </TouchableOpacity>

    // </View>

    <ReactNativeZoomableView
    maxZoom={3}
    initialZoom={1}
    minZoom={0.98}
    zoomStep={3}
    bindToBorders={true}
    // onZoomAfter={logOutZoomState}
    // style={{padding: 10, backgroundColor: "red"}}
    >
      <ImageBackground source={base64Image ? { uri: base64Image, priority: FastImage.priority.high } : defaultImage } resizeMode="contain" style={styles.image} onPress={() => console.log("press")}>
      {/* <StatusBar hidden translucent /> */}
      </ImageBackground>
  </ReactNativeZoomableView>
  )
});

const styles = StyleSheet.create({
  MainMenuBtn: {
    position: "absolute",
    width: "15%",
    left: "5%",
  },
  image: {
    flex: 1,

  }
});
