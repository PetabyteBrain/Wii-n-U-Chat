import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";
import { Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Arrowfaq from "../../../assets/arrow-faq.svg";
import JumboText from "../../../components/JumboText";
import JumboTextsubTitle from "../../../components/JumboTextsubTitle";

const faqData = [
  {
    question: "What is Wii & U Chat?",
    answer: "Wii & U Chat is a user-friendly chat application that connects users in a shared chatroom. It provides a simple and intuitive platform where users can exchange messages in real time in a single common space.",
  },
  {
    question: "Do I need to register?",
    answer: "No registration is required. You simply choose a username to identify yourself in the chatroom, and you can start chatting right away.",
  },
  {
    question: "What data is stored?",
    answer: "The app stores your chosen username and the messages you send in the shared chatroom. No personal data beyond the username is collected or stored.",
  },
  {
    question: "How can I report other users?",
    answer: "Currently, there is no feature to report users directly within the app. If you encounter any issues, please contact the support team through the following email address: noreply@WiinUChat.inc (get rekt)",
  },
  {
    question: "Will there be updates?",
    answer: "No.",
  },
];

export default function FaqScreen() {
  const [openStates, setOpenStates] = useState(Array(faqData.length).fill(false));

  const toggleAnswer = (index) => {
    const updatedStates = [...openStates];
    updatedStates[index] = !updatedStates[index];
    setOpenStates(updatedStates);
  };

  return (
    <LinearGradient
      colors={["#426B69", "#8BB174"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <Stack.Screen options={{ title: "FAQ" }} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <JumboTextsubTitle>FAQ</JumboTextsubTitle>

        <View style={styles.faqWrapper}>
          {faqData.map((item, index) => (
            <View key={index} style={styles.faqItem}>
              <TouchableOpacity onPress={() => toggleAnswer(index)}>
                <Text style={styles.question}>
                  {openStates[index] ? <Arrowfaq style={styles.open} fill="#fff" /> : <Arrowfaq style={styles.close} fill="#fff"  />} {item.question}
                </Text>
              </TouchableOpacity>
              {openStates[index] && (
                <View style={styles.answerContainer}>
                  <Text style={styles.answer}>{item.answer}</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: "center",  // zentriert den Wrapper
  },
  faqWrapper: {
    width: "85%", // etwas schmaler als vorher (vorher fast 100%)
  },
  faqItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.5)", // halbtransparent
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  answerContainer: {
    marginTop: 10,
  },
  answer: {
    fontSize: 16,
    color: "#fff",
    lineHeight: 22,
  },
  open:{
    width: 20, 
    height: 20,
    transform: [
      { rotate: "-90deg" },
      { translateX: 2 }
    ],

  },
  close:{
    width: 20, 
    height: 20,
    transform: [
    { rotate: "90deg" },
    { translateX: 10 } // kleine Verschiebung nach unten
  ],
    
  }
});
