import { StyleSheet, Text, View, TextInput, TouchableHighlight, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import {Timeout} from '../utils/Timeout';

const FirstConnect = ({ navigation, ip, setIP }) => {
    const [connected, setConnected] = useState('Disconnected');
    const [isConnected, setIsConnected] = useState(false);
    const [buttonTxt, setButtonTxt] = useState('Connect');

    const handleConnect = () => {
    if (isConnected) {
        setConnected("Disconnected");
        setButtonTxt("Connect");
        setIsConnected(false);
    } else {
        const reg = /^(([1-9]?\d|1\d\d|2[0-4]\d|25[0-5])(\.(?!$)|(?=$))){4}$/;
        if (reg.test(ip)) {
            setConnected('Trying to connect...');
            fetch(`http://${ip}:1888/api`, {signal: Timeout(5).signal})
            .then((response) => {
                if (response.status == 200) {
                    setConnected('Connected');
                    setButtonTxt("Disconnect");
                    setIsConnected(true);
                }
            })
            .catch((error) => {
                Alert.alert("Error", "Couldn't connect to address, please try again.", [{text: "Ok"}]);
                setConnected("Disconnected");
                setButtonTxt("Connect");
                setIsConnected(false);
                console.log(error);
            });
        } else {
            Alert.alert("Error", "Invalid IP Address", [{text: "Ok"}]);
            console.log("Invalid IP Address");
        }
    }
    }

    const handleTextChange = (text) => {
        setIP(text);
    }

    const equipmentButton = () => {
        navigation.navigate('Equipments');
    }

    return (
        <View style={styles.mainContainer}>
            <Text style={[styles.connectText, isConnected ? styles.connected : styles.notConnected]}>{connected}</Text>
            <View style={styles.innerContainer}>
                <Text style={styles.ipText}>IP Address:</Text>
                <TextInput placeholder='IP address' style={styles.textInput} onChangeText={handleTextChange}></TextInput>
                <TouchableHighlight style={styles.connectBtn}>
                    <Button title={buttonTxt} onPress={() => handleConnect()} color={ isConnected ? "#2196F3" : "#f44336" } />
                </TouchableHighlight>
            </View>
            { isConnected && <TouchableHighlight style={styles.equipmentBtn} >
                <Button title="Equipment" color={"green"} onPress={() => equipmentButton()}/>    
            </TouchableHighlight>}
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: "center",
    },
    innerContainer: {
        flexDirection: "row-reverse",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 27,
        marginTop: 15,
    },
    ipText: {
        color: "#fff",
        fontSize: 20,
        paddingRight: 20
    },
    connectText: {
        fontSize: 20,
        textAlign: "center",
        marginTop: 40,
    },
    notConnected: {
        color: "red",
    },
    connected: {
        color: "green",
    },
    connectBtn: {
        marginRight: 25,
        width: 125,
    },
    textInput: {
        backgroundColor: 'rgba(10,10,10,0.1)',
        width: 150,
        height: 50,
        textAlign: "center",
    },
    equipmentBtn: {
        textAlign: 'center',
        marginTop: 170,
        width: 125,
        height: 200,
    }
});

export default FirstConnect;
