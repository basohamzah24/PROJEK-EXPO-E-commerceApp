import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const categories = [
  { label: 'New', image: require('../../assets/images/1.jpg') },
  { label: 'Clothes', image: require('../../assets/images/2.jpg') },
  { label: 'Shoes', image: require('../../assets/images/3.jpg') },
  { label: 'Accessories', image: require('../../assets/images/4.jpg') },
];

const tabs = ['Women', 'Men', 'Kids'];

export default function BagScreen() {
  const [activeTab, setActiveTab] = useState(0);
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
        {tabs.map((tab, idx) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(idx)} style={[styles.tabItem, activeTab === idx && styles.tabActive]}>
            <Text style={[styles.tabText, activeTab === idx && styles.tabTextActive]}>{tab}</Text>
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
          <View key={cat.label} style={styles.catCard}>
            <Image source={cat.image} style={styles.catImg} />
            <Text style={styles.catLabel}>{cat.label}</Text>
          </View>
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
  tabActive: { borderBottomWidth: 2, borderColor: 'tomato' },
  tabTextActive: { color: 'tomato', fontWeight: '700' },
  banner: { backgroundColor: 'tomato', borderRadius: 8, margin: 16, padding: 24, alignItems: 'center' },
  bannerTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginBottom: 4 },
  bannerSubtitle: { color: '#fff', fontSize: 16 },
  catCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f7f7f7', borderRadius: 8, marginHorizontal: 16, marginBottom: 12, padding: 8 },
  catImg: { width: 80, height: 60, borderRadius: 8, marginRight: 12 },
  catLabel: { fontSize: 18, fontWeight: '600' },
});
