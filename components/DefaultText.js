import { StyleSheet, Text } from 'react-native';
import React from 'react';

export default function DefaultText({text}) {
  return (
      <Text style={styles.defaultText}>{text}</Text>
  )
}

const styles = StyleSheet.create({
    defaultText: {
        marginRight: 10,
    }
})