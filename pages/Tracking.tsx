import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Button, Input, Section } from '../components/UI';
import { Search, Package, Truck, CheckCircle, MapPin } from 'lucide-react';
import { Order } from '../types';

export const Tracking = () => {
  const { checkOrder } = useShop();
  const [searchId, setSearchId] = useState('');
  const [result, setResult] = useState<Order | null | undefined>(undefined); // undefined = initial, null = not found

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const order = checkOrder(searchId);
    setResult(order || null);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="font-display text-4xl font-bold text-gray-900 mb-4">Track Your Order</h1>
        <p className="text-gray-500">Enter your order ID to see the current status</p>
      </div>

      <Section className="mb-8">
        <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4">
          <Input 
            placeholder="e.g. CTR-2026-024" 
            value={searchId} 
            onChange={e => setSearchId(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" className="whitespace-nowrap">
            <Search className="w-4 h-4" /> Track Order
          </Button>
        </form>
      </Section>

      {result === null && (
        <div className="bg-red-50 text-red-600 p-6 rounded-xl text-center border border-red-100">
          <p className="font-semibold">Order Not Found</p>
          <p className="text-sm mt-1">Please check the ID and try again.</p>
        </div>
      )}

      {result && (
        <Section className="animate-[fadeIn_0.5s]">
          <div className="flex justify-between items-start mb-8 border-b border-gray-100 pb-4">
            <div>
              <h3 className="font-bold text-xl text-gray-900">Order #{result.id}</h3>
              <p className="text-sm text-gray-500">Placed on {new Date(result.date).toLocaleDateString()}</p>
            </div>
            <div className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full font-bold text-sm">
              {result.status}
            </div>
          </div>

          <div className="relative pl-8 border-l-2 border-gray-200 space-y-8 my-8">
            <TimelineItem 
              active={true} 
              icon={<CheckCircle className="w-5 h-5 text-white" />}
              title="Order Placed"
              desc="We have received your order."
              date="2 days ago"
            />
            <TimelineItem 
              active={['Processing', 'Shipped', 'Delivered'].includes(result.status)} 
              icon={<Package className="w-5 h-5 text-white" />}
              title="Processing"
              desc="Your items are being packed."
              date="1 day ago"
            />
            <TimelineItem 
              active={['Shipped', 'Delivered'].includes(result.status)} 
              icon={<Truck className="w-5 h-5 text-white" />}
              title="Shipped"
              desc="Your package is on the way."
              date={result.status === 'Shipped' ? 'Today' : ''}
            />
             <TimelineItem 
              active={result.status === 'Delivered'} 
              icon={<MapPin className="w-5 h-5 text-white" />}
              title="Delivered"
              desc="Package has arrived."
            />
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mt-6">
            <h4 className="font-semibold text-gray-900 mb-2">Shipping To:</h4>
            <p className="text-gray-600 text-sm">{result.shipping.name}</p>
            <p className="text-gray-600 text-sm">{result.shipping.address}</p>
            <p className="text-gray-600 text-sm">{result.shipping.city}, {result.shipping.zip}</p>
          </div>
        </Section>
      )}
    </div>
  );
};

const TimelineItem = ({ active, icon, title, desc, date }: any) => (
  <div className={`relative ${active ? 'opacity-100' : 'opacity-40'}`}>
    <div className={`absolute -left-[41px] p-2 rounded-full ${active ? 'bg-amber-600' : 'bg-gray-300'}`}>
      {icon}
    </div>
    <div>
      <h4 className="font-bold text-gray-900">{title}</h4>
      <p className="text-sm text-gray-600">{desc}</p>
      {date && <p className="text-xs text-gray-400 mt-1">{date}</p>}
    </div>
  </div>
);