import React from "react";

// Crear el contexto
const CartContext = React.createContext();

// Hook personalizado para usar el carrito
export const useCart = () => {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }
  return context;
};

// Provider del carrito
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = React.useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.idProduct === product.idProduct
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.idProduct === product.idProduct
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (idProduct) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.idProduct !== idProduct)
    );
  };

  const updateQuantity = (idProduct, quantity) => {
    if (quantity <= 0) {
      removeFromCart(idProduct);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.idProduct === idProduct ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + (item.price || 0) * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};