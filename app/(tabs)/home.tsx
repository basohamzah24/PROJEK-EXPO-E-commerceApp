import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ProductCard, { Product } from '../../src/components/ProductCard';


export default function HomeScreen() {
  // Data produk
  const products: Product[] = [
    {
      id: 1,
      name: 'Kaos Polos',
      brand: 'Uniqlo',
      price: 120000,
      oldPrice: 150000,
      image: require('../../assets/images/2.jpg'),
      discount: 20,
      rating: 4,
      ratingCount: 10,
      favorite: true,
    },
    {
      id: 2,
      name: 'Kemeja Flanel',
      brand: 'H&M',
      price: 180000,
      oldPrice: 220000,
      image: require('../../assets/images/3.jpg'),
      discount: 18,
      rating: 4.5,
      ratingCount: 8,
      favorite: false,
    },
    {
      id: 3,
      name: 'Celana Jeans',
      brand: 'Levi’s',
      price: 250000,
      oldPrice: 300000,
      image: require('../../assets/images/4.jpg'),
      discount: 17,
      rating: 4.2,
      ratingCount: 12,
      favorite: true,
    },
    {
      id: 4,
      name: 'Jaket Hoodie',
      brand: 'Erigo',
      price: 200000,
      oldPrice: 250000,
      image: require('../../assets/images/5.jpg'),
      discount: 20,
      rating: 4.7,
      ratingCount: 15,
      favorite: false,
    },
  ];

  // State untuk modal dan size
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const sizes = ['S', 'M', 'L', 'XL'];
  const [fontsLoaded, setFontsLoaded] = useState(false);
  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'Anton-Regular': require('../../assets/fonts/Anton-Regular.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFont();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.bannerWrapper}>
          <Image source={require('../../assets/images/1.jpg')} style={styles.banner} resizeMode="cover" />
          <View style={styles.bannerTextBottomLeft}>
            <View style={{ flexDirection: 'column', gap: 0 }}>
              <Text style={[styles.title, { fontFamily: 'Anton-Regular', fontWeight: '400', marginBottom: -25 }]}>Fashion</Text>
              <Text style={[styles.title, { fontFamily: 'Anton-Regular', fontWeight: '400' }]}>Sale</Text>
            </View>
          </View>
        </View>
        <Text style={styles.section}>Penawaran</Text>
        {[...Array(5)].map((_, rowIdx) => (
          <View key={rowIdx} style={styles.offerRow}>
            <Text style={styles.offerTitle}>Penawaran {rowIdx + 1}</Text>
            <FlatList
              horizontal
              data={products}
              keyExtractor={(item: Product) => item.id + '-' + rowIdx}
              renderItem={({ item }) => (
                <ProductCard item={item} onPress={() => setModalVisible(true)} />
              )}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 12 }}
              style={styles.horizontalList}
            />
          </View>
        ))}
      </ScrollView>
      <SizeModal
        visible={modalVisible}
        onClose={() => { setModalVisible(false); setSelectedSize(''); }}
        sizes={sizes}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        onAddToCart={() => {
          setModalVisible(false);
          setSelectedSize('');
        }}
      />
    </View>
  );

// Komponen Modal Pilihan Size
type SizeModalProps = {
  visible: boolean;
  onClose: () => void;
  sizes: string[];
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  onAddToCart: () => void;
};
function SizeModal({ visible, onClose, sizes, selectedSize, setSelectedSize, onAddToCart }: SizeModalProps) {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Ionicons name="close" size={28} color="#888" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Select size</Text>
          <View style={styles.sizeRow}>
            {sizes.map((size: string) => (
              <TouchableOpacity
                key={size}
                style={[styles.sizeBtn, selectedSize === size && styles.sizeBtnActive]}
                onPress={() => setSelectedSize(size)}
                activeOpacity={0.7}
              >
                <Text style={[styles.sizeText, selectedSize === size && styles.sizeTextActive]}>{size}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.sizeInfo}>Size info</Text>
          <TouchableOpacity
            style={[styles.addCartBtn, !selectedSize && { backgroundColor: '#ccc' }]}
            onPress={onAddToCart}
            disabled={!selectedSize}
          >
            <Text style={styles.addCartText}>ADD TO CART</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
}
const styles = StyleSheet.create({
  offerRow: { marginBottom: 24 },
  offerTitle: { fontSize: 16, fontWeight: '600', marginLeft: 16, marginBottom: 8, color: '#D6281B' },
  closeBtn: { position: 'absolute', top: 16, right: 16, zIndex: 10 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.15)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, alignItems: 'center' },
  modalTitle: { fontSize: 20, fontWeight: '700', marginBottom: 18 },
  sizeRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 18 },
  sizeBtn: { borderWidth: 1, borderColor: '#eee', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 22, marginHorizontal: 4, backgroundColor: '#fff' },
  sizeBtnActive: { borderColor: '#D6281B', backgroundColor: '#fbe9e7' },
  sizeText: { fontSize: 16, color: '#333' },
  sizeTextActive: { color: '#D6281B', fontWeight: '700' },
  sizeInfo: { fontSize: 14, color: '#888', marginBottom: 18 },
  addCartBtn: { backgroundColor: '#D6281B', borderRadius: 24, paddingVertical: 14, paddingHorizontal: 32, width: '100%', alignItems: 'center', marginTop: 8 },
  addCartText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  horizontalList: { marginBottom: 18 },
  cardHorizontal: { backgroundColor: '#fff', borderRadius: 18, marginRight: 16, width: 170, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, elevation: 2, paddingBottom: 10, marginVertical: 8 },
  imgWrapper: { position: 'relative', borderRadius: 18, overflow: 'hidden', marginBottom: 8 },
  cardImgHorizontal: { width: 170, height: 250, borderRadius: 18 },
  discountBadge: { position: 'absolute', top: 8, left: 8, backgroundColor: '#D6281B', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2 },
  discountText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  favBtn: { position: 'absolute', top: 8, right: 8, backgroundColor: '#fff', borderRadius: 16, padding: 4, elevation: 2 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginLeft: 6, marginBottom: 2 },
  ratingCount: { fontSize: 12, color: '#888', marginLeft: 4 },
  brand: { fontSize: 13, color: '#888', marginLeft: 6 },
  productName: { fontSize: 15, fontWeight: '700', marginLeft: 6, marginBottom: 2 },
  priceRow: { flexDirection: 'row', alignItems: 'center', marginLeft: 6 },
  oldPrice: { fontSize: 14, color: '#888', textDecorationLine: 'line-through', marginRight: 6 },
  price: { fontSize: 16, color: '#D6281B', fontWeight: '700' },
  container: { flex: 1, backgroundColor: '#fff' },
  // ...existing code...
  bannerWrapper: { position: 'relative', width: '100%', height: 600, marginBottom: 10 },
  banner: { width: '100%', height: 600, borderRadius:10 },
  bannerTextBottomLeft: { position: 'absolute', left: 16, bottom: 9 },
  title: { fontSize: 32, fontWeight: '600', color: '#861a1aff', paddingHorizontal: 23, paddingVertical: 0, borderRadius: 12 },
  section: { fontSize: 18, fontWeight: '600', marginLeft: 16, marginBottom: 9 },
  row: { marginLeft: 16, marginBottom: 16 },
  rowContent: { flexDirection: 'row', alignItems: 'center' },
  itemImg: { width: 100, height: 140, borderRadius: 12, marginRight: 12 }
});
