// Pheeline Market Place - Core Data Layer
// This represents the data model that will be served by the API

// ============ TYPES ============

export type MarketPermanence = 'permanent' | 'periodic' | 'seasonal' | 'temporary' | 'mobile' | 'irregular';
export type MarketFunction = 'retail' | 'wholesale' | 'farm_gate' | 'aggregation' | 'mixed';
export type MarketEnvironment = 'urban' | 'suburban' | 'rural' | 'remote' | 'roadside';
export type MarketSpecialization = 'general' | 'agricultural' | 'livestock' | 'fish' | 'food' | 'textile' | 'electronics' | 'automotive' | 'building_materials' | 'pharmaceutical' | 'farm_inputs' | 'machinery' | 'household' | 'mixed';
export type ActivityStatus = 'ACTIVE_NOW' | 'ACTIVE_TODAY' | 'RECENTLY_ACTIVE' | 'POSSIBLY_ACTIVE' | 'NO_RECENT_CONFIRMATION' | 'CLOSED' | 'SEASONAL' | 'INACTIVE';
export type VerificationStatus = 'UNVERIFIED' | 'PENDING' | 'VERIFIED' | 'REJECTED' | 'EXPIRED';
export type FreshnessLevel = 'very_recent' | 'recent' | 'recentish' | 'historical' | 'stale';
export type PriceStatus = 'VALID' | 'PENDING_REVIEW' | 'OUTLIER' | 'REJECTED' | 'EXPIRED';

