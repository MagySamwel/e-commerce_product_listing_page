import { Product } from "../../lib/types/product";
import ProductCard from "./productCard";
import { Suspense } from "react";
import Image from "next/image";
import Skelton from "../ui/skelton";

function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <Suspense fallback={<Skelton />} key={product.id}>
          <ProductCard product={product} />
        </Suspense>
      ))}
    </div>
  );
}

export default ProductGrid;
