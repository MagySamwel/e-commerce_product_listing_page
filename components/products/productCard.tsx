"use client";
import Image from "next/image";
import { Product } from "../../lib/types/product";
import Link from "next/link";
import { Circle, Heart } from "lucide-react";
import RatingStars from "../ui/ratingStars";

function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group rounded-xl transition-all duration-300 hover:shadow-lg p-1"
    >
      <div className="relative w-full h-56 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="rounded-2xl object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <Heart className="absolute top-4 right-3" color="grey" size={22.88} />
      </div>
      <div className="mt-2 ">
        {/* <div> */}
          <p className="text-base leading-tight">{product.name}</p>
          <p className="text-xs">{product.brands[0]}</p>
          <div className="flex gap-1">
            <RatingStars rating={product.average_rating} />
            <p className="text-xs text-gray-500">({product.reviews_count})</p>
          </div>
          <p className="font-semibold">${Number(product.price).toFixed()}</p>
        {/* </div> */}
        <div>
          <Circle
            className="inline-block mr-1"
            color={product.status == "active" ? "green" : "red"}
            size={10}
            fill={product.status == "active" ? "green" : "red"}
          />
          <span className="text-xs text-gray-500">{product.status}</span>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
