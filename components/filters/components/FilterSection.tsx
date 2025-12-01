"use client";
import { Minus } from "lucide-react";

interface FilterSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export default function FilterSection({ title, isOpen, onToggle, children }: FilterSectionProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-3 bg-white">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-lg lg:text-base text-[#1F2A37]">{title}</h3>
        <button
          onClick={onToggle}
          className="cursor-pointer"
          aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${title} section`}
        >
          <Minus size={18} color="grey" />
        </button>
      </div>
      {isOpen && children}
    </div>
  );
}
