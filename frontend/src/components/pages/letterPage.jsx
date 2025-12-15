import { useState, useEffect } from "react";
import { ProductHeader } from "../organisms/letter/ProductHeader";
import { CategoryNav } from "../molecules/letter/CategoryNav";
import { ProductGrid } from "../organisms/letter/ProductGrid";
import { MyTemplate } from "../templates/myTemplate";
import { apiFetch } from "../../helpers/apiFetch";
import { useCart } from "../../context/CartContext";

export const LetterPage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [catsData, prodsData] = await Promise.all([
          apiFetch("/categories"),
          apiFetch("/products")
        ]);

        const categoriesList = Array.isArray(catsData) ? catsData : (catsData?.data || catsData?.body || []);
        setCategories(categoriesList);

        const productList = Array.isArray(prodsData) ? prodsData : (prodsData?.data || prodsData?.body || []);
        setProducts(productList);

      } catch (err) {
        console.error("Error cargando carta:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOrder = (product) => {
    console.log("Añadir al carrito:", product.idProduct);
    addToCart(product);
  };

  const scrollToCategory = (catId) => {
    const section = document.getElementById(`cat-${catId}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <MyTemplate>
      <div className="min-h-screen bg-[#FFF0F5] px-4 pt-32 pb-8 md:px-8 lg:px-16">
        <ProductHeader
          title="Nuestra Carta"
          subtitle="Explora nuestra selección de cafés y postres artesanales"
        />

        <CategoryNav 
          categories={categories} 
          onSelectCategory={scrollToCategory} 
        />

        {loading ? (
          <div className="text-center py-20">
            <p className="text-xl font-bold text-[#432a0c] animate-pulse">
              Preparando la carta... ☕
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500">
            <p>Ups, hubo un problema al cargar el menú. Por favor recarga la página.</p>
          </div>
        ) : (
          <div className="space-y-16 pb-10">
            {categories.map((category) => {
              const categoryProducts = products.filter(p => {
                const pCatId = p.categoryId || p.CategoryId || p.Category_idCategory || p.idCategory;
                return pCatId === category.idCategory;
              });

              return (
                <section 
                  key={category.idCategory} 
                  id={`cat-${category.idCategory}`}
                  className="scroll-mt-40"
                >
                  <div className="mb-6 flex items-center gap-4">
                    <h2 className="text-3xl font-bold text-[#432a0c] border-b-4 border-[#d6c394] pb-1 inline-block">
                      {category.name}
                    </h2>
                  </div>

                  {categoryProducts.length > 0 ? (
                    <ProductGrid products={categoryProducts} onOrder={handleOrder} />
                  ) : (
                    <div className="w-full py-12 bg-[#FFFAD3]/50 border-2 border-dashed border-[#d6c394] rounded-2xl flex flex-col items-center justify-center text-center p-6">
                      <span className="text-4xl mb-2">👨‍🍳✨</span>
                      <h3 className="text-lg font-semibold text-[#432a0c]">
                        ¡Estamos preparando algo especial!
                      </h3>
                      <p className="text-[#432a0c]/80 max-w-md mt-1">
                        Aún no hemos agregado productos a la sección de <strong>{category.name}</strong>, pero pronto estarán disponibles. ¡Vuelve pronto!
                      </p>
                    </div>
                  )}
                </section>
              );
            })}

            {categories.length === 0 && (
              <div className="text-center py-20 opacity-70">
                <p>No se encontraron categorías disponibles.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </MyTemplate>
  );
};