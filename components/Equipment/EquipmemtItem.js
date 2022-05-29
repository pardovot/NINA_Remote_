import { StyleSheet, Text, View, Button, Pressable, Switch, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite';
import { useGlobalStore } from '../../mobx/GlobalStore';

const EquipmentItem = observer(({navigation, equipmentName, savedProperties, innerProperties, shortendName}) => {

  const { ip, handleScreenTabClick } = useGlobalStore();
  const [isItemConnected, setIsItemConnected] = useState(false);
  const [equipmentData, setEquipmentData] = useState({});

  const lowerCaseEquipmentName = equipmentName.toLowerCase();

  let fetchInterval;

  useEffect(() => {
    fetchEquipmentAPI();
      fetchInterval = setInterval(() => {
          fetchEquipmentAPI();
      }, 3000);
    return () => {
        clearInterval(fetchInterval);
    }
  }, []);

  const fetchEquipmentAPI = () => {
      if (ip) {
        fetch(`http://${ip}:1888/api/get/equipment?property=${lowerCaseEquipmentName}`)
        .then(response => response.json())
        .then(json => {
            setEquipmentData(json.Response);
            if (json.Response.Connected) {
                setIsItemConnected(true);
            } else {
                setIsItemConnected(false);
            }
        })
        .catch(err => {console.log(err); setIsItemConnected(false);});
      }
  }

  function PropertiesSet({property, value}) {
    if (property == "Temperature") value = Number(value).toFixed(2).toString();
    return (
        <View style={styles.section}>
            <Text style={styles.property}>{property}:</Text>
            {isItemConnected && <Text style={styles.value}>{value}</Text>}
        </View>
    )
  }

  const connectEquipment = () => {
    fetch(`http://${ip}:1888/api/set/equipment?property=${lowerCaseEquipmentName}&parameter=connect`);
    setTimeout(() => {
        fetchEquipmentAPI();
    }, 500);
  }

  const disconnectEquipment = () => {
    fetch(`http://${ip}:1888/api/set/equipment?property=${lowerCaseEquipmentName}&parameter=disconnect`);
    setTimeout(() => {
        fetchEquipmentAPI();
    }, 500);
  }

  const handleSwitch = () => {
      if (isItemConnected) {
          disconnectEquipment();
        } else {
        connectEquipment();
      }
  }

  return (
      <Pressable style={styles.container} onLongPress={handleScreenTabClick}>
        <View>
            <Switch style={styles.switch} value={isItemConnected} onValueChange={handleSwitch}/>
            <Text style={isItemConnected ? styles.connectedText : styles.disItemConnectedText} >{isItemConnected ? "Connected" : "Disconnected"}</Text>
        </View>
        <View style={styles.equipmentContainer}>
            {isItemConnected && savedProperties.map((item, key) => {
                const obj = equipmentData[item];
                if (obj && typeof obj == "object") {
                    return innerProperties.map((innerItem, key) => {
                        return <PropertiesSet property={shortendName +" " +innerItem.replace("_","")} value={obj[innerItem]?.toString()} key={key}/>
                    })
                } else {
                    return <PropertiesSet property={item} value={equipmentData[item]?.toString()} key={key}/>
                }
            })}
        </View>
        <TouchableOpacity style={styles.MainMenuBtn}>
            <Button title="Main Menu" onPress={() => navigation.navigate("MainView")}/>
        </TouchableOpacity>
      </Pressable>
  )
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row-reverse",
        marginTop: 30,
        marginLeft: 30,
    },
    equipmentContainer: {
        marginRight: 50,
        height: "60%",
    },
    section: {
        flex: 1,
        flexDirection: 'row-reverse',
        width: 200
    },
    connectedText: {
        color: "green",
    },
    disItemConnectedText: {
        color: "red",
    },
    switch: {
        marginBottom: 5,
        marginLeft: 15,
    },
    property: {
        width: 120,
    },
    MainMenuBtn: {
        position: "absolute",
        width: "15%",
        right: "5%",
    }
});

export default EquipmentItem;
