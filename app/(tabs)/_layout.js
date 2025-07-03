import { Tabs } from "expo-router";
import { Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function HomeLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false, // 👈 Das hier hinzufügen
                tabBarStyle: {
                    backgroundColor: "rgb(66, 107, 105)",
                    height: 90,
                },
                tabBarStyle: {
                    backgroundColor: "rgb(96, 132, 108)",
                    height: 100, // etwas höher, damit genug Platz für alles bleibt
                },
                tabBarActiveTintColor: "#FFFFFF",
                tabBarInactiveTintColor: "rgba(255, 255, 255, 0.5)",
                tabBarIconStyle: {
                    marginBottom: 10,
                    padding: 0,
                },
                tabBarLabelStyle: {
                    fontSize: 18,
                    marginTop: 20, // Text weiter nach unten verschoben
                    /*fontFamily: "Merriweather",*/
                },
            }}
        >
            <Tabs.Screen
                name="settings/index"
                options={{
                    title: "Settings",
                    tabBarIcon: ({ color }) => (
                        <View
                            style={{
                                width: 80,
                                height: 80,
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: 45,
                            }}
                        >
                            <Ionicons
                                size={50}
                                name="cog"
                                color={color}
                            />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="chat/index"
                options={{
                    title: "Chat",
                    tabBarIcon: ({ color }) => (
                        <View
                            style={{
                                width: 80,
                                height: 80,
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 40,
                                marginTop: 45,
                            }}
                        >
                            <Ionicons
                                size={50}
                                name="chatbox-ellipses"
                                color={color}
                            />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="faq/index"
                options={{
                    title: "Faq",
                    tabBarIcon: ({ color }) => (
                        <View
                            style={{
                                width: 80,
                                height: 80,
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: 45,
                            }}
                        >
                            <Ionicons
                                size={50}
                                name="help-circle"
                                color={color}
                            />
                        </View>
                    ),
                }}
            />
        </Tabs>
    );
}
