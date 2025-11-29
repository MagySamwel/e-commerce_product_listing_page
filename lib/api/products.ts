import { Product } from '../types/product';
import { ProductFilters } from '../types/filters';
import { Review } from '../types/review';
import { buildQueryString } from '../utils/buildQueryString';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Types for API responses
export interface ProductDetails extends Omit<Product, 'sizes'> {
  available_sizes: string[];
  reviews: Review[];
}

export interface Pagination {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
}

export interface ProductsApiResponse {
  status: number;
  error: boolean;
  message: string;
  data: Product[];
  pagination: Pagination;
}

export interface ProductDetailsApiResponse {
  status: number;
  error: boolean;
  data: ProductDetails;
}

export type Language = 'en' | 'fr';


export async function fetchProducts(
  filters?: ProductFilters,
  language: Language = 'en'
): Promise<ProductsApiResponse> {
  const queryString = buildQueryString(filters || {});
  const url = `${API_BASE_URL}/products${queryString ? `?${queryString}` : ''}`;

  const response = await fetch(url, {
    headers: {
      'Accept-Language': language,
    },
    next: { revalidate: 60 }, // Cache for 60 seconds
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: ProductsApiResponse = await response.json();

  if (data.error) {
    throw new Error(data.message || 'Failed to fetch products');
  }

  return data;
}


export async function fetchProductById(
  productId: number,
  language: Language = 'en'
): Promise<ProductDetailsApiResponse> {
  const url = `${API_BASE_URL}/products/${productId}`;

  const response = await fetch(url, {
    headers: {
      'Accept-Language': language,
    },
    next: { revalidate: 60 }, // Cache for 60 seconds
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: ProductDetailsApiResponse = await response.json();

  if (data.error) {
    throw new Error('Failed to fetch product details');
  }

  return data;
}

