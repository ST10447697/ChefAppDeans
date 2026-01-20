/**
 * context/ChefContext.tsx
 * Global state management for the Chef Menu App
 */

import React, { createContext, useContext, useState } from 'react';
import { Course, MenuItem } from '../utils/types';

interface ChefContextType {
  menuItems: MenuItem[];
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  removeMenuItem: (id: string) => void;
  getTotalMenuItems: () => number;
  getItemsByCourse: (course: Course) => MenuItem[];
  getCourseStats: (course: Course) => { count: number; average: number };
  getOverallAveragePrice: () => number;
  getCourseColor: (course: Course) => string;
}

const ChefContext = createContext<ChefContextType | undefined>(undefined);

export const ChefProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: '1', name: 'Bruschetta', description: 'Toasted bread with tomato and basil', course: 'starters', price: 45.99 },
    { id: '2', name: 'Spring Rolls', description: 'Crispy rolls with vegetables', course: 'starters', price: 38.50 },
    { id: '3', name: 'Grilled Salmon', description: 'Fresh salmon with lemon and herbs', course: 'mains', price: 189.99 },
    { id: '4', name: 'Beef Steak', description: 'Prime cut grilled to perfection', course: 'mains', price: 225.00 },
    { id: '5', name: 'Chocolate Cake', description: 'Rich chocolate cake with ganache', course: 'desserts', price: 55.99 },
    { id: '6', name: 'Cheesecake', description: 'Creamy New York style cheesecake', course: 'desserts', price: 49.99 },
    { id: '7', name: 'Fresh Orange Juice', description: 'Freshly squeezed orange juice', course: 'beverages', price: 35.99 },
    { id: '8', name: 'Iced Coffee', description: 'Cold brew coffee with ice', course: 'beverages', price: 28.50 },
  ]);

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: Date.now().toString(),
    };
    setMenuItems([...menuItems, newItem]);
  };

  const removeMenuItem = (id: string) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  const getTotalMenuItems = (): number => {
    return menuItems.length;
  };

  const getItemsByCourse = (course: Course): MenuItem[] => {
    const items: MenuItem[] = [];
    for (let i = 0; i < menuItems.length; i++) {
      if (menuItems[i].course === course) {
        items.push(menuItems[i]);
      }
    }
    return items;
  };

  const getCourseStats = (course: Course) => {
    const items = getItemsByCourse(course);
    let total = 0;
    for (let i = 0; i < items.length; i++) {
      total += items[i].price;
    }
    const average = items.length > 0 ? total / items.length : 0;
    return { count: items.length, average: Math.round(average * 100) / 100 };
  };

  const getOverallAveragePrice = (): number => {
    if (menuItems.length === 0) return 0;
    let totalPrice = 0;
    let index = 0;
    while (index < menuItems.length) {
      totalPrice += menuItems[index].price;
      index++;
    }
    const averagePrice = totalPrice / menuItems.length;
    return Math.round(averagePrice * 100) / 100;
  };

  const getCourseColor = (course: Course): string => {
    const courseColors: Record<Course, string> = {
      starters: '#3498DB',
      mains: '#E74C3C',
      desserts: '#9B59B6',
      beverages: '#1ABC9C',
    };
    return courseColors[course];
  };

  const value: ChefContextType = {
    menuItems,
    addMenuItem,
    removeMenuItem,
    getTotalMenuItems,
    getItemsByCourse,
    getCourseStats,
    getOverallAveragePrice,
    getCourseColor,
  };

  return (
    <ChefContext.Provider value={value}>
      {children}
    </ChefContext.Provider>
  );
};

export const useChef = (): ChefContextType => {
  const context = useContext(ChefContext);
  if (!context) {
    throw new Error('useChef must be used within a ChefProvider');
  }
  return context;
};