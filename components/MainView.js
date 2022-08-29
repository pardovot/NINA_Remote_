import { StyleSheet, Text, View, TextInput, TouchableHighlight, Button, Alert, ImageBackground } from 'react-native';
import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useGlobalStore } from '../mobx/GlobalStore';

const FirstConnect = observer(({ navigation }) => {

    const { setIP, initializeWebsocket, isSocketConnected, client, killWebsocket } = useGlobalStore();

    const connectedText = isSocketConnected ? "Connected" : client ? "Attempting to connect...." : "Disconnected";
    const buttonTxt = isSocketConnected ? "Disconnect" : "Connect";
    const attemptToConnect = !isSocketConnected && client;

    const handleTextChange = (text) => {
        setIP(text);
    }

    const navigateTo = (screen) => {
        navigation.navigate(screen);
    }

    const handleConnectButton = () => {
        if (isSocketConnected) {
            client.close();
        } else {
            initializeWebsocket();
        }
    }

    useEffect(() => {
        if (!isSocketConnected) {
            navigateTo("MainView");
        }
    }, [isSocketConnected])

    return (
        <ImageBackground source={require('../public/background.jpg')} resizeMode="cover" imageStyle={{opacity: 1}} style={{ flex: 1, justifyContent: "center"}}>
        <View style={styles.mainContainer}>
            <Text style={[styles.connectText, isSocketConnected ? styles.connected : styles.notConnected]}>{connectedText}</Text>
            <View style={styles.innerContainer}>
                <Text style={styles.ipText}>IP Address:</Text>
                <TextInput placeholder='IP address' style={styles.textInput} onChangeText={handleTextChange} placeholderTextColor={"gray"} ></TextInput>
                <TouchableHighlight style={styles.connectBtn}>
                    <Button title={buttonTxt} onPress={handleConnectButton} color={ isSocketConnected ? "#f44336" : "#2196F3" } />
                </TouchableHighlight>
            </View>
            {attemptToConnect &&
                <TouchableHighlight style={styles.killWebsocket}>
                    <Button title="Kill Connection" onPress={killWebsocket} color={"#f44336"} />
                    </TouchableHighlight>
            }
            <View style={styles.menuContainer}>
                { isSocketConnected && <TouchableHighlight style={styles.menuBtn}>
                    <Button title="Equipment" color={"green"} onPress={() => navigateTo("Equipments")}/>    
                </TouchableHighlight>}
                { isSocketConnected && <TouchableHighlight style={styles.menuBtn}>
                    <Button title="Sequencer" color={"green"} onPress={() => navigateTo("Sequencer")}/>    
                </TouchableHighlight>}
                { isSocketConnected && <TouchableHighlight style={styles.menuBtn}>
                    <Button title="Imaging" color={"green"} onPress={() => navigateTo("Imaging")}/>    
                </TouchableHighlight>}
                { isSocketConnected && <TouchableHighlight style={styles.menuBtn}>
                    <Button title="Options" color={"green"} onPress={() => navigateTo("Options")}/>    
                </TouchableHighlight>}
                { isSocketConnected && <TouchableHighlight style={styles.menuBtn}>
                    <Button title="Live View" color={"green"} onPress={() => navigateTo("LiveView")}/>    
                </TouchableHighlight>}
            </View>
        </View>
        </ImageBackground>
    );
});

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: "center",
        opacity: 1,
        backgroundColor: "#12121280",
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
    killWebsocket: {
        marginTop: 20,
        width: 135,
        lineHeight: 800,
    },
    textInput: {
        backgroundColor: 'rgba(10,10,10,0.1)',
        width: 150,
        height: 50,
        textAlign: "center",
        color: "red",
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
