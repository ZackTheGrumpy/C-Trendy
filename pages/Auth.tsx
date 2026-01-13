import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Button, Input, Section } from '../components/UI';
import { ArrowLeft, Mail, Lock, User, Phone, CheckCircle, AlertCircle } from 'lucide-react';

export const Login = () => {
  const { login } = useShop();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.username && formData.password) {
      login(formData.username);
      navigate('/shop');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Section className="w-full max-w-md relative z-10">
        <Button variant="secondary" onClick={() => navigate('/')} className="mb-6 py-2 px-4 text-sm border-0 bg-gray-100">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Button>

        <div className="text-center mb-8">
          <h2 className="font-display text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Sign in to continue shopping</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input 
            label="Username" 
            placeholder="Enter your username"
            icon={<User className="w-5 h-5" />}
            value={formData.username}
            onChange={e => setFormData({...formData, username: e.target.value})}
            required
          />
          <Input 
            label="Password" 
            type="password" 
            placeholder="••••••••"
            icon={<Lock className="w-5 h-5" />}
            value={formData.password}
            onChange={e => setFormData({...formData, password: e.target.value})}
            required
          />
          
          <Button type="submit" fullWidth>Login to Account</Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          New to C-Trendy? <Link to="/signup" className="text-amber-600 font-semibold hover:underline">Create Account</Link>
        </p>
      </Section>
    </div>
  );
};

export const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'details' | 'otp'>('details');
  const [otpSent, setOtpSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '', otp: '' });
  const [error, setError] = useState('');

  const sendOtp = () => {
    if (!formData.email) {
      setError('Please enter email first');
      return;
    }
    setOtpSent(true);
    // Simulation
    alert(`Your OTP is 241103`);
  };

  const verifyAndCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.otp !== '241103') {
      setError('Invalid OTP Code');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    // Success flow
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Section className="w-full max-w-md relative z-10">
        <Button variant="secondary" onClick={() => navigate('/login')} className="mb-6 py-2 px-4 text-sm border-0 bg-gray-100">
          <ArrowLeft className="w-4 h-4" /> Back to Login
        </Button>

        <div className="text-center mb-8">
          <h2 className="font-display text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-500 mt-2">Join the C-Trendy Community</p>
        </div>

        <form onSubmit={verifyAndCreate} className="space-y-4">
          <Input 
            label="Full Name" 
            placeholder="John Doe"
            icon={<User className="w-5 h-5" />}
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            required
          />
          <Input 
            label="Phone" 
            type="tel"
            placeholder="+1 234 567 890"
            icon={<Phone className="w-5 h-5" />}
            value={formData.phone}
            onChange={e => setFormData({...formData, phone: e.target.value})}
            required
          />
          
          <div className="flex gap-2 items-end">
            <Input 
              label="Email" 
              type="email"
              placeholder="john@example.com"
              icon={<Mail className="w-5 h-5" />}
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              required
            />
            <Button type="button" onClick={sendOtp} disabled={otpSent} className="mb-[1px] whitespace-nowrap">
              {otpSent ? 'Sent' : 'Send OTP'}
            </Button>
          </div>

          {otpSent && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 animate-pulse">
               <p className="text-xs text-blue-800 flex items-center gap-2">
                 <CheckCircle className="w-4 h-4" /> OTP sent to {formData.email}
               </p>
            </div>
          )}

          <Input 
            label="OTP Code" 
            placeholder="Enter 6-digit code"
            value={formData.otp}
            onChange={e => setFormData({...formData, otp: e.target.value})}
            maxLength={6}
            disabled={!otpSent}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Password" 
              type="password" 
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
              required
            />
             <Input 
              label="Confirm" 
              type="password" 
              value={formData.confirmPassword}
              onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> {error}
            </div>
          )}
          
          <Button type="submit" fullWidth disabled={!otpSent} className="mt-6">Create Account</Button>
        </form>
      </Section>
    </div>
  );
};