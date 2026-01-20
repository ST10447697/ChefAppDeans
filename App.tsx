/**
 * App.tsx
 * Main application component
 * Manages screen navigation and provides context
 */

import React, { useState } from 'react';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { ChefProvider } from './context/ChefContext';
import { AddItemsScreen } from './screens/AddItemsScreen';
import { FilterScreen } from './screens/FilterScreen';
import { MenuScreen } from './screens/MenuScreen';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { colors } from './styles/colors';
import { styles } from './styles/styles';

type Screen = 'welcome' | 'menu' | 'add' | 'filter';

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');

  const renderScreen = (): React.ReactNode => {
    if (currentScreen === 'welcome') {
      return <WelcomeScreen onEnterApp={() => setCurrentScreen('menu')} />;
    }
    if (currentScreen === 'menu') {
      return <MenuScreen />;
    }
    if (currentScreen === 'add') {
      return <AddItemsScreen />;
    }
    if (currentScreen === 'filter') {
      return <FilterScreen />;
    }
    return <MenuScreen />;
  };

  const isScreenActive = (screen: Screen): boolean => {
    return currentScreen === screen;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      {currentScreen === 'welcome' ? (
        renderScreen()
      ) : (
        <>
          <View style={{ flex: 1 }}>
            {renderScreen()}
          </View>

          {/* Bottom Tab Navigation */}
          <View style={styles.tabBar}>
            <TouchableOpacity
              style={[styles.tabItem, isScreenActive('menu') && styles.tabItemActive]}
              onPress={() => setCurrentScreen('menu')}
            >
              <Text style={[styles.tabText, isScreenActive('menu') && styles.tabTextActive]}>
                📋 Menu
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabItem, isScreenActive('add') && styles.tabItemActive]}
              onPress={() => setCurrentScreen('add')}
            >
              <Text style={[styles.tabText, isScreenActive('add') && styles.tabTextActive]}>
                ➕ Add
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabItem, isScreenActive('filter') && styles.tabItemActive]}
              onPress={() => setCurrentScreen('filter')}
            >
              <Text style={[styles.tabText, isScreenActive('filter') && styles.tabTextActive]}>
                🔍 Filter
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

export default function App() {
  return (
    <ChefProvider>
      <AppContent />
    </ChefProvider>
  );
}