import { Slot, usePathname } from "expo-router";
import { View, StyleSheet } from "react-native";
import JumboText from "../components/JumboText"; // globaler Header

export default function RootLayout() {
  const pathname = usePathname();

  // Nur auf HomeScreen (index.js) wird KEIN JumboText angezeigt
  const hideHeaderOnHome = pathname === "/" || pathname === "/index";

  return (
    <View style={styles.container}>
      {/* Nur anzeigen, wenn NICHT auf HomeScreen */}
      {!hideHeaderOnHome && (
        <View style={styles.header}>
          <JumboText>Wii & U Chat</JumboText>
        </View>
      )}

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
    paddingTop: 50, // z. B. für Statusbar
    paddingBottom: 10,
    backgroundColor: "rgba(66,107,105,255)",
    zIndex: 1,
  },
  content: {
    flex: 1,
  },
});
