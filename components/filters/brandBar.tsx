'use client';

import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const brands = [
  { name: "Nike", logo: "/images/nike.svg" },
  { name: "Adidas", logo: "/images/adidas.svg" },
  { name: "Puma", logo: "/images/puma.svg" },
  { name: "Reebok", logo: "/images/reebok.svg" },
] as const;

type BrandName = typeof brands[number]['name'];

function BrandBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeBrand = searchParams.get('brand') as BrandName | null;

  const buildBrandUrl = (brand: BrandName | null): string => {
    const params = new URLSearchParams(searchParams.toString());

    if (brand) {
      params.set('brand', brand);
    } else {
      params.delete('brand');
    }

    const queryString = params.toString();
    return queryString ? '/products?' + queryString : '/';
  };

  const handleRemoveBrand = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(buildBrandUrl(null));
  };

  return (
    <div className="flex items-center sm:justify-center gap-3 overflow-x-auto px-4 pt-5 md:pt-0 bg-white">

      {/* Brand buttons */}
      {brands.map((item) => {
        const isActive = activeBrand === item.name;

        return (
          <Link
            key={item.name}
            href={buildBrandUrl(item.name)}
            className={`flex-shrink-0 bg-gray-100 flex items-center gap-2 p-1 rounded-xl ${
              isActive
                ? 'border-2 border-[#0C4B54]'
                : 'hover:bg-gray-200'
            }`}
          >
            <Image
              src={item.logo}
              alt={item.name}
              width={24}
              height={24}
              className={`h-10 w-auto object-contain rounded-lg bg-white border-5`}
            />
            <span className={`text-[#1D1E20] font-medium px-2`}>
              {item.name}
            </span>
            {isActive && (
              <X
                size={16}
                className="hover:opacity-70 me-1"
                onClick={handleRemoveBrand}
              />
            )}
          </Link>
        );
      })}
    </div>
  );
}

export default BrandBar;
