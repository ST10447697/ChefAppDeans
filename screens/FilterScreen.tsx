/**
 * screens/FilterScreen.tsx
 * Filter screen - allows filtering menu items by course
 */

import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useChef } from '../context/ChefContext';
import { styles } from '../styles/styles';
import { Course } from '../utils/types';

export const FilterScreen: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course>('starters');
  const { getItemsByCourse, getCourseStats, getCourseColor } = useChef();

  const filteredItems = getItemsByCourse(selectedCourse);
  const stats = getCourseStats(selectedCourse);
  const courses: Course[] = ['starters', 'mains', 'desserts', 'beverages'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Filter Menu</Text>
        <Text style={styles.headerSubtitle}>Browse by course category</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Course Selection */}
        <Text style={styles.sectionTitle}>Select Course</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 }}>
          {courses.map((course) => (
            <TouchableOpacity
              key={course}
              style={[
                styles.courseButton,
                { minWidth: '45%' },
                selectedCourse === course ? styles.courseButtonActive : styles.courseButtonInactive,
              ]}
              onPress={() => setSelectedCourse(course)}
            >
              <Text
                style={[
                  styles.courseButtonText,
                  selectedCourse === course ? styles.courseButtonTextActive : styles.courseButtonTextInactive,
                ]}
              >
                {course.charAt(0).toUpperCase() + course.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Statistics */}
        <View style={[styles.statContainer, { borderLeftColor: getCourseColor(selectedCourse) }]}>
          <Text style={styles.statLabel}>Items in {selectedCourse}</Text>
          <Text style={styles.statValue}>{stats.count}</Text>
          {stats.count > 0 && (
            <View style={{ marginTop: 8 }}>
              <Text style={styles.statLabel}>Average Price</Text>
              <Text style={[styles.statValue, { fontSize: 18 }]}>R {stats.average.toFixed(2)}</Text>
            </View>
          )}
        </View>

        {/* Filtered Items */}
        <Text style={styles.sectionTitle}>{selectedCourse.charAt(0).toUpperCase() + selectedCourse.slice(1)}</Text>
        {filteredItems.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={{ fontSize: 40, marginBottom: 12 }}>🍽️</Text>
            <Text style={styles.emptyStateText}>No {selectedCourse} available</Text>
          </View>
        ) : (
          filteredItems.map((item) => (
            <View key={item.id} style={[styles.card, { borderLeftWidth: 4, borderLeftColor: getCourseColor(item.course) }]}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>R {item.price.toFixed(2)}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};