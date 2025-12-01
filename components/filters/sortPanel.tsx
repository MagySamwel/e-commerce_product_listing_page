'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

// Sort options matching the API
const sortOptions = [
  { label: 'Most Recommended', sort_by: undefined, sort_order: undefined },
  { label: 'Price: Lowest First', sort_by: 'price', sort_order: 'asc' },
  { label: 'Price: Highest First', sort_by: 'price', sort_order: 'desc' },
  { label: 'Best Rating', sort_by: 'rating', sort_order: 'desc' },
] as const;

interface SortSelectProps {
  className?: string;
}

export default function SortSelect({ className = '' }: SortSelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current sort values from URL
  const currentSortBy = searchParams.get('sort_by');
  const currentSortOrder = searchParams.get('sort_order');

  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = parseInt(e.target.value);
    const option = sortOptions[selectedIndex];

    const params = new URLSearchParams(searchParams.toString());

    if (option.sort_by) {
      params.set('sort_by', option.sort_by);
      params.set('sort_order', option.sort_order!);
    } else {
      params.delete('sort_by');
      params.delete('sort_order');
    }

    const queryString = params.toString();
    router.push(`/products${queryString ? `?${queryString}` : ''}`);
  };

  // Get current index for select value
  const currentIndex = sortOptions.findIndex(
    (option) =>
      option.sort_by === (currentSortBy || undefined) &&
      option.sort_order === (currentSortOrder || undefined)
  );

  return (
    <div className={`relative ${className}`}>
      <select
        value={currentIndex >= 0 ? currentIndex : 0}
        onChange={handleSortChange}
        className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-gray-700 cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
      >
        {sortOptions.map((option, index) => (
          <option key={option.label} value={index}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
    </div>
  );
}