// counter.store.js
import React from 'react';
import { makeObservable, action, observable } from 'mobx';
import ReconnectingWebSocket from "react-native-reconnecting-websocket";
import { Alert } from 'react-native';

class GlobalStore {

    client = null;
    ip = '192.168.1.2';
    isSocketConnected = false;
    event = "init";
    base64Image = '';
    activeProfile = {};
    isTabHidden = false;
    cameraSettings = {};
    telescopeSettings = {};

    constructor() {
        makeObservable(this, {
            ip: observable,
            client: observable,
            isSocketConnected: observable,
            event: observable,
            base64Image: observable,
            activeProfile: observable,
            isTabHidden: observable,
            cameraSettings: observable,
            telescopeSettings: observable,
            setIP: action.bound,
            setEvent: action.bound,
            setIsSocketConnected: action.bound,
            initializeWebsocket: action.bound,
            setBase64Image: action.bound,
            setActiveProfile: action.bound,
            killWebsocket: action.bound,
            setTelescopeProperty: action.bound,
            handleScreenTabClick: action.bound,
        });
    }

    setTelescopeSettings(telescopeSettings) {
        this.telescopeSettings = telescopeSettings;
    }

    setCameraSettings(cameraSettings) {
        this.cameraSettings = cameraSettings;
    }

    setActiveProfile(activeProfile) {
        this.activeProfile = activeProfile;
        this.setTelescopeSettings(this.activeProfile.TelescopeSettings);
        this.setCameraSettings(this.activeProfile.CameraSettings);
    }

    setTelescopeProperty(property, newValue) {
        try {
            this.telescopeSettings[property] = newValue;
        } catch(error) {
            console.log(error);
        }
    }

    setBase64Image(base64URL) {
        this.createBase64URL(base64URL);
    }

    createBase64URL(base64URL) {
        this.base64Image = `data:image/png;base64,${base64URL}`;
    }

    setIP(newIP) {
        this.ip = newIP;
        if (this.client) {
            this.client.url = `ws://${this.ip}:1888/socket`;
        }
    }

    setIsSocketConnected(isSocketConnected) {
        this.isSocketConnected = isSocketConnected;
    }

    setEvent(newEvent) {
        this.event = newEvent;
    }

    setIsTabHidden() {
        this.isTabHidden = !this.isTabHidden;
    }

    handleScreenTabClick() {
        this.setIsTabHidden();
    }

    initializeWebsocket() {
        const reg = /^(([1-9]?\d|1\d\d|2[0-4]\d|25[0-5])(\.(?!$)|(?=$))){4}$/;
        if (reg.test(this.ip) && !this.isSocketConnected && this.client == null) {
            console.log("init");
            this.client = new ReconnectingWebSocket(`ws://${this.ip}:1888/socket`, null, {reconnectInterval: 3000});

            this.client.onopen = (e) => {
                console.log("onopen",e);
                this.setIsSocketConnected(true);
            };

            this.client.onmessage = (evt) => {
                console.log("onmessage",JSON.parse(evt.data));
                this.setEvent(JSON.parse(evt.data));
                const message = JSON.parse(evt.data).Response;
                switch(message) {
                    case "NINA-NEW-IMAGE":
                        this.fetchLastImage();
                        break;
                    default:
                        break;
                }
            };

            this.client.onclose = (e) => {
                console.log("onclose",e);
                this.setIsSocketConnected(false);
            };

            this.client.onerror = (e) => {
                console.log("onerror",e);
                this.setIsSocketConnected(false);
                if (e.message) {
                    this.killWebsocket();
                    Alert.alert("Error", "Couldn't connect to NINA, please make sure the server is ON and that the IP is correct.", null);
                }
            };
        }
    }

    killWebsocket() {
        this.client.onopen = null;
        this.client.onmessage = null;
        this.client.onerror = null;
        this.client.onclose = null;
        this.client = null;
    }

    fetchLastImage = () => {
        fetch(`http://${this.ip}:1888/api/get/equipment?property=image`)
        .then(response => response.json())
        .then(json => {
          const image = json.Result.Response;
          this.setBase64Image(image);
        })
        .catch(error => console.log(error));
    }

}

// Instantiate the counter store.
export const globalStore = new GlobalStore();
// Create a React Context with the counter store instance.
export const globalStoreContext = React.createContext(globalStore);
export const useGlobalStore = () => React.useContext(globalStoreContext);
