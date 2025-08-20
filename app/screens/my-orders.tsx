import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ORDERS = [
  {
    id: '1',
    number: '1947034',
    date: '05-12-2019',
    tracking: 'IW3475453455',
    quantity: 3,
    amount: 112,
    status: 'Delivered',
  },
  {
    id: '2',
    number: '1947034',
    date: '05-12-2019',
    tracking: 'IW3475453455',
    quantity: 3,
    amount: 112,
    status: 'Delivered',
  },
  {
    id: '3',
    number: '1947034',
    date: '05-12-2019',
    tracking: 'IW3475453455',
    quantity: 3,
    amount: 112,
    status: 'Delivered',
  },
];

const TABS = ['Delivered', 'Processing', 'Cancelled'];

export default function MyOrdersScreen() {
  const [activeTab, setActiveTab] = useState('Delivered');
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 8 }}>
          <Ionicons name="arrow-back" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
      </View>
      <View style={styles.tabsRow}>
        {TABS.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={ORDERS.filter(o => o.status === activeTab)}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardRow}>
              <Text style={styles.orderNo}>Order №{item.number}</Text>
              <Text style={styles.orderDate}>{item.date}</Text>
            </View>
            <Text style={styles.tracking}>Tracking number:  <Text style={{ fontWeight: 'bold' }}>{item.tracking}</Text></Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoText}>Quantity:  <Text style={{ fontWeight: 'bold' }}>{item.quantity}</Text></Text>
              <Text style={styles.infoText}>Total Amount:  <Text style={{ fontWeight: 'bold' }}>{item.amount}$</Text></Text>
            </View>
            <View style={styles.cardFooter}>
              <TouchableOpacity style={styles.detailsBtn}>
                <Text style={styles.detailsBtnText}>Details</Text>
              </TouchableOpacity>
              <Text style={styles.statusDelivered}>{item.status}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222',
  },
  tabsRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  tabBtn: {
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 18,
    marginRight: 10,
    backgroundColor: 'transparent',
  },
  tabBtnActive: {
    backgroundColor: '#222',
  },
  tabText: {
    fontSize: 15,
    color: '#222',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderNo: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222',
  },
  orderDate: {
    color: '#888',
    fontSize: 14,
  },
  tracking: {
    color: '#888',
    fontSize: 14,
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoText: {
    color: '#222',
    fontSize: 15,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  detailsBtn: {
    borderWidth: 1,
    borderColor: '#222',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 22,
  },
  detailsBtnText: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 15,
  },
  statusDelivered: {
    color: '#2ecc40',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
