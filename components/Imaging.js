import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native'
import React from 'react'

export default function Imaging({navigation, ip}) {
  return (
    <View>
      <Text>Imaging</Text>
      <TouchableOpacity style={styles.MainMenuBtn}>
            <Button title="Main Menu" onPress={() => navigation.navigate("MainView")}/>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  MainMenuBtn: {
    position: "absolute",
    width: "15%",
    left: "5%",
  },
});
