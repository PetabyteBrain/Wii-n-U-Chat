/*Einstiegsseite*/

import { View, Text, StyleSheet, Alert } from "react-native";
import { useState, useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";  // Import
import { Stack, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import * as Font from "expo-font";
import AsyncStorage from '@react-native-async-storage/async-storage';

import JumboTextTitle from "../components/JumboTextTitle";
import AppButton from "../components/AppButton";
import NameField from "../components/NameField";

export default function HomeScreen() {
  const [username, setUsername] = useState("");
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isConnected, setIsConnected] = useState(true); // Track connection

  const router = useRouter();

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Merriweather: require("../assets/fonts/Merriweather/Merriweather-Italic-VariableFont_opsz,wdth,wght.ttf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  useEffect(() => {
    const checkUsername = async () => {
      const storedUsername = await AsyncStorage.getItem("username");
      if (storedUsername) {
        router.replace('/chat'); // use `replace` to avoid going back to this screen
      }
    };
  
    checkUsername();
  }, []);
  

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      if (!state.isConnected) {
        Alert.alert(
          "No Internetconnection",
          "Please connect to the Internet to use the App.",
          [{ text: "OK" }]
        );
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const handleSubmit = async () => {
    if (!isConnected) {
      Alert.alert("No Internetconnection", "Please connect to the internet to continue");
      return;
    }

    if (username.trim()) {
      try {
        await AsyncStorage.setItem('username', username.trim());
        router.push('/chat');  // Navigate to /chat
      } catch (error) {
        console.error("Error saving username:", error);
      }
    } else {
      alert("Please enter a username");
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LinearGradient
      colors={["#426B69", "#8BB174"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <JumboTextTitle>Wii & U Chat</JumboTextTitle>
      <NameField username={username} setUsername={setUsername} onSubmit={handleSubmit} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
