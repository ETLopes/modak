import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchProducts, fetchCategories } from '../../services/api';
import { CategoriesModal } from '@/components/Modal';
import { ProductsList } from '@/components/ProductsList';
import { Header, SortOption } from '@/components/Header';
import { Product } from '@/types/Product';
import { Category } from '@/types/Category';
import { ProductItem } from '@/components/ProductItem';
import { requestCalendarPermissions } from '@/utils/permissions';

export default function HomeScreen() {
  const [products, setProducts] = useState<Array<Product>>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortOption, setSortOption] = useState<SortOption>('price');
  const [isPickerVisible, setPickerVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);

        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
        setError(null);

      } catch (error: unknown) {
        console.error('Failed to load data:', error);
        setError((error as Error).message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
    requestCalendarPermissions();
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
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <ProductsList
          filteredAndSortedProducts={filteredAndSortedProducts}
          renderProduct={renderProduct}
        />
      )}

      <CategoriesModal categories={categories} isPickerVisible={isPickerVisible} setPickerVisible={setPickerVisible} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loadingIndicator: {
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
});