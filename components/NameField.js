import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import SendArrow from "../assets/send-arrow.svg";

export default function NameField({ username, setUsername, onSubmit }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter a Username to Start</Text>
      <TextInput
        placeholder="Username..."
        placeholderTextColor="#aaa"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      
      <TouchableOpacity onPress={onSubmit} activeOpacity={0.8} style={{ borderRadius: 15, overflow: "hidden" }}>
        <LinearGradient
          colors={['rgba(66, 109, 130, 0.29)', 'rgba(66, 109, 130, 0.29)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Submit</Text>
          <SendArrow width={20} height={20} style={{ marginLeft: 6 }} />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    maxWidth: 300,
    alignItems: "center",
  },
  label: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    borderRadius: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    color: "#ffffff",
    backgroundColor: "rgba(66, 107, 105, 0.29)",
    marginBottom: 15,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 15,  // keep the radius here consistent with overflow:hidden parent
  },
  buttonText: {
    fontFamily: "Merriweather",
    fontWeight: "400",  // matches normal weight
    fontSize: 24,
    lineHeight: 30,
    color: "white",
  },
});
