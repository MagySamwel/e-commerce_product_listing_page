"use client";
import FilterSection from "./FilterSection";
import { PRICE_RANGES } from "./constants";

interface PriceSectionProps {
  isOpen: boolean;
  onToggle: () => void;
  selectedPrices: Set<string>;
  onPriceToggle: (min: number, max: number | undefined) => void;
}

export default function PriceSection({
  isOpen,
  onToggle,
  selectedPrices,
  onPriceToggle,
}: PriceSectionProps) {
  return (
    <FilterSection title="Price" isOpen={isOpen} onToggle={onToggle}>
      <div className="flex flex-wrap gap-2">
        {PRICE_RANGES.map((range) => {
          const priceKey = `${range.min}-${range.max ?? 'inf'}`;
          const isSelected = selectedPrices.has(priceKey);

          return (
            <button
              key={range.label}
              onClick={() => onPriceToggle(range.min, range.max)}
              className={`font-medium text-sm px-2 py-1 rounded-lg  ${
                isSelected
                  ? "bg-[#cedbdd] text-[#0c4b54]"
                  : "bg-[#f3f3f3] text-[#8899a8] hover:bg-[#e0e0e0]"
              }`}
            >
              {range.label}
            </button>
          );
        })}
      </div>
    </FilterSection>
  );
}
