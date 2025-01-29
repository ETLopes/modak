import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { fetchProducts, fetchCategories } from '../../services/api';
import { CategoriesModal } from '@/components/Modal';
import { ProductsList } from '@/components/ProductsList';
import { Header } from '@/components/Header';
import { Product } from '@/types/Product';
import { Category } from '@/types/Category';
import { ProductItem } from '@/components/ProductItem';

export default function HomeScreen() {
  const [products, setProducts] = useState<Array<Product>>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOption, setSortOption] = useState('price');
  const [isPickerVisible, setPickerVisible] = useState(false);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };

    loadInitialData();
  }, []);

  const filterProducts = () => {
    if (selectedCategory) {
      return products.filter((product: Product) => product.category === selectedCategory);
    }
    return products;
  };

  const sortProducts = (productsToSort: Array<Product>) => {
    return [...productsToSort].sort((a, b) => {
      if (sortOption === 'price') {
        return a.price - b.price;
      } else if (sortOption === 'rating') {
        return b.rating - a.rating;
      }
      return 0;
    });
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <ProductItem {...item} />
  );

  const filteredAndSortedProducts = sortProducts(filterProducts());

  return (
    <View style={styles.container}>
      <Header setPickerVisible={setPickerVisible} setSortOption={setSortOption} />
      <ProductsList filteredAndSortedProducts={filteredAndSortedProducts} renderProduct={renderProduct} />
      <CategoriesModal categories={categories} isPickerVisible={isPickerVisible} setPickerVisible={setPickerVisible} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});