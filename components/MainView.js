import { StyleSheet, Text, View, TextInput, TouchableHighlight, Button, Alert, ImageBackground } from 'react-native';
import React, { useState, useEffect } from 'react';
import {Timeout} from '../utils/Timeout';

let interval;

const FirstConnect = ({ navigation, ip, setIP }) => {
    const [connected, setConnected] = useState('Disconnected');
    const [isConnected, setIsConnected] = useState(false);
    const [buttonTxt, setButtonTxt] = useState('Connect');


    useEffect(() => {
        keepConnectionAlive();
        return (() => {
            clearInterval(interval);
        });
    }, [])

    const handleConnect = () => {
        if (isConnected) {
            setConnected("Disconnected");
            setButtonTxt("Connect");
            setIsConnected(false);
            console.log("clear 1");
            console.log(interval);
            clearInterval(interval);
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
                        interval = setInterval(() => {
                            keepConnectionAlive();
                        }, 5000);
                        console.log(interval);
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

    const keepConnectionAlive = () => {
        console.log("KCA");
        console.log(ip);
        if (ip) {
            console.log("KCA2");
            fetch(`http://${ip}:1888/api`, {signal: Timeout(1).signal})
            .then((response) => {
                if (response.status == 200) {
                    setConnected('Connected');
                    setButtonTxt("Disconnect");
                    setIsConnected(true);
                }
            })
            .catch((error) => {
                setConnected("Disconnected");
                setButtonTxt("Connect");
                setIsConnected(false);
                console.log(error);
            });
        }
    }

    const handleTextChange = (text) => {
        setIP(text);
    }

    const navigateTo = (screen) => {
        navigation.navigate(screen);
    }

    return (
        <ImageBackground source={require('../background.jpg')} resizeMode="cover" imageStyle={{opacity: 0.3}} style={{ flex: 1, justifyContent: "center"}}>
        <View style={styles.mainContainer}>
            <Text style={[styles.connectText, isConnected ? styles.connected : styles.notConnected]}>{connected}</Text>
            <View style={styles.innerContainer}>
                <Text style={styles.ipText}>IP Address:</Text>
                <TextInput placeholder='IP address' style={styles.textInput} onChangeText={handleTextChange}></TextInput>
                <TouchableHighlight style={styles.connectBtn}>
                    <Button title={buttonTxt} onPress={() => handleConnect()} color={ isConnected ? "#2196F3" : "#f44336" } />
                </TouchableHighlight>
            </View>
            <View style={styles.menuContainer}>
                { isConnected && <TouchableHighlight style={styles.menuBtn}>
                    <Button title="Equipment" color={"green"} onPress={() => navigateTo("Equipments")}/>    
                </TouchableHighlight>}
                { isConnected && <TouchableHighlight style={styles.menuBtn}>
                    <Button title="Sequencer" color={"green"} onPress={() => navigateTo("Sequencer")}/>    
                </TouchableHighlight>}
                { isConnected && <TouchableHighlight style={styles.menuBtn}>
                    <Button title="Imaging" color={"green"} onPress={() => navigateTo("Imaging")}/>    
                </TouchableHighlight>}
                { isConnected && <TouchableHighlight style={styles.menuBtn}>
                    <Button title="Options" color={"green"} onPress={() => navigateTo("Options")}/>    
                </TouchableHighlight>}
                { isConnected && <TouchableHighlight style={styles.menuBtn}>
                    <Button title="Live View" color={"green"} onPress={() => navigateTo("LiveView")}/>    
                </TouchableHighlight>}
            </View>
        </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: "center",
        opacity: 1,
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
    },
    menuBtn: {
        textAlign: "center",
        width: 150,
        paddingLeft: 15,
        paddingRight: 15,
    },
    menuContainer: {
        flex: 1,
        flexDirection: "row-reverse",
        marginTop: 100,
    }
});

export default FirstConnect;
