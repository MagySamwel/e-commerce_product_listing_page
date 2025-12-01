"use client";
import FilterSection from "./FilterSection";
import { SIZES } from "./constants";

interface SizeSectionProps {
  isOpen: boolean;
  onToggle: () => void;
  selectedSizes: Set<string>;
  onSizeToggle: (size: string) => void;
}

export default function SizeSection({
  isOpen,
  onToggle,
  selectedSizes,
  onSizeToggle,
}: SizeSectionProps) {
  return (
    <FilterSection title="Size" isOpen={isOpen} onToggle={onToggle}>
      <div className="flex flex-wrap gap-2">
        {SIZES.map((size) => {
          const isSelected = selectedSizes.has(size);

          return (
            <button
              key={size}
              onClick={() => onSizeToggle(size)}
              className={`font-medium px-2 py-1 rounded-lg text-sm  ${
                isSelected
                  ? "bg-[#cedbdd] text-[#0c4b54]"
                  : "bg-[#f3f3f3] text-[#8899a8] hover:bg-[#e0e0e0]"
              }`}
            >
              {size}
            </button>
          );
        })}
      </div>
    </FilterSection>
  );
}
