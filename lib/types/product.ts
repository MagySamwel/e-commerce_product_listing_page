export interface Product {
  id: number;
  image: string;
  price: string;
  status: 'active' | 'inactive';
  name: string;
  description: string;
  brands: string[];
  sizes: string[];
  average_rating: number;
  reviews_count: number;
  created_at: string;
  updated_at: string;
}