import { ProductCard } from "../../molecules/letter/ProductCard";

function ProductGrid({ products, onOrder }) {
  return (
    <main className="max-w-7xl mx-auto px-6 pb-12">
      {/* Grid Responsivo: 1 columna en móvil, 2 en tablet, 4 en PC */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.idProduct} // Usamos el UUID único
            product={product}
            onOrder={() => onOrder(product)}
          />
        ))}
      </div>
    </main>
  );
}

export { ProductGrid };