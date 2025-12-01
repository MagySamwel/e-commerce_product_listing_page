export interface ProductFilters {
  size?: 'XS' | 'S' | 'M' | 'L' | 'XL' | Array<'XS' | 'S' | 'M' | 'L' | 'XL'>;
  brand?: 'Nike' | 'Adidas' | 'Puma' | 'Reebok';
  status?: 'active' | 'inactive';
  min_price?: number | number[];
  max_price?: number | number[];
  min_rating?: number;
  sort_by?: 'price' | 'rating' | 'created_at';
  sort_order?: 'asc' | 'desc';
  page?: number;
}
