'use client';
import { useEffect, useState } from "react";
import ProductGrid from "../../components/products/productGrid";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchProducts } from "@/store/slices/productsSlice";
import { ProductFilters } from "@/lib/types/filters";
import ProductCard from "@/components/products/productCard";

function Page() {
   const dispatch = useAppDispatch();
  const { products, loading: isLoading, error } = useAppSelector((state) => state.products);
  const [filters, setFilters] = useState<ProductFilters>({});
  // const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts(filters));
  }, [dispatch, filters]);
  return (
    <div>
            {/* Products Grid */}
            {!isLoading && !error && products.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
    </div>
  )
}

export default Page;