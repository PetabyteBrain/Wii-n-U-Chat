import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeleteIcon from "../assets/delete.svg";

export default function DeleteAccountButton() {
  const router = useRouter();

  const onDelete = async () => {
    try {
      await AsyncStorage.removeItem("username");
      router.replace("/"); // Navigate to home
    } catch (error) {
      console.error("Error deleting username:", error);
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete your local data (username)?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: onDelete,
        },
      ]
    );
  };

  return (
    <TouchableOpacity onPress={confirmDelete} activeOpacity={0.8} style={{ marginTop: 70, borderRadius: 15, overflow: "hidden" }}>
      <LinearGradient
        colors={['rgba(130, 66, 66, 0.5)', 'rgba(130, 66, 66, 0.5)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Delete data</Text>
        <DeleteIcon width={20} height={20} style={{ marginLeft: 0 }} />
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 15,
  },
  buttonText: {
    fontFamily: "Merriweather",
    fontWeight: "300",
    fontSize: 14,
    lineHeight: 14,
    margin: 0,
    paddingHorizontal: 10,
    color: "white",
  },
});
