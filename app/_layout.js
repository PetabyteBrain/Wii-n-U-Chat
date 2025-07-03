import { Slot } from "expo-router";
import { View, StyleSheet } from "react-native";
import JumboText from "../components/JumboText"; // Passe den Pfad an, falls nötig

export default function RootLayout() {
  return (
    <View style={styles.container}>
      {/* Globaler Header */}
      <View style={styles.header}>
        <JumboText>Wii & U Chat</JumboText>
      </View>

      {/* Rest der App */}
      <View style={styles.content}>
        <Slot />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 50, // Statusbar-Offset (optional)
    paddingBottom: 10,
    backgroundColor: "rgba(66,107,105,255)",
    zIndex: 1,
  },
  content: {
    flex: 1,
  },
});