export interface Market {
  id: string;
  name: string;
  aliases: string[];
  slug: string;
  description: string;
  permanence: MarketPermanence;
  function: MarketFunction;
  environment: MarketEnvironment;
  specialization: MarketSpecialization;
  state: string;
  lga: string;
  nearestSettlement: string;
  latitude: number;
  longitude: number;
  locationApproximate: boolean;
  nearestMajorRoad: string;
  marketDays: MarketSchedule[];
  majorCommodities: string[];
  wholesaleAvailable: boolean;
  retailAvailable: boolean;
  minimumPurchase: string | null;
  vehicleAccess: boolean;
  roadCondition: 'good' | 'fair' | 'poor' | 'very_poor' | 'unknown';
  mobileNetwork: 'good' | 'fair' | 'poor' | 'none';
  electricity: boolean;
  activityStatus: ActivityStatus;
  verificationStatus: VerificationStatus;
  lastActivityReport: string;
  lastPriceUpdate: string;
  priceObservations: PriceObservation[];
  vendorCount: number;
  photoCount: number;
  reportCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface MarketSchedule {
  type: 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'custom';
  days?: string[];
  cycleDays?: number;
  peakHours?: string;
  notes?: string;
}

export interface PriceObservation {
  id: string;
  productId: string;
  productName: string;
  price: number;
  currency: string;
  unit: string;
  quantity: number;
  quality: string | null;
  timestamp: string;
  source: 'community' | 'vendor' | 'verified' | 'admin';
  contributorId: string;
  contributorName: string;
  verificationStatus: PriceStatus;
  confidence: number;
  freshness: FreshnessLevel;
  hasEvidence: boolean;
  notes: string | null;
}

export interface Product {
  id: string;
  name: string;
  aliases: string[];
  slug: string;
  category: string;
  subcategory: string;
  description: string;
  commonUnits: string[];
  imageEmoji: string;
  activeMarkets: number;
  avgPrice: number | null;
  priceUnit: string | null;
  priceFreshness: FreshnessLevel | null;
  priceObservationCount: number;
}

export interface Vendor {
  id: string;
  displayName: string;
  category: string;
  products: string[];
  markets: string[];
  state: string;
  lga: string;
  description: string;
  verificationStatus: VerificationStatus;
  wholesale: boolean;
  retail: boolean;
  minimumOrder: string | null;
  operatingDays: string[];
  contactAvailable: boolean;
  rating: number | null;
  reviewCount: number;
  joinedDate: string;
  lastActive: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  emoji: string;
  subcategories: string[];
  productCount: number;
}

export interface MarketCondition {
  id: string;
  marketId: string;
  type: string;
  description: string;
  timestamp: string;
  source: string;
  verified: boolean;
}

export interface Contributor {
  id: string;
  name: string;
  reports: number;
  accepted: number;
  verified: number;
  marketsContributed: number;
  badges: string[];
  joinDate: string;
}

// ============ SEED DATA ============

export const categories: Category[] = [
  { id: 'cat-1', name: 'Agriculture', slug: 'agriculture', emoji: '🌾', subcategories: ['Roots & Tubers', 'Cereals & Grains', 'Legumes', 'Vegetables', 'Fruits', 'Livestock', 'Poultry', 'Fish', 'Seeds', 'Fertilizers'], productCount: 142 },
  { id: 'cat-2', name: 'Food & Beverages', slug: 'food', emoji: '🍲', subcategories: ['Processed Foods', 'Spices', 'Oils', 'Beverages', 'Snacks'], productCount: 89 },
  { id: 'cat-3', name: 'Fashion & Textiles', slug: 'fashion', emoji: '👗', subcategories: ['Fabrics', 'Ready-made', 'Accessories', 'Footwear'], productCount: 67 },
  { id: 'cat-4', name: 'Electronics', slug: 'electronics', emoji: '📱', subcategories: ['Phones', 'Appliances', 'Accessories', 'Solar'], productCount: 54 },
  { id: 'cat-5', name: 'Building Materials', slug: 'building', emoji: '🧱', subcategories: ['Cement', 'Iron/Steel', 'Wood', 'Roofing', 'Paint'], productCount: 38 },
  { id: 'cat-6', name: 'Household', slug: 'household', emoji: '🏠', subcategories: ['Furniture', 'Kitchen', 'Cleaning', 'Decor'], productCount: 45 },
  { id: 'cat-7', name: 'Livestock & Animals', slug: 'livestock', emoji: '🐄', subcategories: ['Cattle', 'Goats', 'Sheep', 'Poultry', 'Fish'], productCount: 28 },
  { id: 'cat-8', name: 'Farm Inputs', slug: 'farm-inputs', emoji: '🌱', subcategories: ['Seeds', 'Fertilizers', 'Agrochemicals', 'Tools', 'Machinery'], productCount: 34 },
];

export const markets: Market[] = [
  {
    id: 'mkt-001',
    name: 'Mile 12 Market',
    aliases: ['Mile 12 Food Market', 'Mile 12 Fruit Market'],
    slug: 'mile-12-market',
    description: 'One of Lagos\' largest food and produce markets. Major hub for fruits, vegetables, and food items from across Nigeria. Significant wholesale activity with goods distributed throughout Lagos and beyond.',
    permanence: 'permanent',
    function: 'mixed',
    environment: 'urban',
    specialization: 'food',
    state: 'Lagos',
    lga: 'Kosofe',
    nearestSettlement: 'Mile 12, Ikorodu Road',
    latitude: 6.6018,
    longitude: 3.4168,
    locationApproximate: false,
    nearestMajorRoad: 'Ikorodu Road',
    marketDays: [{ type: 'daily', peakHours: '5:00 AM - 6:00 PM', notes: 'Peak wholesale activity early morning 4-7 AM' }],
    majorCommodities: ['tomatoes', 'pepper', 'onions', 'fruits', 'vegetables', 'rice', 'palm-oil'],
    wholesaleAvailable: true,
    retailAvailable: true,
    minimumPurchase: null,
    vehicleAccess: true,
    roadCondition: 'fair',
    mobileNetwork: 'good',
    electricity: true,
    activityStatus: 'ACTIVE_NOW',
    verificationStatus: 'VERIFIED',
    lastActivityReport: '2026-01-15T08:30:00Z',
    lastPriceUpdate: '2026-01-15T07:00:00Z',
    priceObservations: [
      { id: 'po-001', productId: 'prod-1', productName: 'Tomatoes', price: 85000, currency: 'NGN', unit: 'basket', quantity: 1, quality: 'Medium', timestamp: '2026-01-15T07:00:00Z', source: 'community', contributorId: 'c-1', contributorName: 'MarketScout_Lagos', verificationStatus: 'VALID', confidence: 0.85, freshness: 'very_recent', hasEvidence: true, notes: 'Fresh basket, good quality' },
      { id: 'po-002', productId: 'prod-2', productName: 'Red Pepper (Tatashe)', price: 70000, currency: 'NGN', unit: 'bag', quantity: 1, quality: null, timestamp: '2026-01-15T06:45:00Z', source: 'community', contributorId: 'c-2', contributorName: 'PriceWatcher', verificationStatus: 'VALID', confidence: 0.8, freshness: 'very_recent', hasEvidence: false, notes: null },
      { id: 'po-003', productId: 'prod-3', productName: 'Onions', price: 95000, currency: 'NGN', unit: 'sack', quantity: 1, quality: null, timestamp: '2026-01-14T09:00:00Z', source: 'community', contributorId: 'c-1', contributorName: 'MarketScout_Lagos', verificationStatus: 'VALID', confidence: 0.75, freshness: 'recent', hasEvidence: true, notes: 'Standard sack size' },
    ],
    vendorCount: 340,
    photoCount: 12,
    reportCount: 47,
    createdAt: '2025-06-01T00:00:00Z',
    updatedAt: '2026-01-15T08:30:00Z',
  },
  {
    id: 'mkt-002',
    name: 'Ariaria International Market',
    aliases: ['Ariaria Market', 'Aba Market'],
    slug: 'ariaria-international-market',
    description: 'West Africa\'s largest marketplace for manufactured goods, textiles, leather products and imported items. Located in Aba, Abia State. Major commercial hub serving southeastern Nigeria and beyond.',
    permanence: 'permanent',
    function: 'wholesale',
    environment: 'urban',
    specialization: 'mixed',
    state: 'Abia',
    lga: 'Aba South',
    nearestSettlement: 'Aba',
    latitude: 5.1101,
    longitude: 7.3647,
    locationApproximate: false,
    nearestMajorRoad: 'Aba-Port Harcourt Expressway',
    marketDays: [{ type: 'daily', peakHours: '8:00 AM - 6:00 PM', notes: 'Busiest Monday-Thursday' }],
    majorCommodities: ['textiles', 'leather-goods', 'electronics', 'shoes', 'bags', 'hardware'],
    wholesaleAvailable: true,
    retailAvailable: true,
    minimumPurchase: null,
    vehicleAccess: true,
    roadCondition: 'fair',
    mobileNetwork: 'good',
    electricity: true,
    activityStatus: 'ACTIVE_NOW',
    verificationStatus: 'VERIFIED',
    lastActivityReport: '2026-01-15T10:00:00Z',
    lastPriceUpdate: '2026-01-15T09:30:00Z',
    priceObservations: [
      { id: 'po-010', productId: 'prod-20', productName: 'Ankara Fabric (6 yards)', price: 8500, currency: 'NGN', unit: 'piece', quantity: 1, quality: 'Standard', timestamp: '2026-01-15T09:30:00Z', source: 'community', contributorId: 'c-3', contributorName: 'AbaScout', verificationStatus: 'VALID', confidence: 0.9, freshness: 'very_recent', hasEvidence: true, notes: 'Quality varies by vendor' },
    ],
    vendorCount: 1200,
    photoCount: 24,
    reportCount: 89,
    createdAt: '2025-06-01T00:00:00Z',
    updatedAt: '2026-01-15T10:00:00Z',
  },
  {
    id: 'mkt-003',
    name: 'Bodija Market',
    aliases: ['Bodija Food Market'],
    slug: 'bodija-market',
    description: 'Major food market in Ibadan, Oyo State. Known for fresh produce, grains, and food items sourced from across southwestern Nigeria and the middle belt.',
    permanence: 'permanent',
    function: 'mixed',
    environment: 'urban',
    specialization: 'food',
    state: 'Oyo',
    lga: 'Ibadan North',
    nearestSettlement: 'Bodija, Ibadan',
    latitude: 7.4136,
    longitude: 3.8764,
    locationApproximate: false,
    nearestMajorRoad: 'Iwo Road',
    marketDays: [{ type: 'daily', peakHours: '6:00 AM - 7:00 PM' }],
    majorCommodities: ['yam', 'cassava', 'garri', 'palm-oil', 'vegetables', 'fruits', 'grains'],
    wholesaleAvailable: true,
    retailAvailable: true,
    minimumPurchase: null,
    vehicleAccess: true,
    roadCondition: 'good',
    mobileNetwork: 'good',
    electricity: true,
    activityStatus: 'ACTIVE_TODAY',
    verificationStatus: 'VERIFIED',
    lastActivityReport: '2026-01-14T16:00:00Z',
    lastPriceUpdate: '2026-01-14T14:00:00Z',
    priceObservations: [
      { id: 'po-020', productId: 'prod-5', productName: 'Yam (large tuber)', price: 4500, currency: 'NGN', unit: 'tuber', quantity: 1, quality: 'Large', timestamp: '2026-01-14T14:00:00Z', source: 'community', contributorId: 'c-4', contributorName: 'IbadanReporter', verificationStatus: 'VALID', confidence: 0.8, freshness: 'recent', hasEvidence: false, notes: null },
      { id: 'po-021', productId: 'prod-6', productName: 'Garri (white)', price: 3500, currency: 'NGN', unit: 'bag', quantity: 1, quality: null, timestamp: '2026-01-14T13:00:00Z', source: 'community', contributorId: 'c-4', contributorName: 'IbadanReporter', verificationStatus: 'VALID', confidence: 0.75, freshness: 'recent', hasEvidence: true, notes: '50kg bag' },
    ],
    vendorCount: 450,
    photoCount: 8,
    reportCount: 34,
    createdAt: '2025-06-15T00:00:00Z',
    updatedAt: '2026-01-14T16:00:00Z',
  },
  {
    id: 'mkt-004',
    name: 'Dawanau Grain Market',
    aliases: ['Dawanau Market', 'Kano Grain Market'],
    slug: 'dawanau-grain-market',
    description: 'One of the largest grain markets in West Africa. Located in Dawanau, Kano State. Major trading point for sorghum, millet, maize, rice and other cereals. Operates on a weekly cycle (Tuesdays).',
    permanence: 'periodic',
    function: 'wholesale',
    environment: 'rural',
    specialization: 'agricultural',
    state: 'Kano',
    lga: 'Dawanau',
    nearestSettlement: 'Dawanau',
    latitude: 11.8167,
    longitude: 8.6833,
    locationApproximate: false,
    nearestMajorRoad: 'Kano-Jos Road',
    marketDays: [{ type: 'weekly', days: ['Tuesday'], peakHours: '7:00 AM - 3:00 PM', notes: 'Main market day is Tuesday. Some activity Monday for setup.' }],
    majorCommodities: ['sorghum', 'millet', 'maize', 'rice', 'beans', 'groundnut', 'sesame'],
    wholesaleAvailable: true,
    retailAvailable: false,
    minimumPurchase: '1 bag minimum for most transactions',
    vehicleAccess: true,
    roadCondition: 'fair',
    mobileNetwork: 'fair',
    electricity: false,
    activityStatus: 'RECENTLY_ACTIVE',
    verificationStatus: 'VERIFIED',
    lastActivityReport: '2026-01-14T12:00:00Z',
    lastPriceUpdate: '2026-01-14T11:00:00Z',
    priceObservations: [
      { id: 'po-030', productId: 'prod-10', productName: 'Sorghum', price: 62000, currency: 'NGN', unit: 'bag', quantity: 1, quality: null, timestamp: '2026-01-14T11:00:00Z', source: 'community', contributorId: 'c-5', contributorName: 'KanoAgriScout', verificationStatus: 'VALID', confidence: 0.9, freshness: 'recent', hasEvidence: true, notes: '100kg bag, good quality' },
      { id: 'po-031', productId: 'prod-11', productName: 'Maize', price: 55000, currency: 'NGN', unit: 'bag', quantity: 1, quality: null, timestamp: '2026-01-14T10:30:00Z', source: 'community', contributorId: 'c-5', contributorName: 'KanoAgriScout', verificationStatus: 'VALID', confidence: 0.85, freshness: 'recent', hasEvidence: true, notes: 'Standard bag' },
    ],
    vendorCount: 200,
    photoCount: 6,
    reportCount: 22,
    createdAt: '2025-07-01T00:00:00Z',
    updatedAt: '2026-01-14T12:00:00Z',
  },
  {
    id: 'mkt-005',
    name: 'Orie Orsu Market',
    aliases: ['Orie Market Orsu', 'Orsu Market'],
    slug: 'orie-orsu-market',
    description: 'Traditional periodic market operating on the Orie market day cycle (4-day Igbo market week). Serves rural communities in Imo State with agricultural produce, household items and basic goods.',
    permanence: 'periodic',
    function: 'retail',
    environment: 'rural',
    specialization: 'general',
    state: 'Imo',
    lga: 'Orsu',
    nearestSettlement: 'Orsu',
    latitude: 5.6833,
    longitude: 7.0667,
    locationApproximate: true,
    nearestMajorRoad: 'Orlu-Okigwe Road',
    marketDays: [{ type: 'custom', cycleDays: 4, days: ['Orie'], peakHours: '8:00 AM - 2:00 PM', notes: 'Operates on Orie day of the Igbo 4-day market week' }],
    majorCommodities: ['cassava', 'yam', 'vegetables', 'palm-oil', 'ugba', 'garri', 'firewood'],
    wholesaleAvailable: false,
    retailAvailable: true,
    minimumPurchase: null,
    vehicleAccess: true,
    roadCondition: 'poor',
    mobileNetwork: 'fair',
    electricity: false,
    activityStatus: 'POSSIBLY_ACTIVE',
    verificationStatus: 'PENDING',
    lastActivityReport: '2026-01-10T14:00:00Z',
    lastPriceUpdate: '2026-01-08T12:00:00Z',
    priceObservations: [
      { id: 'po-040', productId: 'prod-7', productName: 'Cassava fresh', price: 500, currency: 'NGN', unit: 'bundle', quantity: 10, quality: null, timestamp: '2026-01-08T12:00:00Z', source: 'community', contributorId: 'c-6', contributorName: 'RuralScout_Imo', verificationStatus: 'VALID', confidence: 0.7, freshness: 'recentish', hasEvidence: false, notes: 'Per bundle of ~10 tubers' },
    ],
    vendorCount: 45,
    photoCount: 3,
    reportCount: 8,
    createdAt: '2025-08-01T00:00:00Z',
    updatedAt: '2026-01-10T14:00:00Z',
  },
  {
    id: 'mkt-006',
    name: 'Yam Market Edo (Ugbowo)',
    aliases: ['Ugbowo Yam Market', 'Benin Yam Market'],
    slug: 'yam-market-edo',
    description: 'Major yam trading market in Benin City, Edo State. One of the primary yam markets in southern Nigeria with significant wholesale volume during harvest season.',
    permanence: 'permanent',
    function: 'wholesale',
    environment: 'urban',
    specialization: 'agricultural',
    state: 'Edo',
    lga: 'Benin City',
    nearestSettlement: 'Ugbowo, Benin City',
    latitude: 6.3350,
    longitude: 5.6030,
    locationApproximate: false,
    nearestMajorRoad: 'Sapele Road',
    marketDays: [{ type: 'daily', peakHours: '7:00 AM - 5:00 PM', notes: 'Peak trading 7-10 AM for wholesale' }],
    majorCommodities: ['yam', 'cassava', 'plantain', 'palm-oil', 'vegetables'],
    wholesaleAvailable: true,
    retailAvailable: true,
    minimumPurchase: '10 tubers for wholesale pricing',
    vehicleAccess: true,
    roadCondition: 'good',
    mobileNetwork: 'good',
    electricity: true,
    activityStatus: 'ACTIVE_NOW',
    verificationStatus: 'VERIFIED',
    lastActivityReport: '2026-01-15T09:00:00Z',
    lastPriceUpdate: '2026-01-15T08:00:00Z',
    priceObservations: [
      { id: 'po-050', productId: 'prod-5', productName: 'Yam (Pona variety)', price: 5000, currency: 'NGN', unit: 'tuber', quantity: 1, quality: 'Large', timestamp: '2026-01-15T08:00:00Z', source: 'community', contributorId: 'c-7', contributorName: 'EdoMarketScout', verificationStatus: 'VALID', confidence: 0.85, freshness: 'very_recent', hasEvidence: true, notes: 'Large Pona yam, wholesale price' },
      { id: 'po-051', productId: 'prod-5', productName: 'Yam (Pona variety)', price: 3500, currency: 'NGN', unit: 'tuber', quantity: 1, quality: 'Medium', timestamp: '2026-01-15T08:15:00Z', source: 'community', contributorId: 'c-7', contributorName: 'EdoMarketScout', verificationStatus: 'VALID', confidence: 0.85, freshness: 'very_recent', hasEvidence: true, notes: 'Medium size' },
    ],
    vendorCount: 180,
    photoCount: 5,
    reportCount: 19,
    createdAt: '2025-07-15T00:00:00Z',
    updatedAt: '2026-01-15T09:00:00Z',
  },
  {
    id: 'mkt-007',
    name: 'Zaria Livestock Market',
    aliases: ['Zaria Cattle Market', 'Kaduna Livestock'],
    slug: 'zaria-livestock-market',
    description: 'Major livestock market in Zaria, Kaduna State. Trading point for cattle, sheep, goats and other animals. Significant weekly trading with buyers from across northern Nigeria.',
    permanence: 'periodic',
    function: 'wholesale',
    environment: 'suburban',
    specialization: 'livestock',
    state: 'Kaduna',
    lga: 'Zaria',
    nearestSettlement: 'Zaria',
    latitude: 11.1167,
    longitude: 7.7167,
    locationApproximate: false,
    nearestMajorRoad: 'Kano-Kaduna Expressway',
    marketDays: [{ type: 'weekly', days: ['Wednesday', 'Saturday'], peakHours: '6:00 AM - 2:00 PM', notes: 'Main days Wednesday and Saturday' }],
    majorCommodities: ['cattle', 'sheep', 'goats', 'hides'],
    wholesaleAvailable: true,
    retailAvailable: true,
    minimumPurchase: 'Single animal',
    vehicleAccess: true,
    roadCondition: 'fair',
    mobileNetwork: 'fair',
    electricity: false,
    activityStatus: 'ACTIVE_TODAY',
    verificationStatus: 'VERIFIED',
    lastActivityReport: '2026-01-15T07:00:00Z',
    lastPriceUpdate: '2026-01-13T14:00:00Z',
    priceObservations: [
      { id: 'po-060', productId: 'prod-30', productName: 'Cattle (adult)', price: 450000, currency: 'NGN', unit: 'head', quantity: 1, quality: 'Good', timestamp: '2026-01-13T14:00:00Z', source: 'community', contributorId: 'c-8', contributorName: 'LivestockScout', verificationStatus: 'VALID', confidence: 0.8, freshness: 'recent', hasEvidence: false, notes: 'Average adult cattle' },
    ],
    vendorCount: 90,
    photoCount: 4,
    reportCount: 15,
    createdAt: '2025-08-01T00:00:00Z',
    updatedAt: '2026-01-15T07:00:00Z',
  },
  {
    id: 'mkt-008',
    name: 'Ibese Cement Market',
    aliases: ['Ibese Market'],
    slug: 'ibese-market',
    description: 'Market area near Ibese in Ogun State, close to the Dangote cement factory. Trading point for building materials and general goods.',
    permanence: 'permanent',
    function: 'mixed',
    environment: 'suburban',
    specialization: 'building_materials',
    state: 'Ogun',
    lga: 'Yewa South',
    nearestSettlement: 'Ibese',
    latitude: 6.8167,
    longitude: 2.8833,
    locationApproximate: false,
    nearestMajorRoad: 'Badagry Road',
    marketDays: [{ type: 'daily', peakHours: '8:00 AM - 5:00 PM' }],
    majorCommodities: ['cement', 'iron-rods', 'building-materials', 'food', 'household'],
    wholesaleAvailable: true,
    retailAvailable: true,
    minimumPurchase: null,
    vehicleAccess: true,
    roadCondition: 'good',
    mobileNetwork: 'good',
    electricity: true,
    activityStatus: 'ACTIVE_NOW',
    verificationStatus: 'VERIFIED',
    lastActivityReport: '2026-01-15T10:00:00Z',
    lastPriceUpdate: '2026-01-15T09:00:00Z',
    priceObservations: [
      { id: 'po-070', productId: 'prod-40', productName: 'Cement (Dangote)', price: 8500, currency: 'NGN', unit: 'bag', quantity: 1, quality: null, timestamp: '2026-01-15T09:00:00Z', source: 'community', contributorId: 'c-9', contributorName: 'OgunScout', verificationStatus: 'VALID', confidence: 0.9, freshness: 'very_recent', hasEvidence: true, notes: '50kg bag' },
    ],
    vendorCount: 75,
    photoCount: 3,
    reportCount: 11,
    createdAt: '2025-09-01T00:00:00Z',
    updatedAt: '2026-01-15T10:00:00Z',
  },
  {
    id: 'mkt-009',
    name: 'Swali Market (Bush Market)',
    aliases: ['Swali Periodic Market'],
    slug: 'swali-bush-market',
    description: 'Rural periodic bush market serving farming communities. Operates on a 4-day cycle. Primarily agricultural produce with limited infrastructure. Important source point for cassava, vegetables and palm products.',
    permanence: 'periodic',
    function: 'retail',
    environment: 'rural',
    specialization: 'agricultural',
    state: 'Delta',
    lga: 'Ughelli South',
    nearestSettlement: 'Swali',
    latitude: 5.4500,
    longitude: 5.9500,
    locationApproximate: true,
    nearestMajorRoad: 'Ughelli-Warri Road (5km access road)',
    marketDays: [{ type: 'custom', cycleDays: 4, days: ['Eke'], peakHours: '8:00 AM - 1:00 PM', notes: 'Operates on Eke day. Small market, may not operate every cycle in rainy season.' }],
    majorCommodities: ['cassava', 'vegetables', 'palm-oil', 'plantain', 'pepper', 'ugba'],
    wholesaleAvailable: false,
    retailAvailable: true,
    minimumPurchase: null,
    vehicleAccess: true,
    roadCondition: 'poor',
    mobileNetwork: 'poor',
    electricity: false,
    activityStatus: 'SEASONAL',
    verificationStatus: 'PENDING',
    lastActivityReport: '2025-12-20T12:00:00Z',
    lastPriceUpdate: '2025-12-18T11:00:00Z',
    priceObservations: [
      { id: 'po-080', productId: 'prod-7', productName: 'Cassava', price: 300, currency: 'NGN', unit: 'bundle', quantity: 8, quality: null, timestamp: '2025-12-18T11:00:00Z', source: 'community', contributorId: 'c-10', contributorName: 'DeltaRuralScout', verificationStatus: 'VALID', confidence: 0.65, freshness: 'historical', hasEvidence: false, notes: 'Small market, limited variety' },
    ],
    vendorCount: 20,
    photoCount: 2,
    reportCount: 5,
    createdAt: '2025-09-15T00:00:00Z',
    updatedAt: '2025-12-20T12:00:00Z',
  },
  {
    id: 'mkt-010',
    name: 'Gwanaria Market (Abuja)',
    aliases: ['Gwanaria', 'Abuja Food Market'],
    slug: 'gwanaria-market',
    description: 'Major food market in Abuja FCT. Primary source of fresh produce for the capital city. Large wholesale section with goods from across Nigeria\'s middle belt and north.',
    permanence: 'permanent',
    function: 'mixed',
    environment: 'suburban',
    specialization: 'food',
    state: 'FCT',
    lga: 'Abuja Municipal',
    nearestSettlement: 'Gwanaria, Karu',
    latitude: 9.0400,
    longitude: 7.5400,
    locationApproximate: false,
    nearestMajorRoad: 'Abuja-Keffi Road',
    marketDays: [{ type: 'daily', peakHours: '5:00 AM - 6:00 PM', notes: 'Wholesale peak 5-8 AM' }],
    majorCommodities: ['tomatoes', 'pepper', 'onions', 'potatoes', 'rice', 'beans', 'fruits', 'vegetables'],
    wholesaleAvailable: true,
    retailAvailable: true,
    minimumPurchase: null,
    vehicleAccess: true,
    roadCondition: 'good',
    mobileNetwork: 'good',
    electricity: true,
    activityStatus: 'ACTIVE_NOW',
    verificationStatus: 'VERIFIED',
    lastActivityReport: '2026-01-15T08:00:00Z',
    lastPriceUpdate: '2026-01-15T07:30:00Z',
    priceObservations: [
      { id: 'po-090', productId: 'prod-1', productName: 'Tomatoes', price: 75000, currency: 'NGN', unit: 'basket', quantity: 1, quality: null, timestamp: '2026-01-15T07:30:00Z', source: 'community', contributorId: 'c-11', contributorName: 'AbujaScout', verificationStatus: 'VALID', confidence: 0.85, freshness: 'very_recent', hasEvidence: true, notes: 'Wholesale basket price' },
    ],
    vendorCount: 500,
    photoCount: 10,
    reportCount: 38,
    createdAt: '2025-06-15T00:00:00Z',
    updatedAt: '2026-01-15T08:00:00Z',
  },
  {
    id: 'mkt-011',
    name: 'Nkwo Oguta Market',
    aliases: ['Oguta Market', 'Nkwo Market'],
    slug: 'nkwo-oguta-market',
    description: 'Traditional periodic market in Oguta, Imo State. Operates on Nkwo day of the Igbo market week cycle. Serves lakeside communities with fish, agricultural produce and general goods.',
    permanence: 'periodic',
    function: 'retail',
    environment: 'rural',
    specialization: 'general',
    state: 'Imo',
    lga: 'Oguta',
    nearestSettlement: 'Oguta',
    latitude: 5.6500,
    longitude: 6.8500,
    locationApproximate: true,
    nearestMajorRoad: 'Orlu-Oguta Road',
    marketDays: [{ type: 'custom', cycleDays: 4, days: ['Nkwo'], peakHours: '8:00 AM - 2:00 PM', notes: 'Nkwo market day. Fishing community market with fresh fish available.' }],
    majorCommodities: ['fish', 'cassava', 'vegetables', 'palm-oil', 'plantain', 'garri'],
    wholesaleAvailable: false,
    retailAvailable: true,
    minimumPurchase: null,
    vehicleAccess: true,
    roadCondition: 'fair',
    mobileNetwork: 'fair',
    electricity: false,
    activityStatus: 'POSSIBLY_ACTIVE',
    verificationStatus: 'UNVERIFIED',
    lastActivityReport: '2026-01-09T13:00:00Z',
    lastPriceUpdate: '2026-01-09T12:00:00Z',
    priceObservations: [
      { id: 'po-100', productId: 'prod-35', productName: 'Fresh Fish (Tilapia)', price: 2500, currency: 'NGN', unit: 'piece', quantity: 1, quality: 'Fresh', timestamp: '2026-01-09T12:00:00Z', source: 'community', contributorId: 'c-6', contributorName: 'RuralScout_Imo', verificationStatus: 'PENDING_REVIEW', confidence: 0.6, freshness: 'recentish', hasEvidence: false, notes: 'Medium size tilapia from Oguta Lake' },
    ],
    vendorCount: 35,
    photoCount: 1,
    reportCount: 4,
    createdAt: '2025-10-01T00:00:00Z',
    updatedAt: '2026-01-09T13:00:00Z',
  },
  {
    id: 'mkt-012',
    name: 'Kasuwan Daji (Bush Market)',
    aliases: ['Kasuwan Daji', 'Saturday Bush Market'],
    slug: 'kasuwan-daji',
    description: 'Traditional bush market in rural Kaduna. Known locally as "market in the bush." Periodic market where farmers bring produce directly. Important aggregation point for grains and agricultural products from surrounding villages.',
    permanence: 'periodic',
    function: 'aggregation',
    environment: 'rural',
    specialization: 'agricultural',
    state: 'Kaduna',
    lga: 'Igabi',
    nearestSettlement: 'Kuriga',
    latitude: 10.6500,
    longitude: 7.5500,
    locationApproximate: true,
    nearestMajorRoad: 'Kaduna-Abuja Road (turnoff at Kuriga)',
    marketDays: [{ type: 'weekly', days: ['Saturday'], peakHours: '7:00 AM - 1:00 PM', notes: 'Saturday only. Farmers bring produce from surrounding villages.' }],
    majorCommodities: ['maize', 'sorghum', 'millet', 'groundnut', 'beans', 'vegetables', 'firewood'],
    wholesaleAvailable: true,
    retailAvailable: true,
    minimumPurchase: 'Flexible - single units available',
    vehicleAccess: true,
    roadCondition: 'poor',
    mobileNetwork: 'poor',
    electricity: false,
    activityStatus: 'RECENTLY_ACTIVE',
    verificationStatus: 'PENDING',
    lastActivityReport: '2026-01-11T13:00:00Z',
    lastPriceUpdate: '2026-01-11T12:00:00Z',
    priceObservations: [
      { id: 'po-110', productId: 'prod-11', productName: 'Maize', price: 48000, currency: 'NGN', unit: 'bag', quantity: 1, quality: null, timestamp: '2026-01-11T12:00:00Z', source: 'community', contributorId: 'c-12', contributorName: 'KadunaFarmScout', verificationStatus: 'VALID', confidence: 0.7, freshness: 'recent', hasEvidence: true, notes: 'Farm-gate price, slightly cheaper than Dawanau' },
    ],
    vendorCount: 60,
    photoCount: 3,
    reportCount: 7,
    createdAt: '2025-10-15T00:00:00Z',
    updatedAt: '2026-01-11T13:00:00Z',
  },
];

export const products: Product[] = [
  { id: 'prod-1', name: 'Tomatoes', aliases: ['Tomaato', 'Tomato'], slug: 'tomatoes', category: 'Agriculture', subcategory: 'Vegetables', description: 'Fresh tomatoes, widely traded across Nigerian markets. Prices vary significantly by season, origin and quality.', commonUnits: ['basket', 'bag', 'kg', 'crate'], imageEmoji: '🍅', activeMarkets: 45, avgPrice: 80000, priceUnit: 'basket', priceFreshness: 'very_recent', priceObservationCount: 234 },
  { id: 'prod-2', name: 'Red Pepper (Tatashe)', aliases: ['Tatashe', 'Red Bell Pepper'], slug: 'red-pepper', category: 'Agriculture', subcategory: 'Vegetables', description: 'Dried or fresh red pepper used extensively in Nigerian cooking.', commonUnits: ['bag', 'kg', 'basket'], imageEmoji: '🌶️', activeMarkets: 38, avgPrice: 68000, priceUnit: 'bag', priceFreshness: 'recent', priceObservationCount: 156 },
  { id: 'prod-3', name: 'Onions', aliases: ['Albasa', 'Alubosa'], slug: 'onions', category: 'Agriculture', subcategory: 'Vegetables', description: 'Bulb onions, primarily sourced from northern Nigeria. Major commodity in most food markets.', commonUnits: ['sack', 'bag', 'kg'], imageEmoji: '🧅', activeMarkets: 52, avgPrice: 90000, priceUnit: 'sack', priceFreshness: 'recent', priceObservationCount: 189 },
  { id: 'prod-5', name: 'Yam', aliases: ['Iṣu', 'Ji', 'Èṣu'], slug: 'yam', category: 'Agriculture', subcategory: 'Roots & Tubers', description: 'Major staple food crop. Multiple varieties including Pona, White yam, Water yam. Prices vary by size and variety.', commonUnits: ['tuber', 'bundle', 'heap'], imageEmoji: '🍠', activeMarkets: 60, avgPrice: 4000, priceUnit: 'tuber', priceFreshness: 'very_recent', priceObservationCount: 312 },
  { id: 'prod-6', name: 'Garri', aliases: ['Garri', 'Agidi'], slug: 'garri', category: 'Agriculture', subcategory: 'Roots & Tubers', description: 'Processed cassava product. White and yellow varieties. Major staple across Nigeria.', commonUnits: ['bag', 'mudu', 'kg', 'paint rubber'], imageEmoji: '🫘', activeMarkets: 55, avgPrice: 3500, priceUnit: 'bag', priceFreshness: 'recent', priceObservationCount: 267 },
  { id: 'prod-7', name: 'Cassava (Fresh)', aliases: ['Manioc', 'Akpu'], slug: 'cassava-fresh', category: 'Agriculture', subcategory: 'Roots & Tubers', description: 'Fresh cassava tubers. Widely available across southern Nigeria markets.', commonUnits: ['bundle', 'tuber', 'bag'], imageEmoji: '🥔', activeMarkets: 48, avgPrice: 400, priceUnit: 'bundle', priceFreshness: 'recentish', priceObservationCount: 178 },
  { id: 'prod-10', name: 'Sorghum', aliases: ['Guinea Corn', 'Dawa', 'Gero'], slug: 'sorghum', category: 'Agriculture', subcategory: 'Cereals & Grains', description: 'Major grain crop in northern Nigeria. Used for food, brewing and animal feed.', commonUnits: ['bag', 'mudu', 'tonne'], imageEmoji: '🌾', activeMarkets: 25, avgPrice: 62000, priceUnit: 'bag', priceFreshness: 'recent', priceObservationCount: 98 },
  { id: 'prod-11', name: 'Maize', aliases: ['Corn', 'Okporoko', 'Agbado'], slug: 'maize', category: 'Agriculture', subcategory: 'Cereals & Grains', description: 'Major cereal crop. Traded in both dry grain and fresh cob forms.', commonUnits: ['bag', 'mudu', 'tonne'], imageEmoji: '🌽', activeMarkets: 42, avgPrice: 52000, priceUnit: 'bag', priceFreshness: 'recent', priceObservationCount: 145 },
  { id: 'prod-20', name: 'Ankara Fabric', aliases: ['African Print', 'Ankara', 'Wax Print'], slug: 'ankara-fabric', category: 'Fashion & Textiles', subcategory: 'Fabrics', description: 'African printed textile fabric. Major commodity in textile markets.', commonUnits: ['piece', '6 yards', '12 yards'], imageEmoji: '👗', activeMarkets: 30, avgPrice: 8500, priceUnit: 'piece', priceFreshness: 'very_recent', priceObservationCount: 67 },
  { id: 'prod-30', name: 'Cattle', aliases: ['Cow', 'Shanu'], slug: 'cattle', category: 'Livestock', subcategory: 'Cattle', description: 'Live cattle traded at livestock markets across northern Nigeria.', commonUnits: ['head'], imageEmoji: '🐄', activeMarkets: 15, avgPrice: 450000, priceUnit: 'head', priceFreshness: 'recent', priceObservationCount: 45 },
  { id: 'prod-35', name: 'Fresh Fish (Tilapia)', aliases: ['Tilapia', 'Tilapy'], slug: 'fresh-fish-tilapia', category: 'Agriculture', subcategory: 'Fish', description: 'Fresh tilapia fish from lakes and ponds. Available at lakeside markets and fish markets.', commonUnits: ['piece', 'kg', 'basket'], imageEmoji: '🐟', activeMarkets: 20, avgPrice: 2500, priceUnit: 'piece', priceFreshness: 'recentish', priceObservationCount: 34 },
  { id: 'prod-40', name: 'Cement (Dangote)', aliases: ['Dangote Cement', 'Cement'], slug: 'cement-dangote', category: 'Building Materials', subcategory: 'Cement', description: '50kg bag of Dangote cement. Widely available at building material markets.', commonUnits: ['bag'], imageEmoji: '🧱', activeMarkets: 35, avgPrice: 8500, priceUnit: 'bag', priceFreshness: 'very_recent', priceObservationCount: 89 },
];

export const vendors: Vendor[] = [
  { id: 'v-1', displayName: 'Mama Nkechi Foods', category: 'Food & Grains', products: ['Garri', 'Yam', 'Cassava', 'Palm Oil'], markets: ['mile-12-market', 'bodija-market'], state: 'Lagos', lga: 'Kosofe', description: 'Wholesale and retail food items. Over 15 years trading at Mile 12 Market.', verificationStatus: 'VERIFIED', wholesale: true, retail: true, minimumOrder: '1 bag for wholesale', operatingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], contactAvailable: true, rating: 4.5, reviewCount: 23, joinedDate: '2025-06-01', lastActive: '2026-01-15' },
  { id: 'v-2', displayName: 'Alhaji Musa Grains', category: 'Grains & Cereals', products: ['Sorghum', 'Maize', 'Millet', 'Rice', 'Beans'], markets: ['dawanau-grain-market', 'kasuwan-daji'], state: 'Kano', lga: 'Dawanau', description: 'Major grain trader at Dawanau Market. Wholesale only. Minimum 10 bags.', verificationStatus: 'VERIFIED', wholesale: true, retail: false, minimumOrder: '10 bags', operatingDays: ['Tuesday'], contactAvailable: true, rating: 4.8, reviewCount: 45, joinedDate: '2025-07-01', lastActive: '2026-01-14' },
  { id: 'v-3', displayName: 'Iya Basira Textiles', category: 'Textiles & Fashion', products: ['Ankara', 'Lace', 'George', 'Aso-oke'], markets: ['ariaria-international-market'], state: 'Abia', lga: 'Aba South', description: 'Quality textiles at competitive prices. Retail and wholesale available.', verificationStatus: 'VERIFIED', wholesale: true, retail: true, minimumOrder: null, operatingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], contactAvailable: true, rating: 4.3, reviewCount: 18, joinedDate: '2025-06-15', lastActive: '2026-01-15' },
  { id: 'v-4', displayName: 'Brother Emeka Produce', category: 'Agricultural Produce', products: ['Yam', 'Cassava', 'Plantain', 'Vegetables'], markets: ['yam-market-edo'], state: 'Edo', lga: 'Benin City', description: 'Fresh produce from Edo farms. Direct from farm-gate to market.', verificationStatus: 'VERIFIED', wholesale: true, retail: true, minimumOrder: '5 tubers for wholesale', operatingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], contactAvailable: true, rating: 4.6, reviewCount: 31, joinedDate: '2025-07-15', lastActive: '2026-01-15' },
  { id: 'v-5', displayName: 'Abuja Fresh Mart', category: 'Fresh Produce', products: ['Tomatoes', 'Pepper', 'Onions', 'Potatoes', 'Fruits'], markets: ['gwanaria-market'], state: 'FCT', lga: 'Abuja Municipal', description: 'Fresh fruits and vegetables. Wholesale and retail. Daily supply from middle belt farms.', verificationStatus: 'VERIFIED', wholesale: true, retail: true, minimumOrder: null, operatingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], contactAvailable: true, rating: 4.4, reviewCount: 27, joinedDate: '2025-06-15', lastActive: '2026-01-15' },
];

