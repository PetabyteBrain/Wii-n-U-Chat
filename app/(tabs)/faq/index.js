import { View, Text, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import * as Font from "expo-font";

import JumboText from "../../../components/JumboText";
import JumboTextsubTitle from "../../../components/JumboTextsubTitle";

export default function FaqScreen() {

    return (
        <LinearGradient
          colors={["#426B69", "#8BB174"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.container}
        >
          <Stack.Screen options={{ title: "Faq" }} />
          <JumboText>Wii & U Chat</JumboText>
          <JumboTextsubTitle>FAQ</JumboTextsubTitle>
          
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
