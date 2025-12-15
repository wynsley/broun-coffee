import { useState } from "react";
import { FiCheckCircle, FiX, FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import { Title } from "../../atoms/titles";
import { Button } from "../../atoms/buttons";
import { CartTitle } from "../../molecules/modals/modalCartTitle";
import { useCart } from "../../../context/CartContext"; // 👈 Cambiar a 3 niveles arriba

function CartShop({ setCartShopOpen }) {
  const [isClose, setIsClose] = useState(false);
  const [ordered, setOrdered] = useState(false);
  
  const { cartItems, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCart(); // 👈 Obtener datos del carrito

  const CloseModal = () => {
    setIsClose(true);
    setTimeout(() => {
      setCartShopOpen(false);
    }, 400);
  };

  const handleBgClick = (e) => {
    if (e.target === e.currentTarget) {
      CloseModal();
    }
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const handleOrder = () => {
    if (cartItems.length === 0) return;
    
    setOrdered(true);
    
    // Simular envío del pedido
    setTimeout(() => {
      clearCart(); // Vaciar el carrito después del pedido
      setTimeout(() => {
        CloseModal();
      }, 1500);
    }, 2000);
  };

  return (
    <div
      className={`fixed inset-0 bg-black/50 z-998 transition-opacity duration-400 
        ${isClose ? "opacity-0" : "opacity-100"}`}
      onClick={handleBgClick}
    >
      <section
        className="absolute text-black z-999 p-3 rounded top-20 right-6 bg-white w-200 max-h-[80vh] flex flex-col gap-5 items-center overflow-hidden"
        onClick={handleModalClick}
      >
        <CartTitle CloseModal={CloseModal} />

        {/* Contenido del carrito */}
        <div className="w-full flex-1 overflow-y-auto px-2">
          {ordered ? (
            // Estado de pedido realizado
            <div className="h-40 w-full flex flex-col items-center rounded justify-center text-gray-300 border border-gray-400 gap-3">
              <FiCheckCircle size={55} className="text-green-500 animate-check" />
              <Title
                className="text-green-600"
                level="h5"
                text="Pedido realizado con éxito"
              />
            </div>
          ) : cartItems.length === 0 ? (
            // Carrito vacío
            <div className="h-40 w-full flex flex-col items-center rounded justify-center text-gray-300 border border-gray-400 gap-3">
              <Title
                className="text-gray-300"
                level="h5"
                text="No hay productos en carrito"
              />
            </div>
          ) : (
            // Lista de productos
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.idProduct}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                  {/* Imagen del producto */}
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}

                  {/* Info del producto */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm text-gray-800 truncate">
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-500">
                      ${item.price?.toFixed(2) || "0.00"}
                    </p>
                  </div>

                  {/* Controles de cantidad */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.idProduct, item.quantity - 1)}
                      className="p-1 hover:bg-gray-200 rounded transition"
                    >
                      <FiMinus size={16} />
                    </button>
                    <span className="w-8 text-center font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.idProduct, item.quantity + 1)}
                      className="p-1 hover:bg-gray-200 rounded transition"
                    >
                      <FiPlus size={16} />
                    </button>
                  </div>

                  {/* Botón eliminar */}
                  <button
                    onClick={() => removeFromCart(item.idProduct)}
                    className="p-2 hover:bg-red-100 text-red-500 rounded transition"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Total y botón de pedido */}
        {!ordered && cartItems.length > 0 && (
          <div className="w-full border-t pt-3 space-y-3">
            <div className="flex justify-between items-center px-2">
              <span className="font-semibold text-gray-700">Total:</span>
              <span className="font-bold text-lg text-[#432a0c]">
                ${getTotalPrice().toFixed(2)}
              </span>
            </div>
            <Button
              type="submit"
              text="Realizar Pedido"
              className="px-8 w-full"
              onClick={handleOrder}
            />
          </div>
        )}
      </section>

      <style>
        {`
          .animate-check {
            animation: pop 0.5s ease-out forwards;
          }

          @keyframes pop {
            0% {
              transform: scale(0);
              opacity: 0;
            }
            60% {
              transform: scale(1.2);
              opacity: 1;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
}

export { CartShop };