export const contributors: Contributor[] = [
  { id: 'c-1', name: 'MarketScout_Lagos', reports: 47, accepted: 42, verified: 15, marketsContributed: 5, badges: ['Market Scout', 'Trusted Contributor'], joinDate: '2025-06-01' },
  { id: 'c-5', name: 'KanoAgriScout', reports: 34, accepted: 30, verified: 12, marketsContributed: 3, badges: ['Commodity Scout', 'Price Reporter'], joinDate: '2025-07-01' },
  { id: 'c-7', name: 'EdoMarketScout', reports: 28, accepted: 25, verified: 8, marketsContributed: 2, badges: ['Market Scout'], joinDate: '2025-07-15' },
  { id: 'c-11', name: 'AbujaScout', reports: 38, accepted: 35, verified: 10, marketsContributed: 4, badges: ['Trusted Contributor', 'Market Expert'], joinDate: '2025-06-15' },
];

// ============ UTILITY FUNCTIONS ============

export function getActivityLabel(status: ActivityStatus): string {
  const labels: Record<ActivityStatus, string> = {
    'ACTIVE_NOW': 'Active Now',
    'ACTIVE_TODAY': 'Active Today',
    'RECENTLY_ACTIVE': 'Recently Active',
    'POSSIBLY_ACTIVE': 'Possibly Active',
    'NO_RECENT_CONFIRMATION': 'No Recent Confirmation',
    'CLOSED': 'Closed',
    'SEASONAL': 'Seasonal',
    'INACTIVE': 'Inactive',
  };
  return labels[status];
}

