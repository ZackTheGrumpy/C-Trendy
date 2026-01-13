import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '../components/UI';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="relative flex-1 flex flex-col justify-center items-center text-center p-6 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=2000" 
            alt="Fashion Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-amber-900/40 via-black/20 to-amber-900/60 mix-blend-multiply"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto animate-[fadeIn_0.8s_ease-out]">
          <div className="mb-8 inline-block animate-[float_4s_ease-in-out_infinite]">
            <img 
              src="https://raw.githubusercontent.com/CrabBerjoget/intestingpowershell/refs/heads/baju/logo.png" 
              alt="C-Trendy Logo" 
              className="h-20 md:h-32 object-contain drop-shadow-2xl" 
            />
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg leading-tight">
            Welcome to <span className="text-amber-400">C-Trendy</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-gray-100 mb-10 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
            The ultimate fashion retail enterprise, now available at your fingertips. Discover styles that define you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => navigate('/login')} 
              className="px-8 py-4 text-lg min-w-[200px] shadow-amber-900/50"
            >
              <ShoppingBag className="w-5 h-5" />
              Start Shopping
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => navigate('/tracking')}
              className="px-8 py-4 text-lg min-w-[200px]"
            >
              <MapPin className="w-5 h-5" />
              Track Order
            </Button>
          </div>
        </div>
      </div>

      {/* Mini Feature Section */}
      <div className="bg-white relative z-20 py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {[
              { title: 'New Arrivals', desc: 'Fresh trends every week', icon: '✨' },
              { title: 'Fast Shipping', desc: 'Delivery within 3-5 days', icon: '🚚' },
              { title: 'Premium Quality', desc: 'Handpicked materials', icon: '💎' }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 bg-amber-50/50 rounded-2xl border border-amber-100 hover:shadow-lg transition-all">
                <span className="text-4xl mb-4">{feature.icon}</span>
                <h3 className="font-display text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};