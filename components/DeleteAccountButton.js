import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import * as Font from "expo-font";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeleteIcon from "../assets/delete.svg";

export default function DeleteAccountButton(){
    const router = useRouter();

    const onDelete = async () => {
        try {
          await AsyncStorage.removeItem("username");
          router.replace("/");
        } catch (error) {
          console.error("Error deleting username:", error);
        }
    };
    
    return (
        <TouchableOpacity onPress={onDelete} activeOpacity={0.8} style={{ marginTop: 70, borderRadius: 15, overflow: "hidden" }}>
          <LinearGradient
            colors={['rgba(130, 66, 66, 0.5)', 'rgba(130, 66, 66, 0.5)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Delete Account</Text>
            <DeleteIcon width={20} height={20} style={{ marginLeft: -10 }} />
          </LinearGradient>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    button: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 15,
    },
    buttonText: {
      fontFamily: "Merriweather",
      fontWeight: "300",  // matches normal weight
      fontSize: 15,
      lineHeight: 30,
      margin: 0,
      padding: 0,
      color: "white",
    },
});