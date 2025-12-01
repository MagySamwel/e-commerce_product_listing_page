"use client";
import PriceSection from "@/components/filters/components/PriceSection";
import SizeSection from "@/components/filters/components/SizeSection";
import RatingSection from "@/components/filters/components/RatingSection";
import { useProductFilters } from "@/hooks/useProductFilters";
import { useState, useMemo } from "react";

export default function FiltersPanel() {
  const { currentFilters, activeFiltersCount, clearAll, togglePriceRange, toggleSize, setRating } = useProductFilters();
  const [openSections, setOpenSections] = useState({
    price: true,
    size: true,
    rating: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Convert price filters to Set format
  const selectedPrices = useMemo(() => {
    const prices = new Set<string>();
    const mins = currentFilters.min_price || [];
    const maxs = currentFilters.max_price || [];

    for (let i = 0; i < Math.max(mins.length, maxs.length); i++) {
      const min = Number(mins[i] || 0);
      const max = maxs[i] ? Number(maxs[i]) : undefined;
      const priceKey = `${min}-${max ?? 'inf'}`;
      prices.add(priceKey);
    }

    return prices;
  }, [currentFilters.min_price, currentFilters.max_price]);

  // Convert size filters to Set format
  const selectedSizes = useMemo(() => {
    return new Set(currentFilters.size || []);
  }, [currentFilters.size]);

  // Get selected rating
  const selectedRating = currentFilters.min_rating;

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>

        {activeFiltersCount > 0 && (
          <button
            onClick={clearAll}
            className="text-sm text-gray-500 hover:text-black"
          >
            Clear All ({activeFiltersCount})
          </button>
        )}
      </div>

      <PriceSection
        isOpen={openSections.price}
        onToggle={() => toggleSection("price")}
        selectedPrices={selectedPrices}
        onPriceToggle={togglePriceRange}
      />
      <SizeSection
        isOpen={openSections.size}
        onToggle={() => toggleSection("size")}
        selectedSizes={selectedSizes}
        onSizeToggle={toggleSize}
      />
      <RatingSection
        isOpen={openSections.rating}
        onToggle={() => toggleSection("rating")}
        selectedRating={selectedRating}
        onRatingChange={setRating}
      />
    </div>
  );
}
