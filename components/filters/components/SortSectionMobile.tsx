"use client";
import { ChevronRight, Check, Minus } from "lucide-react";
import { SORT_OPTIONS } from "./constants";

interface SortSectionMobileProps {
  currentSortBy: string | undefined;
  currentSortOrder: string | undefined;
  onSortChange: (sortBy: string | undefined, sortOrder: string | undefined) => void;
  isBottomSheetOpen: boolean;
  onBottomSheetToggle: () => void;
}

export default function SortSectionMobile({
  currentSortBy,
  currentSortOrder,
  onSortChange,
  isBottomSheetOpen,
  onBottomSheetToggle,
}: SortSectionMobileProps) {
  const selectedOption = SORT_OPTIONS.find(
    (option) =>
      option.sort_by === (currentSortBy || undefined) &&
      option.sort_order === (currentSortOrder || undefined)
  ) || SORT_OPTIONS[0];

  const handleOptionSelect = (sortBy: string | undefined, sortOrder: string | undefined) => {
    onSortChange(sortBy, sortOrder);
    onBottomSheetToggle(); 
  };

  return (
    <>
      {/* Sort Button */}
      <div className="border border-gray-200 rounded-lg p-3 bg-white">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-lg text-[#1F2A37]">Sort By</h3>
          <button
            onClick={onBottomSheetToggle}
            className="text-[#0C4B54] flex items-center gap-2 font-medium"
            aria-label="Open sort options"
          >
            <span>{selectedOption.label}</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Bottom Sheet */}
      {isBottomSheetOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={onBottomSheetToggle}
            aria-hidden="true"
          />

          {/* Bottom Sheet Content */}
          <div className="absolute bottom-0 left-0 right-0 bg-[#f3f6f6] rounded-t-xl animate-slide-up">
            {/* Header */}
            <div className="flex items-center flex-col pt-4 pb-3">
              <Minus size={20} color="#8899A8" />
              <h3 className="font-medium text-[#1F2A37] text-center text-lg mt-2">Sort By</h3>
            </div>

            {/* Options List */}
            <div className="max-h-[60vh]">
              {SORT_OPTIONS.map((option, index) => {
                const isSelected =
                  currentSortBy === option.sort_by && currentSortOrder === option.sort_order;
                const isDefault = !currentSortBy && !option.sort_by && index === 0;

                return (
                  <div key={option.label}>
                    <button
                      onClick={() => handleOptionSelect(option.sort_by, option.sort_order)}
                      className={`w-full flex items-center justify-between text-left p-4 font-medium   ${
                        isSelected || isDefault
                          ? "text-[#0c4b54]"
                          : "text-[#1F2A37] hover:bg-gray-50"
                      }`}
                    >
                      <span>{option.label}</span>
                      {(isSelected || isDefault) && <Check size={20} color="#0c4b54" />}
                    </button>
                    {index !== SORT_OPTIONS.length - 1 && (
                      <hr className="mx-4 border-[#e9e9e9]" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
