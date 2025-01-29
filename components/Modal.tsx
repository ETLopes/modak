import React from 'react';
import { View, Modal, Button, StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker';

interface CategoriesModalProps {
  categories: Array<{ name: string; slug: string }>;
  isPickerVisible: boolean;
  setPickerVisible: (visible: boolean) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;

}


export const CategoriesModal = ({ categories, isPickerVisible, setPickerVisible, selectedCategory, setSelectedCategory }: CategoriesModalProps) => (
  <Modal
    visible={isPickerVisible}
    transparent={true}
    animationType="slide"
    onRequestClose={() => setPickerVisible(false)}
  >
    <View style={styles.modalContainer}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        >
          <Picker.Item label="All Categories" value="" />
          {categories.map((category, idx) => (
            <Picker.Item key={idx} label={category.name} value={category.slug} />
          ))}
        </Picker>
        <Button title="Close" onPress={() => setPickerVisible(false)} />
      </View>
    </View>
  </Modal>
)

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerContainer: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 10,
    padding: 20,
  },
})
