import { View, Text, StyleSheet } from "react-native";

export default function MessageBubble({ message, isMe }) {
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

const styles = StyleSheet.create({
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
  marginLeft: "3%",
  color: "#555",
  textAlign: "right",
},
  bubble: {
    minWidth: "50%",
    maxWidth: "90%",
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
