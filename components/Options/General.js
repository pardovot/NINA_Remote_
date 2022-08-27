import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import { useGlobalStore } from '../../mobx/GlobalStore';

export default function General({navigation}) {

  const { ip, activeProfile, fetchPost, fetchData } = useGlobalStore();
  const [profiles, setProfiles] = useState([]);
  const [profileNames, setProfileNames] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState('');
  
  const onSelect = async (selectedItem, index) => {
      const chosenProfile = profiles[index];
      const body = {
        "Device": "switch",
        "Action": chosenProfile.Id
      };
      const { response } = await fetchPost("profile", body);
      if (response.status == 200) setSelectedProfile(chosenProfile);
  }

  const buttonTextAfterSelection = (selectedItem, index) => {
    return selectedProfile.Name == selectedItem ? selectedItem : selectedProfile.Name;
  }

  useEffect(() => {
    const fetchProfiles = async() => {
        const { json } = await fetchData("profile?property=all");
        let profilesArr = [];
        json.Response.forEach((profile) => {
            profilesArr.push({"Name": profile.Name, "IsActive": profile.isActive, "Id": profile.Id});
            profileNames.push(profile.Name);
            if (profile.IsActive) setSelectedProfile(profile);
        });
        setProfiles(profilesArr);
    }

    fetchProfiles();

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
