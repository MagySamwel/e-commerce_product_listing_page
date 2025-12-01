function ProductSkelton() {
  return (
    <div className="rounded-xl lg:p-10 flex gap-20 flex-col md:flex-row animate-pulse">
      {/* Image skeleton */}
      <div className="relative w-130 h-100 lg:h-160 bg-gray-200 rounded-2xl" />

      {/* Content skeleton */}
      <div className="mt-2 space-y-2">
        {/* Product name */}
        <div className="h-8 bg-gray-200 rounded w-10" />
        {/* Brand */}
        <div className="h-8 bg-gray-200 rounded w-10 md:w-100 " />
        {/* Rating */}
        <div className="flex gap-1">
          <div className="h-10 bg-gray-200 rounded w-20" />
          <div className="h-10 bg-gray-200 rounded w-8" />
        </div>
        {/* Price */}
        <div className="h-10 bg-gray-200 rounded w-16" />
      </div>
    </div>
  )
}

export default ProductSkelton