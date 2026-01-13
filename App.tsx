import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Cart } from './pages/Cart';
import { Login, Signup } from './pages/Auth';
import { Checkout } from './pages/Checkout';
import { Tracking } from './pages/Tracking';

const App = () => {
  return (
    <ShopProvider>
      <HashRouter>
        <div className="flex flex-col min-h-screen font-body">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/tracking" element={<Tracking />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm">
            <p>&copy; 2026 C-Trendy Retail Enterprise. All rights reserved.</p>
          </footer>
        </div>
      </HashRouter>
    </ShopProvider>
  );
};

export default App;