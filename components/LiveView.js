import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import FastImage from 'react-native-fast-image'
import { useGlobalStore } from '../mobx/GlobalStore';

let interval;

export default function LiveView({navigation}) {

  const [image, setImage] = useState('data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==');
  const { ip, fetchPost } = useGlobalStore();

  useEffect(() => {
    interval = setInterval(() => {
      const fetchScreenshot = async () => {
        const body = {
          "Device": "application",
          "Action": "screenshot"
        }
        const {json} = await fetchPost("equipment", body);
        setImage("data:image/png;base64," +json.Response);
      }

      fetchScreenshot();

    }, 100);
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