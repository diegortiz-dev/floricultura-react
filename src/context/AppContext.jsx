import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { DEFAULT_PRODUCTS, CATEGORY_LABELS } from '../data/products';

const AppContext = createContext();

function loadFromStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch { return fallback; }
}

export function AppProvider({ children }) {
  // ---- Products ----
  const [products, setProducts] = useState(() => loadFromStorage('flora_products', DEFAULT_PRODUCTS));

  useEffect(() => {
    localStorage.setItem('flora_products', JSON.stringify(products));
  }, [products]);

  const getProduct = useCallback((id) => products.find(p => p.id === id), [products]);
  const getFeatured = useCallback(() => products.filter(p => p.featured), [products]);
  const getByCategory = useCallback((cat) => (!cat || cat === 'todos') ? products : products.filter(p => p.category === cat), [products]);

  const addProduct = (data) => {
    setProducts(prev => {
      const id = prev.length ? Math.max(...prev.map(p => p.id)) + 1 : 1;
      return [...prev, { ...data, id, categoryLabel: CATEGORY_LABELS[data.category] || data.category }];
    });
  };

  const updateProduct = (id, data) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...data, id, categoryLabel: CATEGORY_LABELS[data.category] || data.category } : p));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const resetProducts = () => setProducts(DEFAULT_PRODUCTS);

  // ---- Cart ----
  const [cart, setCart] = useState(() => loadFromStorage('flora_cart', []));

  useEffect(() => {
    localStorage.setItem('flora_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (productId) => {
    setCart(prev => {
      const existing = prev.find(i => i.productId === productId);
      if (existing) return prev.map(i => i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { productId, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(i => i.productId !== productId));
  };

  const updateCartQty = (productId, qty) => {
    if (qty < 1) { removeFromCart(productId); return; }
    setCart(prev => prev.map(i => i.productId === productId ? { ...i, quantity: qty } : i));
  };

  const clearCart = () => setCart([]);

  const cartItems = cart.map(item => {
    const product = getProduct(item.productId);
    return product ? { ...product, quantity: item.quantity, subtotal: product.price * item.quantity } : null;
  }).filter(Boolean);

  const cartTotal = cartItems.reduce((sum, i) => sum + i.subtotal, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  // ---- Orders ----
  const [orders, setOrders] = useState(() => loadFromStorage('flora_orders', []));

  useEffect(() => {
    localStorage.setItem('flora_orders', JSON.stringify(orders));
  }, [orders]);

  const placeOrder = (orderData) => {
    const orderNum = '#' + Date.now().toString().slice(-6);
    const order = { number: orderNum, date: new Date().toISOString(), items: cartItems, total: cartTotal, ...orderData };
    setOrders(prev => [...prev, order]);
    clearCart();
    return orderNum;
  };

  // ---- Toast ----
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3200);
  };

  return (
    <AppContext.Provider value={{
      products, getProduct, getFeatured, getByCategory,
      addProduct, updateProduct, deleteProduct, resetProducts,
      cart, cartItems, cartTotal, cartCount,
      addToCart, removeFromCart, updateCartQty, clearCart,
      orders, placeOrder,
      toast, showToast,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
