import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';

// Hardcoding the initial data from the frontend's mock to migrate it into the Database
const products = [
  {
    id: 'p1',
    name: 'Minimalist Cotton T-Shirt',
    price: 2800.00,
    category: 'men',
    description: 'Expertly crafted from premium heavy-weight cotton, this classic tee offers a relaxed fit and incredibly soft feel. Perfect for everyday wear.',
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Sand'],
    brand: 'Stuckfit',
    rating: 4.8,
    reviews: 124,
    isNewItem: true,
    isTrending: true,
  },
  {
    id: 'p2',
    name: 'Linen Blend Trousers',
    price: 7120.00,
    category: 'women',
    description: 'Breathable linen-blend trousers featuring a flattering high-rise waist and fluid wide-leg silhouette. The ultimate warm-weather staple.',
    images: ['https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&q=80&w=800'],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Beige', 'White', 'Olive'],
    brand: 'Stuckfit',
    rating: 4.9,
    reviews: 89,
    isNewItem: false,
    isTrending: true,
  },
  {
    id: 'p3',
    name: 'Oversized Wool Blend Coat',
    price: 15600.00,
    category: 'women',
    description: 'A statement outerwear piece crafted from a luxurious wool blend. Features drop shoulders, wide lapels and a relaxed silhouette.',
    images: ['https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&q=80&w=800'],
    sizes: ['S', 'M', 'L'],
    colors: ['Camel', 'Black'],
    brand: 'Stuckfit Collection',
    rating: 4.7,
    reviews: 56,
    isNewItem: true,
    isTrending: false,
  },
  {
    id: 'p4',
    name: 'Essential Ribbed Knit Sweater',
    price: 5200.00,
    category: 'men',
    description: 'A versatile mid-weight sweater knitted with a distinct ribbed texture. Designed with a classic crew neck and comfortable regular fit.',
    images: ['https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?auto=format&fit=crop&q=80&w=800'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Navy', 'Grey', 'Off-White'],
    brand: 'Stuckfit Essentials',
    rating: 4.5,
    reviews: 42,
    isNewItem: false,
    isTrending: true,
  },
  {
    id: 'p5',
    name: 'Leather Crossbody Bag',
    price: 10000.00,
    category: 'accessories',
    description: 'Structured crossbody bag made from smooth, genuine leather. Features elegant gold-tone hardware and an adjustable strap.',
    images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800'],
    sizes: ['OS'],
    colors: ['Tan', 'Black'],
    brand: 'Stuckfit Leather',
    rating: 4.6,
    reviews: 78,
    isNewItem: true,
    isTrending: true,
  },
  {
    id: 'p6',
    name: 'Kids Denim Overall',
    price: 3600.00,
    category: 'kids',
    description: 'Durable organic cotton denim overalls for the little ones. Features adjustable straps, multiple pockets, and a playful relaxed fit.',
    images: ['https://images.unsplash.com/photo-1519238263530-99abca9665ae?auto=format&fit=crop&q=80&w=800'],
    sizes: ['2Y', '4Y', '6Y', '8Y'],
    colors: ['Blue Wash', 'Black Wash'],
    brand: 'Stuckfit Kids',
    rating: 4.9,
    reviews: 112,
    isNewItem: false,
    isTrending: false,
  }
];

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/stuckfit')
  .then(() => console.log('MongoDB Connected for Seeding'))
  .catch((err) => console.log(err));

const importData = async () => {
  try {
    await Product.deleteMany(); // Clear existing products
    await Product.insertMany(products); // Insert new products
    console.log('Data Imported successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error importing data: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
    try {
      await Product.deleteMany();
      console.log('Data Destroyed from database!');
      process.exit();
    } catch (error) {
      console.error(`Error destroying data: ${error.message}`);
      process.exit(1);
    }
  };
  
if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
