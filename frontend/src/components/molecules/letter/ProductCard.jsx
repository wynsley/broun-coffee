import { RatingDisplay } from "../../atoms/letter/RatingDisplay";
import { PriceTag } from "../../atoms/letter/PriceTag";
import { ProductImage } from "../../atoms/letter/ProductImage";

function ProductCard({ product, onOrder }) {
  const { name, price, img, description } = product;

  // Ruta de imagen segura
  const imagePath = img ? `/${img}` : "/CUP-COFFEE.png";
  
  // Precio formateado
  const formattedPrice = `S/. ${parseFloat(price).toFixed(2)}`;

  return (
    <article className="bg-[#d6c394] rounded-2xl p-5 text-center shadow-md relative flex flex-col h-full justify-between">
      <div>
        <h3 className="font-semibold text-lg text-[#432a0c] mb-2 min-h-[3.5rem] flex items-center justify-center leading-tight">
          {name}
        </h3>

        <div className="flex items-center relative mt-auto mb-2">
          {/* Columna izquierda: Rating + Botón */}
          <div className="flex flex-col items-start gap-3 text-sm mb-3 text-[#2e2a23] z-10">
            <RatingDisplay rating={4.5} /> {/* Rating fijo por ahora */}

            <button
              onClick={onOrder}
              className="bg-[#432a0c] text-[#FFFAD3] px-4 py-2 rounded-full font-semibold text-xs hover:bg-[#5e3b12] transition-colors shadow-sm flex items-center gap-1"
            >
              <span>+ Añadir</span>
            </button>
          </div>

          {/* Imagen central */}
          <div className="flex-1 flex justify-center">
            <ProductImage src={imagePath} alt={name} />
          </div>

          {/* Precio derecha */}
          <PriceTag precio={formattedPrice} />
        </div>
      </div>
      
      {/* Descripción opcional si quieres mostrarla */}
      {description && (
        <p className="text-xs text-[#432a0c] text-left mt-2 opacity-80 line-clamp-2">
          {description}
        </p>
      )}
    </article>
  );
}

export { ProductCard };