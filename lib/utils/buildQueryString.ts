import { ProductFilters } from '../types/filters';

// Helper function to build query string from filters

export const buildQueryString = (filters: ProductFilters): string => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;

    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (v !== undefined && v !== null && v !== '') {
          params.append(key, String(v));
        }
      });
      return;
    }

    params.append(key, String(value));
  });

  return params.toString();
};