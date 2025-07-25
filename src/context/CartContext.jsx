import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const addToCart = (product) => {
    setCartItems(prevItems => {
      // Check if product already exists in cart
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // If exists, increase quantity
        return prevItems.map(item =>
          item.id === product.id 
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        // If new, add with quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      setCartItems,
      addToCart,
      removeFromCart,
      isCartOpen, 
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);