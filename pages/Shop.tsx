import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES, SIZES } from '../constants';
import { Product, Size } from '../types';
import { Button, Input } from '../components/UI';
import { Search, Filter, ShoppingCart, Plus, Minus, AlertCircle } from 'lucide-react';

export const Shop = () => {
  const { products, stock, addToCart } = useShop();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    priceRange: 'all'
  });

  // Derived state for filtered products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(filters.search.toLowerCase());
      const matchCategory = filters.category === 'all' || p.type === filters.category;
      let matchPrice = true;
      if (filters.priceRange !== 'all') {
        const [min, max] = filters.priceRange.split('-').map(Number);
        if (filters.priceRange === '200+') matchPrice = p.price >= 200;
        else matchPrice = p.price >= min && p.price <= max;
      }
      return matchSearch && matchCategory && matchPrice;
    });
  }, [products, filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header & Filter Toggle */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
           <h2 className="font-display text-3xl font-bold text-gray-900">New Collection</h2>
           <p className="text-gray-500 mt-1">Discover the latest trends</p>
        </div>
        
        <Button onClick={() => setShowFilters(!showFilters)} variant="secondary" className="w-full md:w-auto">
          <Filter className="w-4 h-4" /> {showFilters ? 'Hide Filters' : 'Search & Filters'}
        </Button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100 animate-[fadeIn_0.3s_ease-out]">
          <div className="grid md:grid-cols-3 gap-6">
            <Input 
              label="Search" 
              placeholder="Search products..." 
              icon={<Search className="w-4 h-4" />}
              value={filters.search}
              onChange={e => setFilters({...filters, search: e.target.value})}
            />
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select 
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-amber-500 bg-white"
                value={filters.category}
                onChange={e => setFilters({...filters, category: e.target.value})}
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Price</label>
              <select 
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-amber-500 bg-white"
                value={filters.priceRange}
                onChange={e => setFilters({...filters, priceRange: e.target.value})}
              >
                <option value="all">All Prices</option>
                <option value="0-50">Under RM50</option>
                <option value="50-100">RM50 - RM100</option>
                <option value="100-200">RM100 - RM200</option>
                <option value="200+">Above RM200</option>
              </select>
            </div>
          </div>
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
            <span className="text-sm text-gray-500">Showing {filteredProducts.length} results</span>
            <button 
              onClick={() => setFilters({search: '', category: 'all', priceRange: 'all'})}
              className="text-sm text-amber-600 font-semibold hover:underline"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} stockInfo={stock[product.id]} onAdd={addToCart} />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
         <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🔍</div>
            <h3 className="text-lg font-bold text-gray-900">No products found</h3>
            <p className="text-gray-500">Try adjusting your filters</p>
         </div>
      )}
    </div>
  );
};

const ProductCard: React.FC<{ 
  product: Product; 
  stockInfo: {[key in Size]: number}; 
  onAdd: (p: Product, s: Size, q: number) => boolean 
}> = ({ product, stockInfo, onAdd }) => {
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [qty, setQty] = useState(1);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const handleAdd = () => {
    if (!selectedSize) {
      setMessage({ type: 'error', text: 'Select a size first' });
      return;
    }
    const success = onAdd(product, selectedSize, qty);
    if (success) {
      setMessage({ type: 'success', text: 'Added to cart' });
      setQty(1);
      setSelectedSize(null);
    } else {
      setMessage({ type: 'error', text: 'Not enough stock' });
    }
    setTimeout(() => setMessage(null), 2000);
  };

  const currentStock = selectedSize ? stockInfo[selectedSize] : 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group flex flex-col h-full">
      <div className="relative h-64 overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
          {product.type}
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
        <p className="font-display text-2xl text-amber-600 font-bold mb-4">RM{product.price.toFixed(2)}</p>
        
        <div className="mt-auto space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
               <span className="text-xs font-semibold text-gray-500 uppercase">Size</span>
               {selectedSize && (
                 <span className={`text-xs ${currentStock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                   {currentStock > 0 ? `${currentStock} in stock` : 'Sold Out'}
                 </span>
               )}
            </div>
            <div className="flex gap-2">
              {SIZES.map(s => {
                const isSoldOut = stockInfo[s] === 0;
                return (
                  <button
                    key={s}
                    disabled={isSoldOut}
                    onClick={() => { setSelectedSize(s); setMessage(null); }}
                    className={`h-8 w-8 rounded text-xs font-medium transition-all
                      ${selectedSize === s 
                        ? 'bg-gray-900 text-white shadow-lg scale-110' 
                        : isSoldOut 
                          ? 'bg-gray-100 text-gray-300 cursor-not-allowed decoration-slice line-through' 
                          : 'bg-white border border-gray-200 text-gray-700 hover:border-amber-500 hover:text-amber-600'}
                    `}
                  >
                    {s}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex items-center gap-3">
             <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-200">
               <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-1 hover:bg-white rounded shadow-sm transition-colors"><Minus className="w-3 h-3" /></button>
               <span className="w-8 text-center text-sm font-semibold">{qty}</span>
               <button onClick={() => setQty(Math.min(currentStock || 10, qty + 1))} className="p-1 hover:bg-white rounded shadow-sm transition-colors"><Plus className="w-3 h-3" /></button>
             </div>
             <Button onClick={handleAdd} className="flex-1 py-2 text-sm" disabled={!selectedSize || (selectedSize && stockInfo[selectedSize] === 0)}>
               Add
             </Button>
          </div>
          
          {message && (
             <div className={`text-center text-xs p-2 rounded ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
               {message.text}
             </div>
          )}
        </div>
      </div>
    </div>
  );
};