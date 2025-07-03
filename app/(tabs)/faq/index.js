import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";
import { Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Arrowfaq from "../../../assets/arrow-faq.svg";
import JumboText from "../../../components/JumboText";
import JumboTextsubTitle from "../../../components/JumboTextsubTitle";

const faqData = [
  {
    question: "Was ist Wii & U Chat?",
    answer: "Wii & U Chat ist eine Kommunikationsplattform, auf der du mit Freunden chatten kannst – inspiriert vom klassischen Wii U Erlebnis.",
  },
  {
    question: "Muss ich mich registrieren?",
    answer: "Ja, um alle Funktionen nutzen zu können, musst du ein Konto erstellen.",
  },
  {
    question: "Welche Daten werden gespeichert?",
    answer: "Es werden nur notwendige Daten wie Benutzername und Chatverlauf gespeichert. Persönliche Daten werden vertraulich behandelt.",
  },
  {
    question: "Wie kann ich andere Nutzer melden?",
    answer: "Tippe im Chat auf den Namen des Nutzers und wähle 'Melden'. Unser Team prüft dann den Vorfall.",
  },
  {
    question: "Wird es Updates geben?",
    answer: "Ja! Wir arbeiten ständig an Verbesserungen und neuen Features. Bleib dran.",
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
        <JumboText>Wii & U Chat</JumboText>
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
