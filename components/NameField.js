import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
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
      <TouchableOpacity onPress={onSubmit} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Submit</Text>
        <SendArrow width={20} height={20} style={{ marginLeft: 6 }} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    maxWidth: 300,
    alignItems: "center",
    gap: 12, // (React Native does not support gap, so use margin)
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
    color: "#000000",
    backgroundColor: "rgba(66, 107, 105, 0.29)",
  },
  button: {
    marginTop: 12,
    backgroundColor: "#007BFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
