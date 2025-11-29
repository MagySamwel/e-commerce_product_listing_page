import BrandBar from "@/components/filters/brandBar";
import ProductGrid from "@/components/products/productGrid";
import { fetchProducts, ProductsApiResponse } from "@/lib/api/products";
import { ProductFilters } from "@/lib/types/filters";

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function getProducts(
  filters: ProductFilters,
  language: 'en' | 'fr'
): Promise<{ data: ProductsApiResponse | null; error: string | null }> {
  try {
    const response = await fetchProducts(filters, language);
    return { data: response, error: null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : 'Failed to fetch products' };
  }
}

async function Page({ searchParams }: ProductsPageProps) {
  // Parse search params into filters
  const params = await searchParams;

  const filters: ProductFilters = {
    brand: params?.brand as ProductFilters['brand'],
    size: params?.size as ProductFilters['size'],
    status: params?.status as ProductFilters['status'],
    min_price: params?.min_price ? Number(params.min_price) : undefined,
    max_price: params?.max_price ? Number(params.max_price) : undefined,
    min_rating: params?.min_rating ? Number(params.min_rating) : undefined,
    sort_by: params?.sort_by as ProductFilters['sort_by'],
    sort_order: params?.sort_order as ProductFilters['sort_order'],
    page: params?.page ? Number(params.page) : undefined,
  };

  // Get language from params or default to 'en'
  const language = (params?.lang as 'en' | 'fr') || 'en';

  const { data: response, error } = await getProducts(filters, language);

  if (error || !response) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-red-500">
          Failed to load products. Please try again later.
        </p>
      </div>
    );
  }

  const { data: products, pagination } = response;

  return (
    <div>
      {/* Brand Filter Bar */}
      <BrandBar />

      {/* Products Section */}
      <div className="px-4 py-6">
        {/* Products Grid */}
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <p className="text-center text-gray-500 py-12">No products found.</p>
        )}

        {/* Pagination info */}
        {pagination && (
          <div className="mt-6 text-center text-sm text-gray-500">
            Showing {pagination.count} of {pagination.total} products
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;