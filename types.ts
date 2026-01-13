export interface Product {
  id: number;
  name: string;
  type: string;
  price: number;
  image: string;
}

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL';

export interface CartItem extends Product {
  size: Size;
  quantity: number;
}

export interface StockInventory {
  [productId: number]: {
    [key in Size]: number;
  };
}

export interface FilterState {
  search: string;
  category: string;
  priceRange: string;
}

export interface User {
  username: string;
  email?: string;
  isLoggedIn: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered';
  shipping: {
    name: string;
    address: string;
    city: string;
    zip: string;
  };
}