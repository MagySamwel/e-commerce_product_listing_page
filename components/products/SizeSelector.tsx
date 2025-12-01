"use client";
import { useState } from "react";

interface SizeSelectorProps {
  sizes: string[];
  availableSizes: string[];
}

export default function SizeSelector({
  sizes,
  availableSizes,
}: SizeSelectorProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  return (
    <div className="mb-3">
      <h3 className="font-medium text-lg text-[#1F2A37] mb-2">Size</h3>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => {
          const isAvailable = availableSizes.includes(size);
          const isSelected = selectedSize === size;

          return (
            <button
              key={size}
              onClick={() => isAvailable && setSelectedSize(size)}
              disabled={!isAvailable}
              className={`font-medium px-4 py-2 rounded-lg min-w-[50px] ${
                isSelected
                  ? "bg-[#0C4B54] text-white"
                  : isAvailable
                  ? "bg-[#f3f3f3] text-[#1F2A37] hover:bg-[#e0e0e0]"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed opacity-50"
              }`}
            >
              {size}
            </button>
          );
        })}
      </div>
      {availableSizes.length === 0 && (
        <p className="text-sm text-gray-500 mt-2">No sizes available</p>
      )}
    </div>
  );
}
