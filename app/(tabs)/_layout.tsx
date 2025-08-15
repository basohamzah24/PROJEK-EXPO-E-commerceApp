import { Feather, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case 'home':
              return <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />;
            case 'shop':
              return <Ionicons name={focused ? 'cart' : 'cart-outline'} size={size} color={color} />;
            case 'category':
              return <MaterialCommunityIcons name={focused ? 'shape' : 'shape-outline'} size={size} color={color} />;
            case 'catalog':
              return <FontAwesome name={focused ? 'list-alt' : 'list-ul'} size={size} color={color} />;
            case 'filter':
              return <Feather name="filter" size={size} color={color} />;
            default:
              return null;
          }
        },
        tabBarActiveTintColor: '#D6281B',
        tabBarInactiveTintColor: '#888',
        headerShown: false,
      })}
    >
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
  <Tabs.Screen name="shop" options={{ title: 'Shop' }} />
      <Tabs.Screen name="category" options={{ title: 'Category' }} />
      <Tabs.Screen name="catalog" options={{ title: 'Catalog' }} />
      <Tabs.Screen name="filter" options={{ title: 'Filter' }} />
    </Tabs>
  );
}
