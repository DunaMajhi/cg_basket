'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // 1. LOAD CART FROM LOCAL STORAGE
  // We wrap this in useEffect to run only on the client-side to prevent Next.js server errors
  useEffect(() => {
    setIsClient(true);
    const savedCart = localStorage.getItem('tribal_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart data');
      }
    }
  }, []);

  // 2. SAVE CART ON CHANGE
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('tribal_cart', JSON.stringify(cart));
    }
  }, [cart, isClient]);

  // --- CORE FUNCTIONS ---

  // Add Item (Logic: If exists, increase Qty. If not, add new.)
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);

      if (existingItem) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
    // Optional: Open cart automatically when adding
    setIsCartOpen(true); 
  };

  // Remove Item
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  // Update Quantity (Prevent going below 1)
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Clear Cart (After successful payment)
  const clearCart = () => {
    setCart([]);
  };

  // --- CALCULATIONS ---

  // Total Price
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Total Item Count (for the badge on the navbar)
  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom Hook to use the Cart easily
export function useCart() {
  return useContext(CartContext);
}