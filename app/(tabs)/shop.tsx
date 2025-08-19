import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const categoriesData = {
  Women: [
    { label: 'Blouse', image: require('../../assets/images/blouse.jpg') },
    { label: 'Vest', image: require('../../assets/images/vest.jpg') },
    { label: 'Cardigan Knit', image: require('../../assets/images/cardigan.jpg') },
    { label: 'Clothes', image: require('../../assets/images/celana.jpg') },
    { label: 'Skirt', image: require('../../assets/images/rok.jpg') },
    { label: 'Shoes', image: require('../../assets/images/shoes.jpg') },
    { label: 'Accesories', image: require('../../assets/images/aksesoris.jpg') },
  ],
  Men: [
    { label: 'Tshirt', image: require('../../assets/images/tshirt.jpg') },
    { label: 'Clothes', image: require('../../assets/images/celana laki2.jpg') },
    { label: 'Shoes', image: require('../../assets/images/sepatu laki2.jpg') },
    { label: 'Accesories', image: require('../../assets/images/aksesoris laki2.jpg') },
  ],
  Kids: [
    { label: 'Girls', image: require('../../assets/images/girls.jpg') },
    { label: 'Boys', image: require('../../assets/images/boys.jpg') },
  ],
} as { [key: string]: { label: string; image: any }[] };

// const tabs = ['Women', 'Men', 'Kids'];

export default function BagScreen() {
  const [activeTab, setActiveTab] = useState(0);
  const tabNames = ['Women', 'Men', 'Kids'];
  const categories: { label: string; image: any }[] = categoriesData[tabNames[activeTab]];
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Categories</Text>
        <TouchableOpacity>
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {/* Tabs */}
      <View style={styles.tabs}>
        {tabNames.map((tab, idx) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(idx)} style={styles.tabItem}>
            <Text style={[styles.tabText, activeTab === idx && styles.tabTextActive]}>{tab}</Text>
            {activeTab === idx && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>SUMMER SALES</Text>
          <Text style={styles.bannerSubtitle}>Up to 50% off</Text>
        </View>
        {/* Category List */}
        {categories.map((cat, idx) => (
          <TouchableOpacity key={cat.label} style={styles.catCard}>
            <View style={styles.catRow}>
              <Text style={styles.catLabel}>{cat.label}</Text>
              <Image source={cat.image} style={styles.catImg} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  headerTitle: { fontSize: 20, fontWeight: '700' },
  tabs: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 8, borderBottomWidth: 1, borderColor: '#eee' },
  tabItem: { paddingVertical: 8, paddingHorizontal: 16 },
  tabText: { fontSize: 16, color: '#888' },
  tabIndicator: { height: 2, backgroundColor: '#2196F3', width: '80%', marginTop: 4, borderRadius: 2 },
  tabTextActive: { color: '#D6281B', fontWeight: '700' },
  banner: { backgroundColor: '#D6281B', borderRadius: 10, marginHorizontal: 16, marginBottom: 16, padding: 18, alignItems: 'center', borderWidth: 3, borderColor: '#2196F3' },
  bannerTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginBottom: 4 },
  bannerSubtitle: { color: '#fff', fontSize: 16 },
  catCard: { backgroundColor: '#f9f9f9', borderRadius: 12, marginHorizontal: 16, marginBottom: 12, padding: 12 },
  catRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  catLabel: { fontSize: 17, fontWeight: '600', color: '#333' },
  catImg: { width: 80, height: 80, borderRadius: 10, marginLeft: 12 },
});
