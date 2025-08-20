import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { signOut } from 'firebase/auth';
import { auth } from '../../src/firebaseConfig';

export default function ProfileScreen() {


  const router = useRouter();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/login');
    } catch (err) {
      Alert.alert('Logout gagal', 'Terjadi kesalahan saat logout.');
    }
  };
  return (
    <ScrollView style={styles.bg} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>My profile</Text>
        <Ionicons name="search" size={24} color="#222" />
      </View>
      <View style={styles.profileSection}>
        <Image source={require('../../assets/images/Profile.jpg')} style={styles.avatar} />
        <Text style={styles.name}>Matilda Brown</Text>
        <Text style={styles.email}>matildabrown@mail.com</Text>
      </View>
      <View style={styles.menuList}>
        <MenuItem title="My orders" desc="Already have 12 orders" icon={<MaterialIcons name="shopping-bag" size={22} color="#D6281B" />} onPress={() => router.push('/screens/my-orders')} />
        <MenuItem title="Shipping addresses" desc="3 dresses" icon={<Feather name="map-pin" size={22} color="#D6281B" />} />
        <MenuItem title="Payment methods" desc="Visa  **34" icon={<Feather name="credit-card" size={22} color="#D6281B" />} />
        <MenuItem title="Promocodes" desc="You have special promocodes" icon={<Feather name="gift" size={22} color="#D6281B" />} />
        <MenuItem title="My reviews" desc="Reviews for 4 items" icon={<Feather name="star" size={22} color="#D6281B" />} />
        <MenuItem title="Settings" desc="Notifications, password" icon={<Feather name="settings" size={22} color="#D6281B" />} />
      </View>
      <Pressable style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </ScrollView>
  );
}

type MenuItemProps = { title: string; desc: string; icon: React.ReactNode; onPress?: () => void };
function MenuItem({ title, desc, icon, onPress }: MenuItemProps) {
  return (
    <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={onPress}>
      <View style={styles.menuIcon}>{icon}</View>
      <View style={{ flex: 1 }}>
        <Text style={styles.menuTitle}>{title}</Text>
        <Text style={styles.menuDesc}>{desc}</Text>
      </View>
      <Feather name="chevron-right" size={22} color="#bbb" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: '#fff',
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 18,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#D6281B',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  email: {
    fontSize: 15,
    color: '#888',
    marginBottom: 10,
  },
  menuList: {
    marginTop: 8,
    paddingHorizontal: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
  },
  menuIcon: {
    marginRight: 16,
    width: 32,
    alignItems: 'center',
  },
  menuTitle: {
    fontSize: 17,
    color: '#222',
    fontWeight: '600',
  },
  menuDesc: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  logoutBtn: {
    margin: 24,
    backgroundColor: '#D6281B',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.5,
  },
});
