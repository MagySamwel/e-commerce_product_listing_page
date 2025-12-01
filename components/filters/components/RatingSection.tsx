"use client";
import FilterSection from "./FilterSection";
import { RATING_OPTIONS } from "./constants";

interface RatingSectionProps {
  isOpen: boolean;
  onToggle: () => void;
  selectedRating: string | undefined;
  onRatingChange: (rating: number | undefined) => void;
}

export default function RatingSection({
  isOpen,
  onToggle,
  selectedRating,
  onRatingChange,
}: RatingSectionProps) {
  return (
    <FilterSection title="Rating" isOpen={isOpen} onToggle={onToggle}>
      <div className="flex flex-wrap gap-2">
        {RATING_OPTIONS.map((rating) => {
          const ratingValue = rating.value !== undefined ? String(rating.value) : undefined;
          const isSelected =
            rating.value === undefined
              ? !selectedRating
              : selectedRating === ratingValue;

          return (
            <button
              key={rating.label}
              onClick={() => onRatingChange(rating.value)}
              className={`font-medium px-2 py-1 rounded-lg text-sm  ${
                isSelected
                  ? "bg-[#cedbdd] text-[#0c4b54]"
                  : "bg-[#f3f3f3] text-[#8899a8] hover:bg-[#e0e0e0]"
              }`}
            >
              {rating.label}
            </button>
          );
        })}
      </div>
    </FilterSection>
  );
}
