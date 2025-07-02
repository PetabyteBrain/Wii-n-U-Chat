import { Text, TouchableOpacity, StyleSheet } from "react-native"

const styles = StyleSheet.create({
    button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 4,
    backgroundColor: "#222222",
    borderRadius: 50,
    marginBottom: 10,
    },
    text: {
    color: "#fff",
    fontWeight: "bold",
    },
   })
   

export default function AppButton({ onPress, children }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.text}>{children}</Text>
        </TouchableOpacity>
    )
}
