export default function Skelton() {
  return (
    <div className="rounded-xl p-1 animate-pulse">
      {/* Image skeleton */}
      <div className="relative w-full h-56 bg-gray-200 rounded-2xl" />

      {/* Content skeleton */}
      <div className="mt-2 space-y-2">
        {/* Product name */}
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        {/* Brand */}
        <div className="h-3 bg-gray-200 rounded w-1/3" />
        {/* Rating */}
        <div className="flex gap-1">
          <div className="h-3 bg-gray-200 rounded w-20" />
          <div className="h-3 bg-gray-200 rounded w-8" />
        </div>
        {/* Price */}
        <div className="h-5 bg-gray-200 rounded w-16" />
        {/* Status */}
        <div className="flex items-center gap-1">
          <div className="h-2.5 w-2.5 bg-gray-200 rounded-full" />
          <div className="h-3 bg-gray-200 rounded w-12" />
        </div>
      </div>
    </div>
  );
}
