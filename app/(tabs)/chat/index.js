import { View, Text, StyleSheet, TextInput, Button, FlatList, TouchableOpacity } from "react-native";
import { useState, useEffect, useRef, useCallback } from "react";
import { Stack, useFocusEffect } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import * as Font from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { database } from "../../../firebase";
import { ref, push, set, onValue, serverTimestamp } from "firebase/database";

import JumboText from "../../../components/JumboText";
import SendArrow from "../../../assets/send-arrow.svg";

export default function ChatScreen() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const flatListRef = useRef(null);

  // Load username from AsyncStorage on mount
  useEffect(() => {
    AsyncStorage.getItem("username").then((storedUsername) => {
      if (storedUsername) setUsername(storedUsername);
      else alert("Username not found! Please set it first.");
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem("username").then((storedUsername) => {
        if (storedUsername) setUsername(storedUsername);
        else alert("Username not found! Please set it first.");
      });
    }, [])
  );

  const scrollToBottom = () => {
    if (flatListRef.current && messages.length > 0) {
      setTimeout(() => {
        flatListRef.current.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Listen for new messages in Realtime DB
  useEffect(() => {
    const messagesRef = ref(database, "messages");

    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedMessages = Object.entries(data).map(([id, msg]) => ({
          id,
          username: msg.username,
          message: msg.message,
          timestamp: msg.timestamp,
        }));

        // Sort messages by timestamp ascending
        loadedMessages.sort((a, b) => a.timestamp - b.timestamp);

        setMessages(loadedMessages);
      } else {
        setMessages([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // Send message to Firebase
  const sendMessage = () => {
    if (!message.trim()) return;

    if (!username) {
      alert("No username set");
      return;
    }

    const newMessageRef = push(ref(database, "messages"));

    set(newMessageRef, {
      username,
      message: message.trim(),
      timestamp: serverTimestamp(),
    });

    setMessage("");
  };

  // Format timestamp nicely
  const formatTimestamp = (ts) => {
    if (!ts) return "";
    const date = new Date(ts);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <LinearGradient
      colors={["#426B69", "#8BB174"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <Stack.Screen options={{ title: "Chat" }} />
      <JumboText>Wii & U Chat</JumboText>

      <FlatList
        ref={flatListRef}
        style={styles.messagesList}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.messageItem}>
            <Text style={styles.messageUser}>{item.username}:</Text>
            <Text style={styles.messageText}>{item.message}</Text>
            <Text style={styles.messageTime}>{formatTimestamp(item.timestamp)}</Text>
          </View>
        )}
        onContentSizeChange={scrollToBottom}
        onLayout={scrollToBottom}
      />

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          placeholderTextColor="#aaa"
          value={message}
          onChangeText={setMessage}
          onSubmitEditing={sendMessage}
          returnKeyType="send"
        />
        <TouchableOpacity
          onPress={sendMessage}
          activeOpacity={0.8}
          style={{
            backgroundColor: "#426D82",
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            paddingHorizontal: 11, // optional: adds some spacing inside the button
            paddingVertical: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SendArrow width={30} height={30} style={{ marginLeft: 6 }} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  messagesList: {
    flex: 1,
    marginVertical: 10,
  },
  messageItem: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
  },
  messageUser: {
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 2,
  },
  messageText: {
    color: "#eee",
  },
  messageTime: {
    color: "#ccc",
    fontSize: 10,
    marginTop: 4,
    textAlign: "right",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginVertical: -10,
    marginHorizontal: -5,
  },
  input: {
    flex: 1,
    fontSize: 17,
    fontFamily: "Merriweather",
    backgroundColor: "#D9D9D9",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    color: "#000",
  },
});
