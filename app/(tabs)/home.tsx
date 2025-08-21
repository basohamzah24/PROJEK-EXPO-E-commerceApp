import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ProductCard, { Product } from '../../src/components/ProductCard';
import { useFavorites } from '../../src/context/FavoritesContext';


export default function HomeScreen() {
  const scrollRef = React.useRef<ScrollView>(null);
  // State untuk modal semua penawaran
  const [allOffersVisible, setAllOffersVisible] = useState(false);
  // Data produk
  // Data produk untuk setiap baris (5 baris, masing-masing gambar berbeda)
  const productRows: Product[][] = [
    [
      { id: 1, name: 'Kaos Polos', brand: 'Uniqlo', price: 120000, oldPrice: 150000, image: require('../../assets/images/kaos uniqlo laki2.jpg'), discount: 20, rating: 4, ratingCount: 10, favorite: true },
      { id: 2, name: 'Kemeja Flanel', brand: 'H&M', price: 180000, oldPrice: 220000, image: require('../../assets/images/kemeja flanel laki2.jpg'), discount: 18, rating: 4.5, ratingCount: 8, favorite: false },
      { id: 3, name: 'Celana Jeans', brand: 'H&M', price: 170000, oldPrice: 220000, image: require('../../assets/images/celana jeans laki2.jpg'), discount: 18, rating: 4.5, ratingCount: 8, favorite: false },
      { id: 4, name: 'Hoodie', brand: 'H&M', price: 180000, oldPrice: 220000, image: require('../../assets/images/hoodie.jpg'), discount: 18, rating: 4.5, ratingCount: 8, favorite: false },
      { id: 5, name: 'Celana Pendek', brand: 'Uniqlo', price: 160000, oldPrice: 180000, image: require('../../assets/images/celana pendek laki2.jpg'), discount: 18, rating: 4.5, ratingCount: 8, favorite: false },

    ],
    [
      { id: 1, name: 'Dress', brand: 'Uniqlo', price: 250000, oldPrice: 300000, image: require('../../assets/images/dress.jpg'), discount: 17, rating: 4.2, ratingCount: 12, favorite: true },
      { id: 2, name: 'Blazer', brand: 'Erigo', price: 200000, oldPrice: 250000, image: require('../../assets/images/blazer.jpg'), discount: 20, rating: 4.7, ratingCount: 15, favorite: false },
      { id: 3, name: 'Rok', brand: 'Gaudi', price: 200000, oldPrice: 250000, image: require('../../assets/images/rok.jpg'), discount: 20, rating: 4.7, ratingCount: 15, favorite: false },
      { id: 4, name: 'Cardigan', brand: 'Colorbox', price: 200000, oldPrice: 250000, image: require('../../assets/images/knit.jpg'), discount: 20, rating: 4.7, ratingCount: 15, favorite: false },
      { id: 5, name: 'Sweater', brand: 'Uniqlo', price: 160000, oldPrice: 180000, image: require('../../assets/images/sweater.jpg'), discount: 18, rating: 4.5, ratingCount: 8, favorite: false },

    ],
    [
      { id: 1, name: 'Haircules', brand: 'Miniso', price: 210000, oldPrice: 260000, image: require('../../assets/images/jepitan.jpg'), discount: 19, rating: 4.3, ratingCount: 9, favorite: false },
      { id: 2, name: 'Anting Mutiara', brand: 'Strobery', price: 230000, oldPrice: 270000, image: require('../../assets/images/anting.jpg'), discount: 15, rating: 4.1, ratingCount: 7, favorite: false },
      { id: 3, name: 'Set Aksesoris', brand: 'Strobery', price: 230000, oldPrice: 270000, image: require('../../assets/images/paketan.jpg'), discount: 15, rating: 4.1, ratingCount: 7, favorite: false },
      { id: 4, name: 'Kacamata', brand: 'Balenciaga', price: 230000, oldPrice: 270000, image: require('../../assets/images/kacamata.jpg'), discount: 15, rating: 4.1, ratingCount: 7, favorite: false },
      { id: 5, name: 'Jam Tangan', brand: 'Alexandre Christie', price: 230000, oldPrice: 270000, image: require('../../assets/images/jam tangan.jpg'), discount: 15, rating: 4.1, ratingCount: 7, favorite: false },
      { id: 6, name: 'Topi', brand: 'CREATIVE', price: 230000, oldPrice: 270000, image: require('../../assets/images/topi 2.jpg'), discount: 15, rating: 4.1, ratingCount: 7, favorite: false },
    
    ],
    [
      { id: 1, name: 'One-strap Shoes', brand: 'Weiweinylang', price: 140000, oldPrice: 180000, image: require('../../assets/images/Weiweinylang.jpg'), discount: 22, rating: 4.6, ratingCount: 11, favorite: false },
      { id: 2, name: 'Cross Strap Shoes', brand: 'Weiweinylang', price: 160000, oldPrice: 200000, image: require('../../assets/images/sepatu cewe.jpg'), discount: 20, rating: 4.4, ratingCount: 13, favorite: false },
      { id: 3, name: 'Single Strap Shoes', brand: 'Agsdon', price: 190000, oldPrice: 200000, image: require('../../assets/images/Agsdon.jpg'), discount: 25, rating: 4.7, ratingCount: 13, favorite: false },
      { id: 4, name: 'Ribbon Shoes', brand: 'Hollister', price: 170000, oldPrice: 200000, image: require('../../assets/images/sepatu cewe 2.jpg'), discount: 20, rating: 4.5, ratingCount: 13, favorite: false },
      { id: 5, name: 'Girls Shoes', brand: 'Bostanten', price: 150000, oldPrice: 200000, image: require('../../assets/images/sepatu cewe 3.jpg'), discount: 23, rating: 4.4, ratingCount: 13, favorite: false },

    ],
    
    [
      { id: 1, name: 'Satu Set Cotton', brand: 'H&M', price: 190000, oldPrice: 240000, image: require('../../assets/images/satu set boys kids 2.jpg'), discount: 21, rating: 4.5, ratingCount: 10, favorite: false },
      { id: 2, name: 'Satu Set Kaos Garis', brand: 'H&M', price: 350000, oldPrice: 400000, image: require('../../assets/images/satu set boy kids 1.jpg'), discount: 12, rating: 4.0, ratingCount: 6, favorite: false },
      { id: 3, name: 'Satu Set Kaos', brand: 'H&M', price: 350000, oldPrice: 400000, image: require('../../assets/images/satu set boys kids.jpg'), discount: 12, rating: 4.0, ratingCount: 6, favorite: false },
      { id: 4, name: 'Mini Dress', brand: 'H&M', price: 350000, oldPrice: 400000, image: require('../../assets/images/girls 1.jpg'), discount: 12, rating: 4.0, ratingCount: 6, favorite: false },
      { id: 5, name: 'Mini Dress', brand: 'H&M', price: 350000, oldPrice: 400000, image: require('../../assets/images/girls 2.jpg'), discount: 12, rating: 4.0, ratingCount: 6, favorite: false },
      { id: 6, name: 'Mini Dress', brand: 'H&M', price: 350000, oldPrice: 400000, image: require('../../assets/images/girls 3.jpg'), discount: 12, rating: 4.0, ratingCount: 6, favorite: false },

    ],
    [
      { id: 1, name: 'Flower Shoes', brand: 'Keds Kids', price: 140000, oldPrice: 180000, image: require('../../assets/images/sepatu kids 1.jpg'), discount: 22, rating: 4.6, ratingCount: 11, favorite: false },
      { id: 2, name: 'Unicorn Series', brand: 'Cross Kids', price: 160000, oldPrice: 200000, image: require('../../assets/images/sepatu kids 2.jpg'), discount: 20, rating: 4.4, ratingCount: 13, favorite: false },
      { id: 3, name: 'Single Strap Shoes', brand: 'Strite Ride', price: 190000, oldPrice: 200000, image: require('../../assets/images/sepatu kids 3.jpg'), discount: 25, rating: 4.7, ratingCount: 13, favorite: false },
      { id: 4, name: 'Strappy Shoes', brand: 'Adidas', price: 170000, oldPrice: 200000, image: require('../../assets/images/sepatu cowo 1.jpg'), discount: 20, rating: 4.5, ratingCount: 13, favorite: false },
      { id: 5, name: 'Strappy Shoes', brand: 'Nike', price: 150000, oldPrice: 200000, image: require('../../assets/images/sepatu cowo 2.jpg'), discount: 23, rating: 4.4, ratingCount: 13, favorite: false },
      { id: 6, name: 'Strappy Shoes', brand: 'Nike', price: 150000, oldPrice: 200000, image: require('../../assets/images/sepatu cowo 3.jpg'), discount: 25, rating: 4.3, ratingCount: 13, favorite: false },

    ],

    
  ];
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  // Hapus semua penggunaan setProducts dan products, gunakan productRows saja
  const handleFavorite = (id: number) => {
    const allProducts = productRows.flat();
    const prod = allProducts.find(p => p.id === id);
    if (!prod) return;
    if (!isFavorite(id)) {
      addFavorite({ ...prod, favorite: true });
    } else {
      removeFavorite(id);
    }
  };

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
      <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
        <View style={styles.bannerWrapper}>
          <Image source={require('../../assets/images/1.jpg')} style={styles.banner} resizeMode="cover" />
          <View style={styles.bannerTextBottomLeft}>
            <View style={{ flexDirection: 'column', gap: 0 }}>
              <Text style={[styles.title, { fontFamily: 'Anton-Regular', fontWeight: '400', marginBottom: -25 }]}>Fashion</Text>
              <Text style={[styles.title, { fontFamily: 'Anton-Regular', fontWeight: '400' }]}>Sale</Text>
            </View>
            {/* Tombol Check */}
            <TouchableOpacity
              style={styles.checkBtn}
              onPress={() => {
                // Scroll ke bagian produk 'New'
                setTimeout(() => {
                  scrollRef.current?.scrollTo({ y: 635, animated: true });
                }, 10);
              }}
            >
              <Text style={styles.checkBtnText}>Check</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.section}>New</Text>
        {productRows.map((row, rowIdx) => (
          <View key={rowIdx} style={styles.offerRow}>
            <FlatList
              horizontal
              data={row}
              keyExtractor={(item: Product) => item.id + '-' + rowIdx}
              renderItem={({ item }) => (
                <ProductCard
                  item={{ ...item, favorite: isFavorite(item.id) }}
                  onPress={() => setModalVisible(true)}
                  onFavorite={() => handleFavorite(item.id)}
                />
              )}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 12 }}
              style={styles.horizontalList}
            />
          </View>
        ))}
        {/* Modal semua penawaran */}
        <Modal visible={allOffersVisible} animationType="slide" onRequestClose={() => setAllOffersVisible(false)}>
          <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 40 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, marginBottom: 10 }}>
              <Text style={{ fontSize: 22, fontWeight: 'bold' }}>All Offers</Text>
              <TouchableOpacity onPress={() => setAllOffersVisible(false)}>
                <Ionicons name="close" size={28} color="#888" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={productRows.flat()}
              keyExtractor={(item: Product) => String(item.id) + '-' + item.name}
              numColumns={2}
              renderItem={({ item }) => (
                <ProductCard
                  item={{ ...item, favorite: isFavorite(item.id) }}
                  onPress={() => setModalVisible(true)}
                  onFavorite={() => handleFavorite(item.id)}
                  // style={{ margin: 8, flex: 1 }}
                />
              )}
              contentContainerStyle={{ padding: 8 }}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </Modal>
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
  checkBtn: {
    backgroundColor: '#D6281B',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 24,
    alignSelf: 'flex-start',
    marginTop: 16,
    marginLeft: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  checkBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
  },
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
