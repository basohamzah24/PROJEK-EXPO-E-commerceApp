import { Feather, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/Profile.jpg')} style={styles.avatar} />
      <Text style={styles.name}>Nama Pengguna</Text>
      <Text style={styles.email}>email@domain.com</Text>

      <View style={styles.menuWrapper}>
        <TouchableOpacity style={styles.menuItem}>
          <Feather name="edit" size={22} color="#D6281B" style={{ marginRight: 12 }} />
          <Text style={styles.menuText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Feather name="settings" size={22} color="#D6281B" style={{ marginRight: 12 }} />
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.menuItem, styles.logoutBtn]}>
          <Ionicons name="log-out-outline" size={22} color="#fff" style={{ marginRight: 12 }} />
          <Text style={[styles.menuText, { color: '#fff' }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 18,
    borderWidth: 2,
    borderColor: '#D6281B',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  email: {
    fontSize: 16,
    color: '#888',
    marginBottom: 32,
  },
  menuWrapper: {
    width: '80%',
    marginTop: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fbe9e7',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 16,
    marginBottom: 14,
  },
  menuText: {
    fontSize: 17,
    color: '#D6281B',
    fontWeight: '600',
  },
  logoutBtn: {
    backgroundColor: '#D6281B',
    marginTop: 10,
  },
});
