import { Category } from '@/types/Category';
import axios from 'axios';

const API_URL = 'https://dummyjson.com/products';



export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}?limit=0`);
    return response.data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get(`${API_URL}/categories`);
    const categoriesList: Category[] = response.data;
    return categoriesList
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};