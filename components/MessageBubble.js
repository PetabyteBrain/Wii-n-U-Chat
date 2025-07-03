import { View, Text, StyleSheet } from "react-native";

export default function MessageBubble({ message, isMe }) {
  return (
    <View style={[styles.messageContainer, isMe ? styles.myMessage : styles.otherMessage]}>
  <View style={styles.usernameContainer}>
    <Text style={[styles.username, isMe ? styles.myUsername : styles.otherUsername]}>
      {message.username}
    </Text>
  </View>
  <View style={[styles.bubble, isMe ? styles.myBubble : styles.otherBubble]}>
    <Text style={styles.text}>{message.message}</Text>
    <Text style={styles.timestamp}>
      {message.timestamp
        ? new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : ""}
    </Text>
  </View>
</View>

  );
}

const styles = StyleSheet.create({
  messageContainer: {
    marginBottom: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  myMessage: {
    justifyContent: "flex-end",
  },
  otherMessage: {
    justifyContent: "flex-start",
  },
  bubble: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 20,
  },
  myBubble: {
    backgroundColor: "#8BB174",
    borderBottomRightRadius: 0,
  },
  otherBubble: {
    backgroundColor: "#ccc",
    borderBottomLeftRadius: 0,
  },
  username: {
    fontWeight: "bold",
    marginBottom: 3,
  },
  myUsername: {
    color: "#fff",
  },
  otherUsername: {
    color: "#333",
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
