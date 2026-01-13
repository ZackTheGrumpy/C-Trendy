import React from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, LogOut, User, Search, MapPin } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const { cart, user, logout } = useShop();
  const location = useLocation();
  const navigate = useNavigate();
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (location.pathname === '/') return null; // Simplified header for landing if needed, but keeping consistent is better. 
  // Let's hide nav on Home strictly per original design, or show transparent.
  // Original design had different header for home. Let's make this the "App" navbar.
  
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  if (isAuthPage) return null;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-amber-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/shop" className="flex items-center gap-3 group">
            <img 
              src="https://raw.githubusercontent.com/CrabBerjoget/intestingpowershell/refs/heads/baju/logo.png" 
              alt="C-Trendy" 
              className="w-10 h-10 object-contain drop-shadow-sm group-hover:drop-shadow-md transition-all"
            />
            <div>
              <h1 className="font-display text-2xl font-bold text-gray-900 tracking-tight">C-Trendy</h1>
              <p className="hidden sm:block text-[10px] text-amber-600 font-medium uppercase tracking-widest">Fashion Store</p>
            </div>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-6">
            <Link to="/tracking" className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-amber-600 transition-colors">
              <MapPin className="w-4 h-4" />
              Track Order
            </Link>

            <div className="h-6 w-px bg-gray-200 hidden md:block"></div>

            <div className="flex items-center gap-3">
              {user && (
                <div className="hidden md:flex items-center gap-2 mr-2">
                  <span className="text-sm font-medium text-gray-700">Hi, {user.username}</span>
                  <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Logout">
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              )}

              <Link to="/cart" className="relative p-2 group">
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-md transform group-hover:scale-110 transition-transform">
                  {cartItemCount}
                </div>
                <ShoppingBag className="w-6 h-6 text-gray-700 group-hover:text-amber-600 transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};