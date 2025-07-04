import { View, Text, StyleSheet } from "react-native";

export default function MessageBubble({ message, isMe }) {
  return (
    <View
      style={[
        styles.messageContainer,
        { alignItems: isMe ? "flex-end" : "flex-start" },
      ]}
    >
      <View style={styles.bubbleWrapper}>
        <View style={styles.headerRow}>
          {isMe && (
            <Text style={[styles.username, styles.myUsername]}>
              {message.username}
            </Text>
          )}
          <Text
            style={[
              styles.timestamp,
              isMe ? styles.myTimeStamp : styles.otherTimeStamp,
            ]}
          >
            {message.timestamp
              ? new Date(message.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : ""}
          
          </Text>
          {!isMe && (
            <Text style={[styles.username, styles.otherUsername]}>
              {message.username}
            </Text>
          )}
        </View>
        <View
          style={[styles.bubble, isMe ? styles.myBubble : styles.otherBubble]}
        >
          <Text style={styles.text}>{message.message}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  bubbleWrapper: {
    maxWidth: "90%",
    minWidth: 50,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  bubble: {
    borderRadius: 10,
    padding: 10,
  },
  myBubble: {
    backgroundColor: "#8BB174",
    borderBottomRightRadius: 0,
    alignSelf: "flex-end",
  },
  otherBubble: {
    backgroundColor: "#ccc",
    borderBottomLeftRadius: 0,
    alignSelf: "flex-start",
  },
  username: {
    marginHorizontal: 10,
    fontSize: 14,
    fontWeight: "bold",
    color: "#F0F0F0",
  },
  myUsername: {
    textAlign: "left",
  },
  otherUsername: {
    textAlign: "right",
  },
  timestamp: {
    fontSize: 12,
    color: "#F0F0F0",
  },
  myTimeStamp: {
    marginRight: 0,
  },
  otherTimeStamp: {
    marginLeft: 0,
  },
  text: {
    paddingVertical: 0,
    paddingHorizontal: 10,
    color: "#000",
  },
});