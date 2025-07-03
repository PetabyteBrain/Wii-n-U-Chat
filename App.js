import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Merriweather: require('./assets/fonts/Merriweather/Merriweather/Merriweather-VariableFont_opsz,wdth,wght.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // Or a loading spinner
  }

  return <Text style={{ fontFamily: 'Merriweather', fontWeight: '400', fontSize: 24, lineHeight: 30 }}>Hello, world!</Text>;
}
