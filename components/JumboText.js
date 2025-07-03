import { Text, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function JumboText({ children }) {
  return (
    <LinearGradient
      colors={["rgba(133,172,115,0.29)", "rgba(69,110,106,0.29)"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.gradient}
    >
      <Text style={styles.text}>{children}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: "center",
  },
  text: {
    fontFamily: "Merriweather",
    color: "#FFFFFF",
    fontSize: 40,
    fontWeight: "600",
    textAlign: "center",
  },
});
