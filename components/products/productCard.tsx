'use client';
import Image from "next/image";
import { Product } from "../../lib/types/product";
import Link from "next/link";

function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`}>
      <Image src={product.image} alt={product.name} width={200} height={200} />
      <h3>{product.name}</h3>
      <h5>{product.brands[0]}</h5>
      <p>{product.price}</p>
    </Link>
  )
}

export default ProductCard;