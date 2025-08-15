import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CARD_WIDTH = Dimensions.get('window').width * 0.42;
const CARD_HEIGHT = Dimensions.get('window').height * 0.36;

export type Product = {
  id: number;
  image: any;
  name: string;
  brand: string;
  price: number;
  oldPrice: number | null;
  discount: number | null;
  rating: number;
  ratingCount: number;
  favorite: boolean;
};

interface ProductCardProps {
  item: Product;
  onPress: () => void;
  onFavorite?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = React.memo((props) => {
  const { item, onPress, onFavorite } = props;
  const [pressed, setPressed] = React.useState(false);
  return (
    <View style={[styles.cardHorizontal, pressed && styles.cardPressed]}>
      <View style={styles.imgWrapper}>
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.8}
          onPressIn={() => setPressed(true)}
          onPressOut={() => setPressed(false)}
        >
          <Image source={item.image} style={styles.cardImgHorizontal} resizeMode="cover" />
        </TouchableOpacity>
        {item.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{item.discount}%</Text>
          </View>
        )}
  <TouchableOpacity style={styles.favBtn} activeOpacity={0.7} onPress={typeof onFavorite === 'function' ? onFavorite : undefined}>
          <Ionicons name={item.favorite ? 'heart' : 'heart-outline'} size={22} color={item.favorite ? '#D6281B' : '#888'} />
        </TouchableOpacity>
      </View>
      <View style={styles.ratingRow}>
        {[...Array(5)].map((_, i) => (
          <Ionicons key={i} name={i < item.rating ? 'star' : 'star-outline'} size={16} color="#FFD700" />
        ))}
        <Text style={styles.ratingCount}>({item.ratingCount})</Text>
      </View>
      <Text style={styles.brand}>{item.brand}</Text>
      <Text style={styles.productName}>{item.name}</Text>
      <View style={styles.priceRow}>
        {item.oldPrice && (
          <Text style={styles.oldPrice}>{item.oldPrice}$</Text>
        )}
        <Text style={styles.price}>{item.price}$</Text>
      </View>
    </View>
  );
});
ProductCard.displayName = 'ProductCard';

const styles = StyleSheet.create({
  cardHorizontal: {
    backgroundColor: '#fff',
    borderRadius: 18,
    marginRight: 16,
    width: CARD_WIDTH,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    paddingBottom: 10,
    marginVertical: 8,
  },
  cardPressed: {
    elevation: 6,
    shadowOpacity: 0.18,
    transform: [{ scale: 0.97 }],
  },
  imgWrapper: {
    position: 'relative',
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 8,
  },
  cardImgHorizontal: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 18,
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#D6281B',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  discountText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },
  favBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 4,
    elevation: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  ratingCount: {
    fontSize: 13,
    color: '#888',
    marginLeft: 4,
  },
  brand: {
    fontSize: 14,
    color: '#888',
    marginBottom: 2,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  oldPrice: {
    fontSize: 14,
    color: '#888',
    textDecorationLine: 'line-through',
    marginRight: 6,
  },
  price: {
    fontSize: 16,
    color: '#D6281B',
    fontWeight: 'bold',
  },
});

export default ProductCard;
