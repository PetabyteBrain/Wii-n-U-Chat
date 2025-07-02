import { View, Text, StyleSheet } from "react-native"

import JumboText from "../components/JumboText"
import AppButton from "../components/AppButton"
import { Link, Stack } from "expo-router"

export default function HomeScreen() {
    return (
       <View style={styles.container}>
            <Stack.Screen options={{ title: "Home" }} />
            <JumboText>Wii & U Chat</JumboText>
            <Link href="/second" asChild>
                <AppButton>Second</AppButton>
            </Link>
       </View>
    )
}
const styles = StyleSheet.create({
 container: {
 flex: 1,
 backgroundColor: "#fff",
 alignItems: "center",
 justifyContent: "center",
 },
})