import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Button, Input, Section } from '../components/UI';
import { CreditCard, Landmark, CheckCircle } from 'lucide-react';

export const Checkout = () => {
  const { cart, placeOrder } = useShop();
  const navigate = useNavigate();
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [orderId, setOrderId] = useState('');
  const [paidAmount, setPaidAmount] = useState(0);
  
  // Form State
  const [shipping, setShipping] = useState({ name: '', address: '', city: '', zip: '' });
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank'>('card');

  const currentTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPaidAmount(currentTotal); // Capture total before cart is cleared
    const id = placeOrder(shipping);
    setOrderId(id);
    setStep('success');
  };

  if (cart.length === 0 && step === 'form') {
      setTimeout(() => navigate('/shop'), 0);
      return null;
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Section className="w-full max-w-lg text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-2">Order Successful!</h2>
          <p className="text-gray-600 mb-8">Thank you for your purchase.</p>
          
          <div className="bg-gray-50 rounded-xl p-6 text-left mb-8 border border-gray-200">
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Order ID:</span>
              <span className="font-mono font-bold text-gray-900">{orderId}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Amount Paid:</span>
              <span className="font-bold text-amber-600">RM{paidAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Shipping To:</span>
              <span className="font-medium text-gray-900 text-right truncate w-1/2">{shipping.address}</span>
            </div>
          </div>

          <Button fullWidth onClick={() => navigate('/shop')}>Continue Shopping</Button>
          <Button variant="secondary" fullWidth className="mt-3" onClick={() => navigate('/tracking')}>Track Order</Button>
        </Section>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="font-display text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
            {/* Shipping */}
            <Section>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-sm">1</span>
                Shipping Address
              </h3>
              <div className="space-y-4">
                <Input 
                  label="Full Name" 
                  value={shipping.name} 
                  onChange={e => setShipping({...shipping, name: e.target.value})} 
                  required 
                />
                <Input 
                  label="Street Address" 
                  value={shipping.address} 
                  onChange={e => setShipping({...shipping, address: e.target.value})} 
                  required 
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input 
                    label="City" 
                    value={shipping.city} 
                    onChange={e => setShipping({...shipping, city: e.target.value})} 
                    required 
                  />
                  <Input 
                    label="Postal Code" 
                    value={shipping.zip} 
                    onChange={e => setShipping({...shipping, zip: e.target.value})} 
                    required 
                  />
                </div>
              </div>
            </Section>

            {/* Payment */}
            <Section>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-sm">2</span>
                Payment Method
              </h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div 
                  onClick={() => setPaymentMethod('card')}
                  className={`cursor-pointer p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${paymentMethod === 'card' ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <CreditCard className="w-8 h-8" />
                  <span className="font-semibold">Card</span>
                </div>
                <div 
                  onClick={() => setPaymentMethod('bank')}
                  className={`cursor-pointer p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${paymentMethod === 'bank' ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <Landmark className="w-8 h-8" />
                  <span className="font-semibold">Banking</span>
                </div>
              </div>

              {paymentMethod === 'card' ? (
                <div className="space-y-4 animate-[fadeIn_0.3s]">
                   <Input label="Card Number" placeholder="0000 0000 0000 0000" />
                   <div className="grid grid-cols-2 gap-4">
                     <Input label="Expiry" placeholder="MM/YY" />
                     <Input label="CVV" placeholder="123" />
                   </div>
                </div>
              ) : (
                <div className="space-y-4 animate-[fadeIn_0.3s]">
                   <label className="block text-sm font-semibold text-gray-700">Select Bank</label>
                   <select className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white">
                     <option>Maybank2u</option>
                     <option>CIMB Clicks</option>
                     <option>Public Bank</option>
                   </select>
                </div>
              )}
            </Section>
          </form>
        </div>

        {/* Summary Side */}
        <div className="md:col-span-1">
          <Section className="sticky top-24">
            <h3 className="text-lg font-bold text-gray-900 mb-4">In Your Bag</h3>
            <div className="max-h-60 overflow-y-auto mb-4 space-y-2 pr-2">
              {cart.map(item => (
                <div key={`${item.id}-${item.size}`} className="flex justify-between text-sm">
                  <span className="truncate w-2/3">{item.quantity}x {item.name}</span>
                  <span className="font-medium">RM{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4 mt-4">
               <div className="flex justify-between items-center mb-6">
                 <span className="text-gray-600">Total to Pay</span>
                 <span className="font-display text-2xl font-bold text-amber-600">RM{currentTotal.toFixed(2)}</span>
               </div>
               <Button type="submit" form="checkout-form" fullWidth>Pay Now</Button>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
};