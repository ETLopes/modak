import React from 'react';
import { Product } from '@/types/Product';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export interface ProductsListProps {
  filteredAndSortedProducts: Array<Product>;
  renderProduct: ({ item }: {
    item: Product;
  }) => React.JSX.Element
}

export const ProductsList = ({ filteredAndSortedProducts, renderProduct }: ProductsListProps) => {
  return (
    <FlatList
      data={filteredAndSortedProducts}
      renderItem={renderProduct}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.list}
    />
  )
}

const styles = StyleSheet.create({
  list: {
    padding: 10,
  },
})