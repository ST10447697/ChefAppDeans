/**
 * screens/AddItemsScreen.tsx
 * Add Items screen - allows adding and removing menu items
 */

import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useChef } from '../context/ChefContext';
import { colors } from '../styles/colors';
import { styles } from '../styles/styles';
import { Course } from '../utils/types';

export const AddItemsScreen: React.FC = () => {
  const { menuItems, addMenuItem, removeMenuItem } = useChef();

  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course>('starters');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const courses: Course[] = ['starters', 'mains', 'desserts', 'beverages'];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!itemName.trim()) {
      newErrors.name = 'Item name is required';
    }
    if (!itemDescription.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!itemPrice.trim()) {
      newErrors.price = 'Price is required';
    } else if (!/^\d+(\.\d{1,2})?$/.test(itemPrice)) {
      newErrors.price = 'Enter valid price (e.g., 99.99)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddItem = () => {
    if (validateForm()) {
      addMenuItem({
        name: itemName,
        description: itemDescription,
        course: selectedCourse,
        price: parseFloat(itemPrice),
      });
      setItemName('');
      setItemDescription('');
      setItemPrice('');
      setSelectedCourse('starters');
      setErrors({});
      Alert.alert('Success', 'Item added to menu!');
    }
  };

  const handleRemoveItem = (id: string, name: string) => {
    Alert.alert('Remove Item', `Are you sure you want to remove "${name}"?`, [
      { text: 'Cancel' },
      {
        text: 'Remove',
        onPress: () => {
          removeMenuItem(id);
          Alert.alert('Removed', `"${name}" has been removed`);
        },
        style: 'destructive',
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Add Items</Text>
        <Text style={styles.headerSubtitle}>Create and manage menu items</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Form */}
        <Text style={styles.sectionTitle}>Add New Item</Text>

        <Text style={{ fontSize: 12, fontWeight: '600', color: colors.text, marginBottom: 8 }}>Item Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Grilled Salmon"
          value={itemName}
          onChangeText={setItemName}
          placeholderTextColor={colors.lightText}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        <Text style={{ fontSize: 12, fontWeight: '600', color: colors.text, marginBottom: 8 }}>Description *</Text>
        <TextInput
          style={[styles.input, { minHeight: 80, textAlignVertical: 'top' }]}
          placeholder="Describe the item"
          value={itemDescription}
          onChangeText={setItemDescription}
          multiline
          numberOfLines={4}
          placeholderTextColor={colors.lightText}
        />
        {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}

        <Text style={{ fontSize: 12, fontWeight: '600', color: colors.text, marginBottom: 8 }}>Course *</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 }}>
          {courses.map((course) => (
            <TouchableOpacity
              key={course}
              style={[
                styles.courseButton,
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

        <Text style={{ fontSize: 12, fontWeight: '600', color: colors.text, marginBottom: 8 }}>Price (R) *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., 189.99"
          value={itemPrice}
          onChangeText={setItemPrice}
          keyboardType="decimal-pad"
          placeholderTextColor={colors.lightText}
        />
        {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleAddItem}>
          <Text style={styles.buttonText}>+ Add Item</Text>
        </TouchableOpacity>

        {/* Current Items */}
        <Text style={styles.sectionTitle}>Current Items ({menuItems.length})</Text>
        {menuItems.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No items yet</Text>
          </View>
        ) : (
          menuItems.map((item) => (
            <View key={item.id} style={styles.card}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemCourse}>{item.course}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                <Text style={styles.itemPrice}>R {item.price.toFixed(2)}</Text>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveItem(item.id, item.name)}
                >
                  <Text style={styles.buttonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};