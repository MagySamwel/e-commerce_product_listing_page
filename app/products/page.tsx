import BrandBar from "@/components/filters/brandBar";
import FiltersPanel from "@/components/filters/filtersPanel";
import MobileFilterModal from "@/components/filters/MobileFilterModal";
import SortPanel from "@/components/filters/sortPanel";
import ProductGrid from "@/components/products/productGrid";
import { fetchProducts, ProductsApiResponse } from "@/lib/api/products";
import { ProductFilters } from "@/lib/types/filters";
import ErrorPage from "@/components/ui/error";
import Image from "next/image";

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function getProducts(
  filters: ProductFilters,
  language: "en" | "fr"
): Promise<{ data: ProductsApiResponse | null; error: string | null }> {
  try {
    const response = await fetchProducts(filters, language);
    return { data: response, error: null };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err.message : "Failed to fetch products",
    };
  }
}

async function Page({ searchParams }: ProductsPageProps) {
  const params = await searchParams;

  const filters: ProductFilters = {
    brand: params?.brand as ProductFilters["brand"],
    size: params?.size as ProductFilters["size"],
    status: params?.status as ProductFilters["status"],
    min_price: params?.min_price as ProductFilters["min_price"],
    max_price: params?.max_price as ProductFilters["max_price"],
    min_rating: params?.min_rating ? Number(params.min_rating) : undefined,
    sort_by: params?.sort_by as ProductFilters["sort_by"],
    sort_order: params?.sort_order as ProductFilters["sort_order"],
    page: params?.page ? Number(params.page) : undefined,
  };

  const language = (params?.lang as "en" | "fr") || "en";

  const { data: response, error } = await getProducts(filters, language);

  if (error || !response) {
    return <ErrorPage error={new Error()} />;
  }

  const { data: products, pagination } = response;

  return (
    <div className="min-h-screen">
      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        {/* Left Sidebar - Filters */}
        <aside className="w-72 flex-shrink-0 border-r border-gray-300 bg-[#fefefe] sticky top-0 h-screen overflow-y-auto">
          <FiltersPanel />
        </aside>

        {/* Right Content Area */}
        <main className="flex-1 min-w-0">
          {/* Top Bar: Brand Bar + Sort */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-300 bg-white sticky top-0 z-10">
            <BrandBar />
            <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
              <button className="px-4 py-2 rounded-lg hover:bg-gray-200">
                <p className="text-gray-500 text-sm">fr</p>
              </button>
              <button className="px-4 py-2 rounded-lg hover:bg-gray-200">
                <p className="text-gray-500 text-sm">en</p>
              </button>
            </div>
            <SortPanel />
          </div>

          {/* Products Grid */}
          <div className="p-4">
            {products.length > 0 ? (
              <ProductGrid products={products} />
            ) : (
              <div className="flex items-center flex-col justify-center py-20">
                <Image
                  src="/images/noData.svg"
                  alt="No Data"
                  width={300}
                  height={300}
                />
                <p className="text-gray-600 text-lg mt-4">
                  No products found matching the selected filters.
                </p>
              </div>
            )}

          </div>
        </main>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden relative">
        {/* Brand Bar */}
        <BrandBar />

        {/* Filter Button + Sort */}
          <MobileFilterModal />

        {/* Products Grid */}
        <div className="p-4">
          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div className="flex items-center flex-col justify-center py-20">
              <Image
                src="/images/noData.svg"
                alt="No Data"
                width={200}
                height={200}
              />
              <p className="text-gray-600 text-base mt-4 text-center px-4">
                No products found matching the selected filters.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Page;