export function getActivityColor(status: ActivityStatus): string {
  switch (status) {
    case 'ACTIVE_NOW': return 'bg-green-100 text-green-800';
    case 'ACTIVE_TODAY': return 'bg-green-50 text-green-700';
    case 'RECENTLY_ACTIVE': return 'bg-blue-50 text-blue-700';
    case 'POSSIBLY_ACTIVE': return 'bg-yellow-50 text-yellow-700';
    case 'NO_RECENT_CONFIRMATION': return 'bg-gray-100 text-gray-600';
    case 'CLOSED': return 'bg-red-50 text-red-700';
    case 'SEASONAL': return 'bg-amber-50 text-amber-700';
    case 'INACTIVE': return 'bg-gray-100 text-gray-500';
    default: return 'bg-gray-100 text-gray-600';
  }
}

export function getFreshnessLabel(freshness: FreshnessLevel): string {
  const labels: Record<FreshnessLevel, string> = {
    'very_recent': 'Very Recent',
    'recent': 'Recent',
    'recentish': 'Recent-ish',
    'historical': 'Historical',
    'stale': 'Stale',
  };
  return labels[freshness];
}

export function getFreshnessColor(freshness: FreshnessLevel): string {
  switch (freshness) {
    case 'very_recent': return 'text-green-600';
    case 'recent': return 'text-green-500';
    case 'recentish': return 'text-yellow-600';
    case 'historical': return 'text-gray-500';
    case 'stale': return 'text-red-500';
    default: return 'text-gray-500';
  }
}

