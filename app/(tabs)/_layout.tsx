import { Feather, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { FavoritesProvider } from '../../src/context/FavoritesContext';
import { auth } from '../../src/firebaseConfig';

export default function TabLayout() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace('/login');
      }
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, [router]);
  if (!authChecked) return null;
  return (
    <FavoritesProvider>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            switch (route.name) {
              case 'home':
                return <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />;
              case 'shop':
                return <Ionicons name={focused ? 'cart' : 'cart-outline'} size={size} color={color} />;
              case 'bag':
                return <Ionicons name={focused ? 'bag' : 'bag-outline'} size={size} color={color} />;
              case 'favorites':
                return <Ionicons name={focused ? 'heart' : 'heart-outline'} size={size} color={color} />;
              case 'profile':
                return <FontAwesome name={focused ? 'user' : 'user-o'} size={size} color={color} />;
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
        <Tabs.Screen name="bag" options={{ title: 'Bag' }} />
        <Tabs.Screen name="favorites" options={{ title: 'Favorites' }} />
        <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
        {/* <Tabs.Screen name="category" options={{ title: 'Category' }} /> */}
        {/* <Tabs.Screen name="catalog" options={{ title: 'Catalog' }} /> */}
        {/* <Tabs.Screen name="filter" options={{ title: 'Filter' }} /> */}
      </Tabs>
    </FavoritesProvider>
  );
}
