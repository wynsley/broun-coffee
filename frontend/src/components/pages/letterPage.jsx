import { useEffect, useState } from "react";
import { MyTemplate } from "../templates/myTemplate";
import { ProductHeader } from "../organisms/letter/ProductHeader";
import { ProductGrid } from "../organisms/letter/ProductGrid";
import { apiFetch } from "../../helpers/apiFetch";

function LetterPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Peticiones en paralelo para cargar rápido
        const [catsData, prodsData] = await Promise.all([
          apiFetch("/categories", "GET"),
          apiFetch("/products", "GET")
        ]);

        if (catsData) setCategories(catsData);
        if (prodsData) setProducts(prodsData);
      } catch (error) {
        console.error("Error cargando la carta:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOrder = (product) => {
    console.log("Añadir al carrito:", product.idProduct);
  };

  if (loading) {
    return (
      <MyTemplate className="pt-20">
        <div className="w-full min-h-screen bg-[#FFFAD3] flex items-center justify-center">
          <p className="text-[#432a0c] font-bold text-xl animate-pulse">
            Cargando delicias... ☕
          </p>
        </div>
      </MyTemplate>
    );
  }

  return (
    <MyTemplate className="pt-20">
      <div className="w-full bg-[#FFFAD3] min-h-screen pb-10">
        {/* Iteramos sobre las categorías para crear las secciones */}
        {categories.map((category) => {
          // Filtramos productos que pertenecen a esta categoría
          // Nota: Verifica si tu backend devuelve 'categoryId' o 'CategoryId'
          const categoryProducts = products.filter((p) => {
             const catId = p.categoryId || p.CategoryId || p.Category_idCategory;
             return catId === category.idCategory;
          });

          // Si la categoría no tiene productos, no la pintamos
          if (categoryProducts.length === 0) return null;

          return (
            <div key={category.idCategory}>
              <ProductHeader title={category.name} />
              <ProductGrid products={categoryProducts} onOrder={handleOrder} />
            </div>
          );
        })}

        {/* Fallback: Si no hay categorías o relación, mostramos todo junto (útil para pruebas) */}
        {categories.length === 0 && products.length > 0 && (
          <div>
            <ProductHeader title="Nuestra Carta" />
            <ProductGrid products={products} onOrder={handleOrder} />
          </div>
        )}
        
        {/* Caso vacío total */}
        {products.length === 0 && (
           <div className="text-center py-20 text-[#432a0c]">
              <p>No hay productos disponibles por el momento.</p>
           </div>
        )}
      </div>
    </MyTemplate>
  );
}

export { LetterPage };