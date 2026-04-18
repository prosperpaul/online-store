import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const products = [
  {
    name: 'HAVIT HV-G92 Gamepad',
    price: 120,
    originalPrice: 160,
    discount: 40,
    image: '/images/Frame 611.png',
    rating: 5,
    reviews: 88,
    category: 'Gaming',
    inStock: true,
    colors: [],
    isNew: false,
  },
  {
    name: 'AK-900 Wired Keyboard',
    price: 960,
    originalPrice: 1160,
    discount: 35,
    image: '/images/keyboard.png',
    rating: 4,
    reviews: 75,
    category: 'Electronics',
    inStock: true,
    colors: [],
    isNew: false,
  },
  {
    name: 'IPS LCD Gaming Monitor',
    price: 370,
    originalPrice: 400,
    discount: 30,
    image: '/images/display.png',
    rating: 4.5,
    reviews: 99,
    category: 'Electronics',
    inStock: true,
    colors: [],
    isNew: false,
  },
  {
    name: 'S-Series Comfort Chair',
    price: 375,
    originalPrice: 500,
    discount: 25,
    image: '/images/chair.png',
    rating: 4.5,
    reviews: 99,
    category: 'Furniture',
    inStock: true,
    colors: [],
    isNew: false,
  },
  {
    name: 'The North Coat',
    price: 260,
    originalPrice: 360,
    image: '/images/coat.png',
    rating: 5,
    reviews: 65,
    category: 'Fashion',
    inStock: true,
    colors: [],
    isNew: false,
  },
  {
    name: 'Gucci Duffle Bag',
    price: 960,
    originalPrice: 1160,
    image: '/images/bag.png',
    rating: 4.5,
    reviews: 65,
    category: 'Fashion',
    inStock: true,
    colors: [],
    isNew: false,
  },
  {
    name: 'RGB Liquid CPU Cooler',
    price: 160,
    originalPrice: 170,
    image: '/images/Frame 610.png',
    rating: 4.5,
    reviews: 65,
    category: 'Electronics',
    inStock: true,
    colors: [],
    isNew: false,
  },
  {
    name: 'Small BookShelf',
    price: 360,
    image: '/images/shelf.png',
    rating: 5,
    reviews: 65,
    category: 'Furniture',
    inStock: true,
    colors: [],
    isNew: false,
  },
  {
    name: 'Breed Dry Dog Food',
    price: 1000,
    image: '/images/dog.png',
    rating: 3,
    reviews: 35,
    category: 'Pets',
    inStock: true,
    colors: [],
    isNew: false,
  },
  {
    name: 'CANON EOS DSLR Camera',
    price: 360,
    image: '/images/camera.png',
    rating: 4,
    reviews: 95,
    category: 'Electronics',
    inStock: true,
    colors: [],
    isNew: false,
  },
  {
    name: 'ASUS FHD Gaming Laptop',
    price: 700,
    image: '/images/laptop.png',
    rating: 5,
    reviews: 325,
    category: 'Electronics',
    inStock: true,
    colors: [],
    isNew: false,
  },
  {
    name: 'Curology Product Set',
    price: 500,
    image: '/images/cream.png',
    rating: 4,
    reviews: 145,
    category: 'Beauty',
    inStock: true,
    colors: [],
    isNew: false,
  },
  {
    name: 'Kids Electric Car',
    price: 960,
    image: '/images/toy-car.png',
    rating: 5,
    reviews: 65,
    category: 'Toys',
    inStock: true,
    colors: ['red', 'black'],
    isNew: true,
  },
  {
    name: 'Jr. Zoom Soccer Cleats',
    price: 1160,
    image: '/images/boot.png',
    rating: 5,
    reviews: 35,
    category: 'Sports',
    inStock: true,
    colors: ['yellow', 'red'],
    isNew: false,
  },
  {
    name: 'GP11 Shooter USB Gamepad',
    price: 660,
    image: '/images/gamepad.png',
    rating: 4.5,
    reviews: 55,
    category: 'Gaming',
    inStock: true,
    colors: ['black', 'red'],
    isNew: true,
  },
  {
    name: 'Quilted Satin Jacket',
    price: 660,
    image: '/images/green.png',
    rating: 4.5,
    reviews: 35,
    category: 'Fashion',
    inStock: true,
    colors: ['green', 'red'],
    isNew: false,
  },
];

async function main() {
  console.log('Seeding products...');
  await prisma.product.deleteMany();

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log(`Seeded ${products.length} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
