import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Button, Section } from '../components/UI';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';

export const Cart = () => {
  const { cart, updateCartQuantity, removeFromCart } = useShop();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBagIcon className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
        <Button onClick={() => navigate('/shop')}>Start Shopping</Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-display text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={`${item.id}-${item.size}`} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 transition-all hover:shadow-md">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg bg-gray-100" />
              
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.type} | Size: {item.size}</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id, item.size)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex justify-between items-end">
                   <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-200">
                     <button onClick={() => updateCartQuantity(item.id, item.size, -1)} className="p-1 hover:bg-white rounded shadow-sm"><Minus className="w-4 h-4" /></button>
                     <span className="w-8 text-center font-bold">{item.quantity}</span>
                     <button onClick={() => updateCartQuantity(item.id, item.size, 1)} className="p-1 hover:bg-white rounded shadow-sm"><Plus className="w-4 h-4" /></button>
                   </div>
                   <p className="font-bold text-lg text-amber-600">RM{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="lg:col-span-1">
          <Section className="sticky top-24">
             <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
             
             <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>RM{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-xl text-gray-900">
                  <span>Total</span>
                  <span>RM{total.toFixed(2)}</span>
                </div>
             </div>
             
             <Button fullWidth onClick={() => navigate('/checkout')}>Proceed to Checkout</Button>
             <Button variant="secondary" fullWidth className="mt-3 border-0" onClick={() => navigate('/shop')}>Continue Shopping</Button>
          </Section>
        </div>
      </div>
    </div>
  );
};

const ShoppingBagIcon = ({className}: {className?: string}) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);