import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Plus, ShoppingBag } from "lucide-react";
import {
  fetchProductById,
  ProductDetailsApiResponse,
} from "@/lib/api/products";
import ErrorPage from "@/components/ui/error";
import RatingStars from "@/components/ui/ratingStars";
import { ProductDetails } from "@/lib/api/products";
import SizeSelector from "@/components/products/SizeSelector";
import ReviewsSection from "@/components/products/ReviewsSection";
import { Suspense } from "react";
import ProductSkelton from "@/components/ui/productSkelton";

interface ProductDetailsPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function getProduct(
  productId: number,
  language: "en" | "fr"
): Promise<{ data: ProductDetailsApiResponse | null; error: string | null }> {
  try {
    const response = await fetchProductById(productId, language);
    return { data: response, error: null };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err.message : "Failed to fetch product",
    };
  }
}

export default async function ProductDetailsPage({
  params,
  searchParams,
}: ProductDetailsPageProps) {
  const { id } = await params;
  const searchParamsResolved = await searchParams;
  const language = (searchParamsResolved?.lang as "en" | "fr") || "en";

  const productId = parseInt(id);
  if (isNaN(productId)) {
    return <ErrorPage error={new Error("Invalid product ID")} />;
  }

  const { data: response, error } = await getProduct(productId, language);

  if (error || !response || !response.data) {
    return <ErrorPage error={new Error("Product not found")} />;
  }

  const product: ProductDetails = response.data;
  const allSizes = ["XS", "S", "M", "L", "XL"];

  return (
    <div className="min-h-screen bg-[#fefefe]">
      {/* Back Button */}
      <div className="fixed top-5 left-5 z-10">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-[#0C4B54] hover:text-[#0A3B44] transition-colors"
        >
          <ArrowLeft
            size={30}
            className="bg-white rounded-full p-2 lg:bg-[#0C4B54] lg:text-white"
          />
        </Link>
      </div>
      <div className="fixed top-5 right-5 z-10 lg:hidden">
        <ShoppingBag
          size={30}
          color="black"
          className="bg-white rounded-full p-2"
        />
      </div>
      <Suspense fallback={<ProductSkelton />}>
        {/* Product Details */}
        <div className="max-w-7xl mx-auto md:px-4 md:py-8">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Large Image */}
            <div className="relative md:sticky w-full md:top-15 md:w-[300px] md:h-[400px] lg:w-[500px] mx-auto h-[400px] md:rounded-lg lg:h-[600px] overflow-hidden bg-gray-100">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="px-4 py-5">
              {/* Right: Product Information */}
              <div className="space-y-3">
                {/* Brand */}
                {product.brands && product.brands.length > 0 && (
                  <p className="text-sm text-gray-600 uppercase tracking-wide">
                    {product.brands[0]}
                  </p>
                )}
                <div className="flex justify-between space-y-2 md:flex-row">
                  {/* Name */}
                  <h1 className="text-3xl m-0 font-bold text-[#1F2A37]">
                    {product.name}
                  </h1>

                  {/* Price */}
                  <div className="text-3xl font-bold text-[#0C4B54]">
                    ${Number(product.price).toFixed()}
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-3 hidden md:flex">
                  <RatingStars rating={product.average_rating} />
                  <span className="text-sm text-gray-600">
                    ({product.reviews_count}{" "}
                    {product.reviews_count === 1 ? "review" : "reviews"})
                  </span>
                </div>

                <div className="flex flex-col space-y-5">
                  {/* Description */}
                  <div className="order-1 md:order-0">
                    <h3 className="font-medium text-lg text-[#1F2A37] mb-2">
                      Description
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                  <div className="order-0 md:order-1 mb-2">
                    {/* Size Selector */}
                    <SizeSelector
                      sizes={allSizes}
                      availableSizes={product.available_sizes || []}
                    />
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button className="w-full flex items-center justify-center py-4 bg-[#0C4B54] text-white rounded-lg font-semibold text-lg hover:bg-[#0A3B44] transition-colors">
                  <Plus className="me-1" size={20} /> Add to Cart
                </button>

                {/* Reviews Section */}
                <ReviewsSection
                  reviews={product.reviews || []}
                  average={product.average_rating}
                />
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
}
