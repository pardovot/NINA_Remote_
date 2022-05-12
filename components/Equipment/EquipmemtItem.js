import { StyleSheet, Text, View, Button, Pressable, Switch } from 'react-native'
import React, { useState, useEffect } from 'react'

const EquipmentItem = ({handleScreenTabClick, ip, equipmentName, savedProperties, innerProperties, shortendName}) => {

  const [isConnected, setIsConnected] = useState(false);
  const [equipmentData, setEquipmentData] = useState({});

  const lowerCaseEquipmentName = equipmentName.toLowerCase();
  
  let fetchInterval;

  useEffect(() => {
    fetchEquipmentAPI();
      fetchInterval = setInterval(() => {
          fetchEquipmentAPI();
      }, 3000);
  }, []);

  const fetchEquipmentAPI = () => {
      if (ip) {
        fetch(`http://${ip}:1888/api/get/equipment?property=${lowerCaseEquipmentName}`)
        .then(response => response.json())
        .then(json => {
            setEquipmentData(json.Response);
            if (json.Response.Connected) {
                setIsConnected(true);
            } else {
                setIsConnected(false);
            }
        })
        .catch(err => {console.log(err); setIsConnected(false);});
      }
  }

  function PropertiesSet({property, value}) {
    return (
        <View style={styles.section}>
            <Text style={styles.property}>{property}:</Text>
            {isConnected && <Text style={styles.value}>{value}</Text>}
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

//   const getFetchJson = (address) => {
//       return new Promise((resolve, reject) => {
//           fetch(address)
//           .then(response => response.json())
//           .then(json => resolve(json))
//           .catch(error => reject(error))
//       });
//   }

  const handleSwitch = () => {
      if (isConnected) {
          disconnectEquipment();
        } else {
        connectEquipment();
      }
  }
    
  return (
      <Pressable style={styles.container} onLongPress={() => handleScreenTabClick()}>
        <View>
            <Switch style={styles.switch} value={isConnected} onValueChange={handleSwitch}/>
            <Text style={isConnected ? styles.connectedText : styles.disconnectedText} >{isConnected ? "Connected" : "Disconnected"}</Text>
        </View>
        <View style={styles.equipmentContainer}>
            {isConnected && savedProperties.map((item, key) => {
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
      </Pressable>
  )
}

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
    disconnectedText: {
        color: "red",
    },
    switch: {
        marginBottom: 5,
        marginLeft: 15,
    },
    property: {
        width: 120,
    },
});

export default EquipmentItem;