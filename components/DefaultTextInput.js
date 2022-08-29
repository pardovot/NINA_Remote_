import { StyleSheet, TextInput } from 'react-native';
import React from 'react';

export default function DefaultTextInput({text, defaultValue, additionalStyles}) {
  return (
    <TextInput defaultValue={defaultValue} style={[additionalStyles, styles.textColor]}>{text}</TextInput>
  )
}

const styles = StyleSheet.create({
  textColor: {
    color: "gray",
    paddingRight: "6%",
    marginTop: 1,
  }
})