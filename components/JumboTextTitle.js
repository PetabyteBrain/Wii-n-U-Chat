import { Text, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function JumboTextTitle({ children }) {
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
    paddingVertical: 50,
    alignSelf: "center",
    marginBottom: 100,
  },
  text: {
    fontFamily: "Merriweather",
    color: "#FFFFFF",
    fontSize: 40,
    fontWeight: "900",
    textAlign: "center",
  },
});
