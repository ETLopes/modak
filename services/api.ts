import { Category } from '@/types/Category';
import { Product } from '@/types/Product';
import axios from 'axios';

const API_URL = 'https://dummyjson.com/products';

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${API_URL}?limit=0`);
    return response.data.products;
  } catch (error: any) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products. Please try again later.');
  }
};

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories. Please try again later.');
  }
};

export const getProductById = async (id: number): Promise<Product> => {
  try {
    const response = await axios.get<Product>(`${API_URL}/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching product by ID:', error);
    throw new Error(`Failed to fetch product with ID ${id}. Please try again later.`);
  }
};