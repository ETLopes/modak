import React from 'react';
import { View, TouchableOpacity, Text, Button, StyleSheet } from 'react-native';

export type SortOption = 'price' | 'rating';
export interface HeaderProps {
  setPickerVisible: (visible: boolean) => void;
  setSortOption: (option: SortOption) => void;
}

export const Header = ({ setPickerVisible, setSortOption }: HeaderProps) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={() => setPickerVisible(true)} style={styles.filterButton}>
      <Text style={styles.filterButtonText}>Filter by Category</Text>
    </TouchableOpacity>

    <View style={styles.sortContainer}>
      <Button title="Price" onPress={() => setSortOption('price')} />
      <Button title="Rating" onPress={() => setSortOption('rating')} />
    </View>
  </View>
)

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  filterButton: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  filterButtonText: {
    fontSize: 16,
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },
})
