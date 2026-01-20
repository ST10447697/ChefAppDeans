/**
 * screens/WelcomeScreen.tsx
 * Welcome screen component
 */

import React from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../styles/colors';
import { styles } from '../styles/styles';

interface WelcomeScreenProps {
  onEnterApp: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onEnterApp }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          {/* Background/ welcome Image - Replaced with Canva image */}
          <Image
            source={require('../assets/images/welcome-banner.png')} // Replace 'welcome-banner.png' with your image name
            style={{
              width: '100%',
              height: 300,
              borderRadius: 16,
              marginBottom: 24,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
             
            }}
            resizeMode="cover"
          />
          


          {/* Restaurant Name / Title */}
          <Text style={{ fontSize: 40, fontWeight: 'bold', color: colors.primary, marginBottom: 8, textAlign: 'center' }}>
            Chef Christoffel's
          </Text>

          {/* Slogan */}
          <Text style={{ fontSize: 18, color: colors.secondary, textAlign: 'center', marginBottom: 40, lineHeight: 24, fontStyle: 'italic' }}>
            "Culinary Excellence in Every Bite"
          </Text>

          {/* Enter Button */}
          <TouchableOpacity style={[styles.button, { width: '100%' }]} onPress={onEnterApp}>
            <Text style={styles.buttonText}>Enter App</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};