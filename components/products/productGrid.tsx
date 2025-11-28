import { Product } from "../../lib/types/product";
import ProductCard from "./productCard";

function ProductGrid({ products }: { products: Product[] }) {
    if (products.length === 0) return <p>No products found.</p>;
  return (
    <div className="">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
