/**
 * screens/MenuScreen.tsx
 * Menu/Home screen - displays complete menu with statistics
 */

import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useChef } from '../context/ChefContext';
import { colors } from '../styles/colors';
import { styles } from '../styles/styles';
import { Course } from '../utils/types';

export const MenuScreen: React.FC = () => {
  const { menuItems, getTotalMenuItems, getCourseStats, getOverallAveragePrice } = useChef();

  const totalItems = getTotalMenuItems();
  const overallAverage = getOverallAveragePrice();
  const courses: Course[] = ['starters', 'mains', 'desserts', 'beverages'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Menu</Text>
        <Text style={styles.headerSubtitle}>View the complete menu</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Statistics */}
        <Text style={styles.sectionTitle}>Menu Statistics</Text>
        <View style={styles.statContainer}>
          <Text style={styles.statLabel}>Total Items</Text>
          <Text style={styles.statValue}>{totalItems}</Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={styles.statLabel}>Overall Average Price</Text>
          <Text style={styles.statValue}>R {overallAverage.toFixed(2)}</Text>
        </View>

        {/* Course Statistics */}
        {courses.map((course) => {
          const stats = getCourseStats(course);
          if (stats.count === 0) return null;
          return (
            <View key={course} style={[styles.statContainer, { borderLeftColor: colors[course as keyof typeof colors] || colors.secondary }]}>
              <Text style={styles.statLabel}>{course.charAt(0).toUpperCase() + course.slice(1)}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.statValue}>{stats.count} items</Text>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.secondary }}>
                  Avg: R {stats.average.toFixed(2)}
                </Text>
              </View>
            </View>
          );
        })}

        {/* Menu Items */}
        <Text style={styles.sectionTitle}>All Items</Text>
        {menuItems.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={{ fontSize: 40, marginBottom: 12 }}>📭</Text>
            <Text style={styles.emptyStateText}>No menu items yet</Text>
          </View>
        ) : (
          menuItems.map((item) => (
            <View key={item.id} style={styles.card}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemCourse}>{item.course.toUpperCase()}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <Text style={styles.itemPrice}>R {item.price.toFixed(2)}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};