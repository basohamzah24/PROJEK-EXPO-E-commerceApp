import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <Ionicons name="heart" size={64} color="#D6281B" style={{ marginBottom: 16 }} />
      <Text style={styles.title}>Favorites</Text>
      <Text style={styles.desc}>Produk favorit Anda akan muncul di sini.</Text>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D6281B',
    marginBottom: 8,
  },
  desc: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    paddingHorizontal: 24,
  },
});
