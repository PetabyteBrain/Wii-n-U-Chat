import { View, Text, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import * as Font from "expo-font";

import JumboText from "../../../components/JumboText";

export default function ChatScreen() {

    return (
        <LinearGradient
          colors={["#426B69", "#8BB174"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.container}
        >
          <Stack.Screen options={{ title: "Chat" }} />
          <JumboText>Wii & U Chat</JumboText>
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
