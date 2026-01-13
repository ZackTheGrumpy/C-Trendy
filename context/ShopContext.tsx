import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, StockInventory, Size, User, Order } from '../types';
import { PRODUCTS, generateInitialStock } from '../constants';

interface ShopContextType {
  products: Product[];
  stock: StockInventory;
  cart: CartItem[];
  user: User | null;
  orders: Order[];
  
  // Actions
  login: (username: string) => void;
  logout: () => void;
  addToCart: (product: Product, size: Size, quantity: number) => boolean;
  removeFromCart: (productId: number, size: Size) => void;
  updateCartQuantity: (productId: number, size: Size, delta: number) => void;
  clearCart: () => void;
  placeOrder: (shippingDetails: any) => string; // Returns Order ID
  checkOrder: (id: string) => Order | undefined;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stock, setStock] = useState<StockInventory>(generateInitialStock());
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  // Simulate persistent auth
  useEffect(() => {
    const storedUser = localStorage.getItem('c_trendy_user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = (username: string) => {
    const newUser = { username, isLoggedIn: true };
    setUser(newUser);
    localStorage.setItem('c_trendy_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('c_trendy_user');
    setCart([]);
  };

  const addToCart = (product: Product, size: Size, quantity: number): boolean => {
    const available = stock[product.id][size];
    if (available < quantity) return false;

    setStock(prev => ({
      ...prev,
      [product.id]: {
        ...prev[product.id],
        [size]: prev[product.id][size] - quantity
      }
    }));

    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.size === size);
      if (existing) {
        return prev.map(item => 
          item.id === product.id && item.size === size 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, size, quantity }];
    });

    return true;
  };

  const removeFromCart = (productId: number, size: Size) => {
    const item = cart.find(i => i.id === productId && i.size === size);
    if (!item) return;

    // Return stock
    setStock(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [size]: prev[productId][size] + item.quantity
      }
    }));

    setCart(prev => prev.filter(i => !(i.id === productId && i.size === size)));
  };

  const updateCartQuantity = (productId: number, size: Size, delta: number) => {
    const item = cart.find(i => i.id === productId && i.size === size);
    if (!item) return;

    if (delta > 0) {
      // Increasing qty, check stock
      if (stock[productId][size] >= delta) {
        setStock(prev => ({
          ...prev,
          [productId]: { ...prev[productId], [size]: prev[productId][size] - delta }
        }));
        setCart(prev => prev.map(i => i === item ? { ...i, quantity: i.quantity + delta } : i));
      }
    } else {
      // Decreasing qty
      if (item.quantity + delta <= 0) {
        removeFromCart(productId, size);
      } else {
        setStock(prev => ({
          ...prev,
          [productId]: { ...prev[productId], [size]: prev[productId][size] + Math.abs(delta) }
        }));
        setCart(prev => prev.map(i => i === item ? { ...i, quantity: i.quantity + delta } : i));
      }
    }
  };

  const clearCart = () => setCart([]);

  const placeOrder = (shippingDetails: any) => {
    const orderId = `CTR-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newOrder: Order = {
      id: orderId,
      items: [...cart],
      total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      date: new Date().toISOString(),
      status: 'Processing',
      shipping: shippingDetails
    };
    setOrders(prev => [...prev, newOrder]);
    clearCart();
    return orderId;
  };

  const checkOrder = (id: string) => orders.find(o => o.id === id) || (id === 'CTR-2026-024' ? {
    id: 'CTR-2026-024',
    status: 'Shipped',
    items: [],
    total: 129.50,
    date: new Date().toISOString(),
    shipping: { name: 'Demo User', address: '123 Demo St', city: 'KL', zip: '50000' }
  } as Order : undefined);

  return (
    <ShopContext.Provider value={{
      products: PRODUCTS,
      stock,
      cart,
      user,
      orders,
      login,
      logout,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      placeOrder,
      checkOrder
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within a ShopProvider');
  return context;
};