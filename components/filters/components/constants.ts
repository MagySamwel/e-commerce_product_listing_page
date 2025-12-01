export const SORT_OPTIONS = [
  { label: 'Most Recommended', sort_by: undefined, sort_order: undefined },
  { label: 'Price: Lowest First', sort_by: 'price', sort_order: 'asc' },
  { label: 'Price: Highest First', sort_by: 'price', sort_order: 'desc' },
  { label: 'Best Rating', sort_by: 'rating', sort_order: 'desc' },
] as const;

export const PRICE_RANGES = [
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $200", min: 100, max: 200 },
  { label: "$200 - $500", min: 200, max: 500 },
  { label: "$500+", min: 500, max: undefined },
] as const;

export const SIZES = ["XS", "S", "M", "L", "XL"] as const;

export const RATING_OPTIONS = [
  { label: "4+ stars", value: 4 },
  { label: "3+ stars", value: 3 },
  { label: "2+ stars", value: 2 },
  { label: "All ratings", value: undefined },
] as const;
