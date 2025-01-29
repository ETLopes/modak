export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
  rating: number;
  description: string;
  brand: string;
  stock: number;
}

export interface ProductRepository {
  getProducts(): Promise<Product[]>;
  getCategories(): Promise<string[]>;
  getProductById(id: number): Promise<Product | null>;
}