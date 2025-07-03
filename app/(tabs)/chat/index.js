import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { useState, useEffect, useRef, useCallback } from "react";
import { Stack, useFocusEffect } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { database } from "../../../firebase";
import { ref, push, set, onValue, serverTimestamp } from "firebase/database";

import SendArrow from "../../../assets/send-arrow.svg";

function MessageBubble({ message, isMe }) {
  return (
    <View
      style={[
        styles.messageContainer,
        isMe ? styles.myMessage : styles.otherMessage,
      ]}
    >
      <View style={styles.usernameRow}>
  <Text
    style={[
      styles.username,
      isMe ? styles.myUsername : styles.otherUsername,
    ]}
  >
    {message.username}
  </Text>
  <Text style={styles.timestamp}>
    {message.timestamp
      ? new Date(message.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : ""}
  </Text>
</View>


      <View style={[styles.bubble, isMe ? styles.myBubble : styles.otherBubble]}>
        <Text style={styles.text}>{message.message}</Text>
        
      </View>
    </View>
  );
}

export default function ChatScreen() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      if (!state.isConnected) {
        Alert.alert(
          "No Internet Connection",
          "Messages cannot be sent while offline.",
          [{ text: "OK" }]
        );
      }
    });
    return () => unsubscribe();
  }, []);

  const flatListRef = useRef(null);

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

        loadedMessages.sort((a, b) => a.timestamp - b.timestamp);

        setMessages(loadedMessages);
      } else {
        setMessages([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = () => {
    if (!isConnected) {
      Alert.alert(
        "No Internet Connection",
        "Please connect to the internet to send messages."
      );
      return;
    }
  
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
  

  return (
    <LinearGradient
      colors={["#426B69", "#8BB174"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <Stack.Screen options={{ title: "Chat" }} />

      <FlatList
        ref={flatListRef}
        style={styles.messagesList}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MessageBubble message={item} isMe={item.username === username} />
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
          style={styles.sendButton}
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
    backgroundColor: "#D9D9D9",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    color: "#000",
  },
  sendButton: {
    backgroundColor: "#426D82",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 11,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  // MESSAGE BUBBLE STYLES
  messageContainer: {
    marginBottom: 10,
    paddingHorizontal: 10,
    flexDirection: "column",
    alignItems: "flex-start",

  },
  myMessage: {
    alignItems: "flex-end",
  },
  otherMessage: {
    alignItems: "flex-start",
  },
  usernameContainer: {
    marginBottom: 2,
    paddingHorizontal: 5,
  },
  username: {
    fontSize: 12,
    fontWeight: "bold",
    paddingRight: "10%"
    
  },
  myUsername: {
    textAlign: "right",
    color: "#8BB174",
  },
  otherUsername: {
    textAlign: "left",
    color: "#333",
  },
  usernameRow: {
  flexDirection: "row",
  alignItems: "center",
},
timestamp: {
  fontSize: 10,
  marginLeft: "3%", // manueller Abstand
  color: "#555",
  textAlign: "right",
},


  bubble: {
    minWidth: "35%",
    maxWidth: "80%",
    padding: 10,
    borderRadius: 20,
  },
  myBubble: {
    backgroundColor: "#8BB174",
    borderBottomRightRadius: 0,
    textAlign: "right",
  },
  otherBubble: {
    backgroundColor: "#ccc",
    borderBottomLeftRadius: 0,
  },
  text: {
    color: "#000",
  },
  timestamp: {
    fontSize: 10,
    marginTop: 4,
    color: "#555",
    textAlign: "right",
  },
});
