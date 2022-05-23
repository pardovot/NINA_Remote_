import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import FastImage from 'react-native-fast-image'

let interval;

export default function LiveView({navigation, ip}) {

  const [image, setImage] = useState('data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==');

  useEffect(() => {
    interval = setInterval(() => {
        fetch(`http://${ip}:1888/api/set/equipment?property=application&parameter=screenshot`)
        .then(response => response.json())
        .then(json => setImage("data:image/png;base64," +json.Response))
        .catch(error => console.log(error));
    }, 1000);
    return (() => {
        clearInterval(interval);
    });
  }, []);
   
  return (
    <FastImage
        source={{ uri: image, priority: FastImage.priority.high }}
        resizeMode={FastImage.resizeMode.contain}
        // resizeMode="contain"
        style={{ flex: 1, justifyContent: "center"}}>
    </FastImage>
  )
}

const styles = StyleSheet.create({})