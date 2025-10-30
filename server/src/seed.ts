import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Experience from './models/Experience';
import PromoCode from './models/PromoCode';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/highway-delite';

const experiences = [
  {
    title: 'Kayaking',
    location: 'Udupi',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    price: 999,
    tags: ['Adventure', 'Water Sports'],
    availableDates: [
      new Date('2025-10-22'),
      new Date('2025-10-23'),
      new Date('2025-10-24'),
      new Date('2025-10-25'),
      new Date('2025-10-26')
    ],
    slots: [
      { time: '07:00 am', available: 4, soldOut: false },
      { time: '09:00 am', available: 3, soldOut: false },
      { time: '11:00 am', available: 5, soldOut: false },
      { time: '01:00 pm', available: 0, soldOut: true }
    ],
    about: 'Scenic routes, trained guides, and safety briefing. Minimum age 10.',
    minAge: 10,
    included: ['Helmet and Life jackets', 'Expert guide', 'Safety briefing']
  },
  {
    title: 'Nandi Hills Sunrise',
    location: 'Bangalore',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    price: 899,
    tags: ['Scenic', 'Trekking'],
    availableDates: [
      new Date('2025-10-22'),
      new Date('2025-10-23'),
      new Date('2025-10-24'),
      new Date('2025-10-25'),
      new Date('2025-10-26')
    ],
    slots: [
      { time: '04:00 am', available: 8, soldOut: false },
      { time: '05:00 am', available: 6, soldOut: false }
    ],
    about: 'Experience breathtaking sunrise views from Nandi Hills. Guided trek with breakfast included.',
    minAge: 8,
    included: ['Transportation', 'Breakfast', 'Guide']
  },
  {
    title: 'Coffee Trail',
    location: 'Coorg',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800',
    price: 1299,
    tags: ['Nature', 'Scenic'],
    availableDates: [
      new Date('2025-10-22'),
      new Date('2025-10-23'),
      new Date('2025-10-24'),
      new Date('2025-10-25'),
      new Date('2025-10-26')
    ],
    slots: [
      { time: '09:00 am', available: 10, soldOut: false },
      { time: '02:00 pm', available: 8, soldOut: false }
    ],
    about: 'Explore coffee plantations and learn about coffee processing. Includes coffee tasting.',
    minAge: 12,
    included: ['Plantation tour', 'Coffee tasting', 'Local guide']
  },
  {
    title: 'Kayaking',
    location: 'Udupi, Karnataka',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800',
    price: 999,
    tags: ['Adventure', 'Water Sports'],
    availableDates: [
      new Date('2025-10-22'),
      new Date('2025-10-23'),
      new Date('2025-10-24'),
      new Date('2025-10-25'),
      new Date('2025-10-26')
    ],
    slots: [
      { time: '07:00 am', available: 4, soldOut: false },
      { time: '09:00 am', available: 3, soldOut: false },
      { time: '11:00 am', available: 5, soldOut: false },
      { time: '01:00 pm', available: 0, soldOut: true }
    ],
    about: 'Scenic routes, trained guides, and safety briefing. Minimum age 10.',
    minAge: 10,
    included: ['Helmet and Life jackets', 'Expert guide', 'Safety briefing']
  },
  {
    title: 'Boat Cruise',
    location: 'Sunderban',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    price: 999,
    tags: ['Scenic', 'Wildlife'],
    availableDates: [
      new Date('2025-10-22'),
      new Date('2025-10-23'),
      new Date('2025-10-24'),
      new Date('2025-10-25'),
      new Date('2025-10-26')
    ],
    slots: [
      { time: '08:00 am', available: 12, soldOut: false },
      { time: '03:00 pm', available: 10, soldOut: false }
    ],
    about: 'Explore the mangrove forests and spot wildlife on this guided boat cruise.',
    minAge: 5,
    included: ['Boat ride', 'Wildlife guide', 'Refreshments']
  },
  {
    title: 'Bunjee Jumping',
    location: 'Manali',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800',
    price: 999,
    tags: ['Adventure', 'Extreme'],
    availableDates: [
      new Date('2025-10-22'),
      new Date('2025-10-23'),
      new Date('2025-10-24'),
      new Date('2025-10-25'),
      new Date('2025-10-26')
    ],
    slots: [
      { time: '10:00 am', available: 6, soldOut: false },
      { time: '12:00 pm', available: 5, soldOut: false },
      { time: '03:00 pm', available: 4, soldOut: false }
    ],
    about: 'Experience the ultimate adrenaline rush with professional instructors.',
    minAge: 18,
    included: ['Safety equipment', 'Professional instructor', 'Certificate']
  },
  {
    title: 'Coffee Trail',
    location: 'Coorg',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800',
    price: 1299,
    tags: ['Nature', 'Scenic'],
    availableDates: [
      new Date('2025-10-22'),
      new Date('2025-10-23'),
      new Date('2025-10-24'),
      new Date('2025-10-25'),
      new Date('2025-10-26')
    ],
    slots: [
      { time: '09:00 am', available: 10, soldOut: false },
      { time: '02:00 pm', available: 8, soldOut: false }
    ],
    about: 'Explore coffee plantations and learn about coffee processing. Includes coffee tasting.',
    minAge: 12,
    included: ['Plantation tour', 'Coffee tasting', 'Local guide']
  }
];

const promoCodes = [
  {
    code: 'SAVE10',
    type: 'percentage' as const,
    value: 10,
    active: true,
    minPurchase: 0
  },
  {
    code: 'FLAT100',
    type: 'flat' as const,
    value: 100,
    active: true,
    minPurchase: 500
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Experience.deleteMany({});
    await PromoCode.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert experiences
    await Experience.insertMany(experiences);
    console.log('✅ Inserted experiences');

    // Insert promo codes
    await PromoCode.insertMany(promoCodes);
    console.log('✅ Inserted promo codes');

    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
