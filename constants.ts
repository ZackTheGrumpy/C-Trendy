import { Product, Size, StockInventory } from './types';

export const SIZES: Size[] = ['XS', 'S', 'M', 'L', 'XL'];

export const CATEGORIES = ['T-Shirt', 'Jacket', 'Jeans', 'Dress', 'Shirt', 'Pants', 'Hoodie', 'Shorts', 'Skirt', 'Vest', 'Sweater'];

export const PRODUCTS: Product[] = [
  { id: 1, name: 'Classic White T-Shirt', type: 'T-Shirt', price: 29.90, image: 'https://raw.githubusercontent.com/CrabBerjoget/intestingpowershell/refs/heads/baju/1.png' },
  { id: 2, name: 'Denim Jacket', type: 'Jacket', price: 159.90, image: 'https://raw.githubusercontent.com/CrabBerjoget/intestingpowershell/refs/heads/baju/2.png' },
  { id: 3, name: 'Black Skinny Jeans', type: 'Jeans', price: 89.90, image: 'https://raw.githubusercontent.com/CrabBerjoget/intestingpowershell/refs/heads/baju/3.png' },
  { id: 4, name: 'Floral Summer Dress', type: 'Dress', price: 119.90, image: 'https://raw.githubusercontent.com/CrabBerjoget/intestingpowershell/refs/heads/baju/4.png' },
  { id: 5, name: 'Striped Polo Shirt', type: 'Shirt', price: 49.90, image: 'https://raw.githubusercontent.com/CrabBerjoget/intestingpowershell/refs/heads/baju/5.jpeg' },
  { id: 6, name: 'Leather Bomber Jacket', type: 'Jacket', price: 249.90, image: 'https://raw.githubusercontent.com/CrabBerjoget/intestingpowershell/refs/heads/baju/6.jpeg' },
  { id: 7, name: 'Cargo Pants Khaki', type: 'Pants', price: 79.90, image: 'https://raw.githubusercontent.com/CrabBerjoget/intestingpowershell/refs/heads/baju/7.jpeg' },
  { id: 8, name: 'Evening Gown', type: 'Dress', price: 299.90, image: 'https://raw.githubusercontent.com/CrabBerjoget/intestingpowershell/refs/heads/baju/8.jpeg' },
  { id: 9, name: 'Graphic Print Tee', type: 'T-Shirt', price: 39.90, image: 'https://raw.githubusercontent.com/CrabBerjoget/intestingpowershell/refs/heads/baju/9.jpeg' },
  { id: 10, name: 'Hooded Sweatshirt', type: 'Hoodie', price: 69.90, image: 'https://raw.githubusercontent.com/CrabBerjoget/intestingpowershell/refs/heads/baju/10.jpeg' },
  { id: 11, name: 'Blue Chino Shorts', type: 'Shorts', price: 59.90, image: 'https://raw.githubusercontent.com/CrabBerjoget/intestingpowershell/refs/heads/baju/11.jpeg' },
  { id: 12, name: 'Maxi Floral Skirt', type: 'Skirt', price: 79.90, image: 'https://raw.githubusercontent.com/CrabBerjoget/intestingpowershell/refs/heads/baju/12.jpeg' },
  { id: 13, name: 'Button-Down Shirt', type: 'Shirt', price: 54.90, image: 'https://raw.githubusercontent.com/CrabBerjoget/intestingpowershell/refs/heads/baju/13.jpeg' },
  { id: 14, name: 'Puffer Vest', type: 'Vest', price: 89.90, image: 'https://raw.githubusercontent.com/CrabBerjoget/intestingpowershell/refs/heads/baju/14.jpeg' },
  { id: 15, name: 'Slim Fit Trousers', type: 'Pants', price: 99.90, image: 'https://raw.githubusercontent.com/CrabBerjoget/intestingpowershell/refs/heads/baju/15.jpeg' },
  { id: 16, name: 'Cocktail Dress', type: 'Dress', price: 149.90, image: 'https://raw.githubusercontent.com/CrabBerjoget/intestingpowershell/refs/heads/baju/16.jpeg' },
  { id: 17, name: 'V-Neck Sweater', type: 'Sweater', price: 79.90, image: 'https://raw.githubusercontent.com/CrabBerjoget/intestingpowershell/refs/heads/baju/17.jpeg' },
  { id: 18, name: 'Windbreaker Jacket', type: 'Jacket', price: 129.90, image: 'https://raw.githubusercontent.com/CrabBerjoget/intestingpowershell/refs/heads/baju/18.jpeg' },
  { id: 19, name: 'Ripped Boyfriend Jeans', type: 'Jeans', price: 94.90, image: 'https://raw.githubusercontent.com/CrabBerjoget/intestingpowershell/refs/heads/baju/19.jpeg' },
  { id: 20, name: 'Wrap Dress', type: 'Dress', price: 109.90, image: 'https://raw.githubusercontent.com/CrabBerjoget/intestingpowershell/refs/heads/baju/20.jpeg' },
  { id: 21, name: 'Long Sleeve Henley', type: 'T-Shirt', price: 44.90, image: 'https://raw.githubusercontent.com/CrabBerjoget/intestingpowershell/refs/heads/baju/21.jpeg' },
  { id: 22, name: 'Track Jacket', type: 'Jacket', price: 89.90, image: 'https://raw.githubusercontent.com/CrabBerjoget/intestingpowershell/refs/heads/baju/22.jpeg' },
  { id: 23, name: 'Wide Leg Pants', type: 'Pants', price: 84.90, image: 'https://raw.githubusercontent.com/CrabBerjoget/intestingpowershell/refs/heads/baju/23.jpeg' },
  { id: 24, name: 'Midi Pencil Skirt', type: 'Skirt', price: 69.90, image: 'https://raw.githubusercontent.com/CrabBerjoget/intestingpowershell/refs/heads/baju/24.jpeg' },
  { id: 25, name: 'Flannel Shirt', type: 'Shirt', price: 59.90, image: 'https://raw.githubusercontent.com/CrabBerjoget/intestingpowershell/refs/heads/baju/25.jpeg' },
  { id: 26, name: 'Quilted Jacket', type: 'Jacket', price: 139.90, image: 'https://raw.githubusercontent.com/CrabBerjoget/intestingpowershell/refs/heads/baju/26.jpeg' },
  { id: 27, name: 'Athletic Joggers', type: 'Pants', price: 64.90, image: 'https://raw.githubusercontent.com/CrabBerjoget/intestingpowershell/refs/heads/baju/27.jpeg' },
  { id: 28, name: 'A-Line Dress', type: 'Dress', price: 99.90, image: 'https://raw.githubusercontent.com/CrabBerjoget/intestingpowershell/refs/heads/baju/28.jpeg' },
  { id: 29, name: 'Turtleneck Sweater', type: 'Sweater', price: 74.90, image: 'https://raw.githubusercontent.com/CrabBerjoget/intestingpowershell/refs/heads/baju/29.jpeg' },
  { id: 30, name: 'Cardigan', type: 'Sweater', price: 69.90, image: 'https://raw.githubusercontent.com/CrabBerjoget/intestingpowershell/refs/heads/baju/30.jpeg' }
];

// Generate random stock
export const generateInitialStock = (): StockInventory => {
  const inventory: StockInventory = {};
  PRODUCTS.forEach(product => {
    inventory[product.id] = {} as any;
    SIZES.forEach(size => {
      // Logic from original: ID 1 size XL is 0, others random 20-150
      if (product.id === 1 && size === 'XL') {
        inventory[product.id][size] = 0;
      } else {
        inventory[product.id][size] = Math.floor(Math.random() * 131) + 20;
      }
    });
  });
  return inventory;
};