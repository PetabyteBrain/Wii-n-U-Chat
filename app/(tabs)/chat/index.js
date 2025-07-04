import {
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
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
import MessageBubble from "../../../components/MessageBubble"


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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0} // tweak as needed
      >
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
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
    
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
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
  },

});
