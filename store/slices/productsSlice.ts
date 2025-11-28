import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {Product} from '../../lib/types/product';
import { ProductFilters } from '../../lib/types/filters';
import { Review } from '../../lib/types/review';
import {buildQueryString} from '../../lib/utils/buildQueryString';

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

interface ProductsState {
  products: Product[];
  selectedProduct: ProductDetails | null;
  pagination: Pagination | null;
  filters: ProductFilters;
  language: Language;
  loading: boolean;
  loadingProduct: boolean;
  error: string | null;
  productError: string | null;
}

const initialState: ProductsState = {
  products: [],
  selectedProduct: null,
  pagination: null,
  filters: {},
  language: 'en',
  loading: false,
  loadingProduct: false,
  error: null,
  productError: null,
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
console.log('API_BASE_URL:', API_BASE_URL);
// Async thunk to fetch all products with filters
export const fetchProducts = createAsyncThunk<
  ProductsApiResponse,
  ProductFilters | undefined,
  { state: { products: ProductsState }; rejectValue: string }
>(
  'products/fetchProducts',
  async (filters, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const language = state.products.language;
      const queryString = buildQueryString(filters || {});
      const url = `${API_BASE_URL}/products${queryString ? `?${queryString}` : ''}`;

      const response = await fetch(url, {
        headers: {
          'Accept-Language': language,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ProductsApiResponse = await response.json();

      if (data.error) {
        throw new Error(data.message || 'Failed to fetch products');
      }

      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch products'
      );
    }
  }
);

// Async thunk to fetch a single product by ID
export const fetchProductById = createAsyncThunk<
  ProductDetailsApiResponse,
  number,
  { state: { products: ProductsState }; rejectValue: string }
>(
  'products/fetchProductById',
  async (productId, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const language = state.products.language;
      const url = `${API_BASE_URL}/products/${productId}`;

      const response = await fetch(url, {
        headers: {
          'Accept-Language': language,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ProductDetailsApiResponse = await response.json();

      if (data.error) {
        throw new Error('Failed to fetch product details');
      }

      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch product'
      );
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<ProductFilters>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {};
    },
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
      state.productError = null;
    },
    clearError: (state) => {
      state.error = null;
      state.productError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data;
        state.pagination = action.payload.pagination;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch products';
      })
      // Fetch single product
      .addCase(fetchProductById.pending, (state) => {
        state.loadingProduct = true;
        state.productError = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loadingProduct = false;
        state.selectedProduct = action.payload.data;
        state.productError = null;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loadingProduct = false;
        state.productError = action.payload || 'Failed to fetch product';
      });
  },
});

export const {
  setFilters,
  clearFilters,
  setLanguage,
  clearSelectedProduct,
  clearError,
} = productsSlice.actions;

export default productsSlice.reducer;
