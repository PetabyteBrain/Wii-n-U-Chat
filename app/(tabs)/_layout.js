import { Tabs } from "expo-router"
import { Text } from "react-native"
import Ionicons from "@expo/vector-icons/Ionicons"

export default function HomeLayout() {
    return (
    <Tabs>
        <Tabs.Screen
            name="settings/index"
            options={{
                title: "Settings",
                tabBarIcon: ({ color }) => (
                    <Ionicons
                        size={28}
                        style={{ marginBottom: -3 }}
                        name="cog"
                        color={color}
                    />
                ),
            }}
        />
        <Tabs.Screen
            name="chat/index"
            options={{
                title: "Chat",
                tabBarIcon: ({ color }) => (
                    <Ionicons
                        size={28}
                        style={{ marginBottom: -3 }}
                        name="chatbox-ellipses"
                        color={color}
                    />
                ),
            }}
        />
        <Tabs.Screen
            name="faq/index"
            options={{
                title: "Faq",
                tabBarIcon: ({ color }) => (
                    <Ionicons
                        size={28}
                        style={{ marginBottom: -3 }}
                        name="help-circle"
                        color={color}
                    />
                ),
            }}
        />

    </Tabs>
    )
   }
   
