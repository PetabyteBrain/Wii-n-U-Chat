import { View, Text, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import * as Font from "expo-font";
import AsyncStorage from '@react-native-async-storage/async-storage';

import JumboText from "../../../components/JumboText";
import JumboTextsubTitle from "../../../components/JumboTextsubTitle";
import NameField from "../../../components/NameField";

export default function SettingsScreen() {
  const [username, setUsername] = useState("");
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Merriweather: require("../../../assets/fonts/Merriweather/Merriweather-Italic-VariableFont_opsz,wdth,wght.ttf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  const router = useRouter();

  const handleSubmit = async () => {
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
    return (
        <LinearGradient
          colors={["#426B69", "#8BB174"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.container}
        >
          <Stack.Screen options={{ title: "Settings" }} />
          <JumboTextsubTitle>Settings</JumboTextsubTitle>
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
