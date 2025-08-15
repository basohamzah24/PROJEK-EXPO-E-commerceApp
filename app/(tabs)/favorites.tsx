import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFavorites } from '../../src/context/FavoritesContext';

export default function FavoritesScreen() {
  const { favorites } = useFavorites();

  return (
    <View style={styles.container}>
      <Ionicons name="heart" size={64} color="#D6281B" style={{ marginBottom: 16 }} />
      <Text style={styles.title}>Favorites</Text>
      {favorites.length === 0 ? (
        <Text style={styles.desc}>Produk favorit Anda akan muncul di sini.</Text>
      ) : (
        <ScrollView style={{ width: '100%' }}>
          {favorites.map(item => (
            <View key={item.id} style={styles.card}>
              <Image source={item.image} style={styles.img} />
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.brand}>{item.brand}</Text>
                <Text style={styles.price}>{item.price}$</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fafafa', borderRadius: 14, padding: 12, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, elevation: 1 },
  img: { width: 80, height: 80, borderRadius: 12, marginRight: 12 },
  name: { fontSize: 18, fontWeight: '700', marginBottom: 2 },
  brand: { fontSize: 14, color: '#888', marginBottom: 2 },
  price: { fontSize: 16, fontWeight: '700', color: '#D6281B' },
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
