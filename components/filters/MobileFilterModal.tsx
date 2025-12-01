"use client";
import { useState, useMemo } from "react";
import { X, SlidersHorizontal, ChevronRight } from "lucide-react";
import { useProductFilters } from "@/hooks/useProductFilters";
import SortSectionMobile from "./components/SortSectionMobile";
import PriceSection from "./components/PriceSection";
import SizeSection from "./components/SizeSection";
import RatingSection from "./components/RatingSection";

type SectionKey = "price" | "size" | "rating";

export default function MobileFilterModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSections, setOpenSections] = useState<Record<SectionKey, boolean>>(
    {
      price: true,
      size: true,
      rating: true,
    }
  );
  const [isSortBottomSheetOpen, setIsSortBottomSheetOpen] = useState(false);

  const {
    activeFiltersCount,
    initializePendingFilters,
    applyPending,
    getCurrentValue,
    getSelectedPrices,
    getSelectedSizes,
    togglePriceRangePending,
    toggleSizePending,
    setRatingPending,
    setSortPending,
    clearAll,
  } = useProductFilters();

  // Get current values
  const selectedPrices = useMemo(
    () => getSelectedPrices(),
    [getSelectedPrices]
  );
  const selectedSizes = useMemo(() => getSelectedSizes(), [getSelectedSizes]);
  const selectedRating = useMemo(
    () => getCurrentValue("min_rating"),
    [getCurrentValue]
  );
  const currentSortBy = useMemo(
    () => getCurrentValue("sort_by"),
    [getCurrentValue]
  );
  const currentSortOrder = useMemo(
    () => getCurrentValue("sort_order"),
    [getCurrentValue]
  );

  // Handlers
  const openModal = () => {
    initializePendingFilters();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setIsSortBottomSheetOpen(false);
  };

  const toggleSection = (section: SectionKey) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleApply = () => {
    applyPending();
    closeModal();
  };

  const handleClearAll = () => {
    clearAll();
    closeModal();
  };

  return (
    <>
      {/* Filter Button */}
      <button
        onClick={openModal}
        className="fixed bottom-3 right-4 z-10 flex items-center gap-2 p-2 bg-[#0C4B54] rounded-full text-sm font-medium hover:bg-[#0A3B44] shadow-lg"
        aria-label="Open filters"
      >
        <SlidersHorizontal size={25} color="white" />
        {activeFiltersCount > 0 && (
          <span className="bg-white text-black text-xs px-2 py-0.5 rounded-full font-semibold">
            {activeFiltersCount}
          </span>
        )}
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={closeModal}
            aria-hidden="true"
          />

          {/* Modal Content - Bottom Sheet */}
          <div className="absolute bottom-0 left-0 right-0 bg-[#fefefe] h-screen animate-slide-up overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-4 sticky top-0 bg-[#fefefe] z-10">
              <h2 className="text-lg font-semibold text-[#8899A8]">
                Sort and Filter
              </h2>
              <button
                onClick={closeModal}
                className="p-1 hover:bg-gray-100 rounded  "
                aria-label="Close filters"
              >
                <X size={24} color="#8899A8" />
              </button>
            </div>

            <div className="p-4 pb-24">
              {/* Sort Section */}
              <div className="mb-4">
                <SortSectionMobile
                  currentSortBy={currentSortBy}
                  currentSortOrder={currentSortOrder}
                  onSortChange={setSortPending}
                  isBottomSheetOpen={isSortBottomSheetOpen}
                  onBottomSheetToggle={() =>
                    setIsSortBottomSheetOpen(!isSortBottomSheetOpen)
                  }
                />
              </div>
              <div className="space-y-4">
                {/* Price Section */}
                <PriceSection
                  isOpen={openSections.price}
                  onToggle={() => toggleSection("price")}
                  selectedPrices={selectedPrices}
                  onPriceToggle={togglePriceRangePending}
                />

                {/* Size Section */}
                <SizeSection
                  isOpen={openSections.size}
                  onToggle={() => toggleSection("size")}
                  selectedSizes={selectedSizes}
                  onSizeToggle={toggleSizePending}
                />

                {/* Rating Section */}
                <RatingSection
                  isOpen={openSections.rating}
                  onToggle={() => toggleSection("rating")}
                  selectedRating={selectedRating}
                  onRatingChange={setRatingPending}
                />
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex gap-3 p-4 bg-[#fefefe] fixed bottom-0 left-0 right-0 shadow-lg">
              <button
                onClick={handleClearAll}
                className="flex-1 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg  "
              >
                Clear All
              </button>
              <button
                onClick={handleApply}
                className="inline-flex items-center justify-center flex-1 py-3 text-lg font-medium bg-[#0C4B54] text-white rounded-lg hover:bg-[#0A3B44]  "
              >
                Apply
                <ChevronRight size={20} color="white" className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
