import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const initialBag = [
  {
    id: 1,
    name: 'Pullover',
    color: 'Black',
    size: 'L',
    price: 51,
    image: require('../../assets/images/2.jpg'),
    qty: 1,
  },
  {
    id: 2,
    name: 'T-Shirt',
    color: 'Gray',
    size: 'L',
    price: 30,
    image: require('../../assets/images/3.jpg'),
    qty: 1,
  },
  {
    id: 3,
    name: 'Sport Dress',
    color: 'Black',
    size: 'M',
    price: 43,
    image: require('../../assets/images/4.jpg'),
    qty: 1,
  },
];

export default function BagScreen() {
  const [bag, setBag] = useState(initialBag);
  const [promo, setPromo] = useState('');

  const updateQty = (id: number, delta: number) => {
    setBag(bag => bag.map(item => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item));
  };

  const total = bag.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Bag</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {bag.map(item => (
          <View key={item.id} style={styles.card}>
            <Image source={item.image} style={styles.img} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.detail}>Color: {item.color}   Size: {item.size}</Text>
              <View style={styles.qtyRow}>
                <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQty(item.id, -1)}>
                  <Text style={styles.qtyBtnText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.qty}>{item.qty}</Text>
                <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQty(item.id, 1)}>
                  <Text style={styles.qtyBtnText}>+</Text>
                </TouchableOpacity>
                <Text style={styles.price}>{item.price * item.qty}$</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.menuBtn}>
              <Text style={styles.menuDot}>⋮</Text>
            </TouchableOpacity>
          </View>
        ))}
        <View style={styles.promoRow}>
          <TextInput
            style={styles.promoInput}
            placeholder="Enter your promo code"
            value={promo}
            onChangeText={setPromo}
          />
          <TouchableOpacity style={styles.promoBtn}>
            <Text style={styles.promoArrow}>→</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.totalLabel}>Total amount:</Text>
        <Text style={styles.total}>{total}$</Text>
        <TouchableOpacity style={styles.checkoutBtn}>
          <Text style={styles.checkoutText}>CHECK OUT</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 40, paddingHorizontal: 16 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 18 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fafafa', borderRadius: 14, padding: 12, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, elevation: 1 },
  img: { width: 80, height: 80, borderRadius: 12, marginRight: 12 },
  info: { flex: 1 },
  name: { fontSize: 18, fontWeight: '700', marginBottom: 2 },
  detail: { fontSize: 14, color: '#888', marginBottom: 8 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  qtyBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
  qtyBtnText: { fontSize: 22, color: '#888' },
  qty: { fontSize: 18, fontWeight: '600', marginHorizontal: 8 },
  price: { fontSize: 18, fontWeight: '700', marginLeft: 16 },
  menuBtn: { padding: 8 },
  menuDot: { fontSize: 22, color: '#bbb' },
  promoRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, marginBottom: 8 },
  promoInput: { flex: 1, backgroundColor: '#f5f5f5', borderRadius: 10, padding: 12, fontSize: 16 },
  promoBtn: { backgroundColor: '#fff', borderRadius: 20, padding: 10, marginLeft: 8, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
  promoArrow: { fontSize: 22, color: '#333' },
  totalLabel: { fontSize: 16, color: '#888', marginTop: 8 },
  total: { fontSize: 22, fontWeight: '700', marginBottom: 18 },
  checkoutBtn: { backgroundColor: '#D6281B', borderRadius: 30, paddingVertical: 16, alignItems: 'center', marginBottom: 24 },
  checkoutText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
