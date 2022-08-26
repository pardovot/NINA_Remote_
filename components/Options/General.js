import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import { useGlobalStore } from '../../mobx/GlobalStore';

export default function General({navigation}) {

  const { ip, activeProfile } = useGlobalStore();
  const [profiles, setProfiles] = useState([]);
  const [profileNames, setProfileNames] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState('');
  
  const onSelect = (selectedItem, index) => {
      const chosenProfile = profiles[index];
      fetch(`http://${ip}:1888/api/set/profile?property=switch&parameter=${chosenProfile.Id}`)
      .then(() => {setSelectedProfile(chosenProfile); console.log("ok")})
      .catch(error => console.log(error));
  }

  const buttonTextAfterSelection = (selectedItem, index) => {
    return selectedProfile.Name == selectedItem ? selectedItem : selectedProfile.Name;
  }

  useEffect(() => {
    fetch(`http://${ip}:1888/api/get/profile?property=all`)
    .then((response) => response.json())
    .then(json => {
        let profilesArr = [];
        json.Response.forEach((profile) => {
            profilesArr.push({"Name": profile.Name, "IsActive": profile.isActive, "Id": profile.Id});
            profileNames.push(profile.Name);
            if (profile.IsActive) setSelectedProfile(profile);
        });
        setProfiles(profilesArr);
    })
    .catch((error) => console.log(error));
  }, []);

  return (
      <View style={styles.container}>
          <TouchableOpacity style={styles.MainMenuBtn}>
              <Button title="Main Menu" onPress={() => navigation.navigate("MainView")}/>
          </TouchableOpacity>
          <Text style={styles.selectedProfile}>Selected Profile:</Text>
          <SelectDropdown
            data={profileNames}
            buttonTextStyle={styles.buttonTextStyle}
            selectedRowTextStyle={styles.selectedRowTextStyle}
            defaultValue={selectedProfile.Name}
            buttonStyle={styles.buttonStyle}
            disableAutoScroll={true}
            dropdownStyle={styles.dropdownStyle}
            onSelect={onSelect}
            buttonTextAfterSelection={buttonTextAfterSelection}
          />
      </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginTop: 7,
    },
    selectedProfile: {
        fontSize: 20,
    },
    MainMenuBtn: {
        position: "absolute",
        width: "15%",
        left: "5%",
        marginTop: "2%",
    },
    buttonTextStyle: {
        color: "#ff726f",
    },
    selectedRowTextStyle: {
        color: "#ff726f",
        fontWeight: "900",
    },
    buttonStyle: {
        marginTop: 5,
        width: 300,
    },
    dropdownStyle: {
        height: 237,
    },
})
