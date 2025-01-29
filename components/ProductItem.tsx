import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Product } from '@/types/Product';


export const ProductItem = (item: Partial<Product>) => {
  return (
    <View style={styles.productContainer}>
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>${item.price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  thumbnail: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    flex: 1,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});