export function formatPrice(price: number, currency: string = 'NGN'): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return date.toLocaleDateString('en-NG', { month: 'short', day: 'numeric' });
}

export function getMarketDayText(schedule: MarketSchedule): string {
  switch (schedule.type) {
    case 'daily': return 'Open Daily';
    case 'weekly': return schedule.days ? schedule.days.join(', ') : 'Weekly';
    case 'biweekly': return 'Every 2 weeks';
    case 'monthly': return 'Monthly';
    case 'custom': return schedule.days ? schedule.days.join(', ') : `Every ${schedule.cycleDays} days`;
    default: return 'Check schedule';
  }
}

export function getEnvironmentLabel(env: MarketEnvironment): string {
  const labels: Record<MarketEnvironment, string> = {
    'urban': 'Urban',
    'suburban': 'Suburban',
    'rural': 'Rural',
    'remote': 'Remote',
    'roadside': 'Roadside',
  };
  return labels[env];
}

export function getRoadConditionLabel(condition: string): string {
  const labels: Record<string, string> = {
    'good': 'Good',
    'fair': 'Fair',
    'poor': 'Poor',
    'very_poor': 'Very Poor',
    'unknown': 'Unknown',
  };
  return labels[condition] || condition;
}

export function getRoadConditionColor(condition: string): string {
  switch (condition) {
    case 'good': return 'text-green-600';
    case 'fair': return 'text-yellow-600';
    case 'poor': return 'text-orange-600';
    case 'very_poor': return 'text-red-600';
    default: return 'text-gray-500';
  }
}
