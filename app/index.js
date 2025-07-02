import { View, Text, StyleSheet } from "react-native"
import { useState } from "react"
import { Link, Stack } from "expo-router"
import { LinearGradient } from "expo-linear-gradient";

import JumboTextTitle from "../components/JumboTextTitle"
import AppButton from "../components/AppButton"
import NameField from "../components/NameField"

export default function HomeScreen() {
    const [username, setUsername] = useState("");

    const handleSubmit = () => {
        if (username.trim()) {
          // proceed with username
          console.log("Submitted username:", username);
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
        <Stack.Screen options={{ title: "Home" }} />
        <JumboTextTitle>Wii & U Chat</JumboTextTitle>
        <NameField username={username} setUsername={setUsername} onSubmit={handleSubmit} />
      </LinearGradient>
    )
}
const styles = StyleSheet.create({
 container: {
 flex: 1,
 backgroundColor: "#fff",
 alignItems: "center",
 justifyContent: "center",
 },
})