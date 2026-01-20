/**
 * utils/types.ts
 * Type definitions for the Chef Menu App
 */

export type Course = 'starters' | 'mains' | 'desserts' | 'beverages';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: Course;
  price: number;
}