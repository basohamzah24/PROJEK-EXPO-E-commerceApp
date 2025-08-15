import * as Font from 'expo-font';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
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
      <View style={styles.header}></View>
      <ScrollView>
        <View style={styles.bannerWrapper}>
          <Image source={require('../../assets/images/1.jpg')} style={styles.banner} resizeMode="cover" />
          <View style={styles.bannerTextBottomLeft}>
            <Text style={[styles.title, { fontFamily: 'Anton-Regular', fontWeight: '400' }]}>Fashion</Text>
            <Text style={[styles.title, { fontFamily: 'Anton-Regular', fontWeight: '400' }]}>Sale</Text>
          </View>
          
        </View>
        <Text style={styles.section}>New</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.row} contentContainerStyle={styles.rowContent}>
          {[
            require('../../assets/images/1.jpg'),
            require('../../assets/images/2.jpg'),
            require('../../assets/images/3.jpg'),
            require('../../assets/images/4.jpg'),
            require('../../assets/images/5.jpg'),
          ].map((img, i) => (
            <Image key={i} source={img} style={styles.itemImg} />
          ))}
        </ScrollView>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.row} contentContainerStyle={styles.rowContent}>
          {[
            require('../../assets/images/1.jpg'),
            require('../../assets/images/2.jpg'),
            require('../../assets/images/3.jpg'),
            require('../../assets/images/4.jpg'),
            require('../../assets/images/5.jpg'),
          ].map((img, i) => (
            <Image key={i} source={img} style={styles.itemImg} />
          ))}
        </ScrollView>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.row} contentContainerStyle={styles.rowContent}>
          {[
            require('../../assets/images/1.jpg'),
            require('../../assets/images/2.jpg'),
            require('../../assets/images/3.jpg'),
            require('../../assets/images/4.jpg'),
            require('../../assets/images/5.jpg'),
          ].map((img, i) => (
            <Image key={i} source={img} style={styles.itemImg} />
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15},
  bannerWrapper: { position: 'relative', width: '100%', height: 600, marginBottom: 10 },
  banner: { width: '100%', height: 600, borderRadius:10 },
  bannerTextBottomLeft: { position: 'absolute', left: 16, bottom: 9 },
  title: { fontSize: 32, fontWeight: '600', color: '#861a1aff', paddingHorizontal: 23, paddingVertical: 0, borderRadius: 12 },
  section: { fontSize: 18, fontWeight: '600', marginLeft: 16, marginBottom: 9 },
  row: { marginLeft: 16, marginBottom: 16 },
  rowContent: { flexDirection: 'row', alignItems: 'center' },
  itemImg: { width: 100, height: 140, borderRadius: 12, marginRight: 12 }
});
