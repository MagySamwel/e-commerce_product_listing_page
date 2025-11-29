import { Product } from "../../lib/types/product";
import ProductCard from "./productCard";

function ProductGrid({ products }: { products: Product[] }) {
    if (products.length === 0) return <p>No products found.</p>;
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-2">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
