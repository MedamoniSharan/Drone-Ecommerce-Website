export interface CatalogProduct {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  comparePrice?: string;
  discount?: string;
  rating: number;
  reviewCount?: number;
  features: string;
  mainImage: string;
  hoverImage: string;
  galleryImages?: string[];
  soldOut: boolean;
  emiPrice: string;
  emiMonths?: number;
  category: string;
  models?: string[];
  batteryOptions?: string[];
  prepaidPrice?: string;
  prepaidDiscount?: string;
  freeGift?: string;
  descriptionPoints: string[];
}

export interface CategoryIcon {
  id: string;
  label: string;
  image: string;
  slug: string;
}

export const CATEGORY_ICONS: CategoryIcon[] = [
  {
    id: 'drones',
    label: 'Drones',
    slug: 'drones',
    image:
      'https://zonealpha.in/cdn/shop/files/E88-PRO-Drone-4K-with-Wide-Angle-HD-4K-Dual-Camera-Height-Hold-WiFi-RC-Foldable-Quadcopter-E88-Drone_result.webp?v=1763735715&width=800',
  },
  {
    id: 'gimbals',
    label: 'Gimbal',
    slug: 'gimbals',
    image:
      'https://djiindiashop.com/cdn/shop/files/ChatGPT_Image_May_8_2026_02_10_50_PM.png?v=1778229674&width=1092',
  },
  {
    id: 'action',
    label: 'Action Cameras',
    slug: 'action',
    image:
      'https://djiindiashop.com/cdn/shop/files/imgi_86_07a460c41963750113b6f2d649e5873c_ultra_1068aeaa-cd51-43cb-8016-6ebd47fd8228.webp?v=1769678486&width=1280',
  },
  {
    id: 'accessories',
    label: 'Accessories',
    slug: 'accessories',
    image:
      'https://images.unsplash.com/photo-1473968512647-3e44a224fe8f?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'fpv',
    label: 'FPV & Goggles',
    slug: 'fpv',
    image:
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'combos',
    label: 'Combos',
    slug: 'combos',
    image: 'https://zonealpha.in/cdn/shop/files/IMG-20260327-WA0001.jpg?v=1776777198&width=1080',
  },
  {
    id: 'new-arrivals',
    label: 'New Arrivals',
    slug: 'new-arrivals',
    image:
      'https://djiindiashop.com/cdn/shop/files/65c07cfe987bdaa28a3da5ec65f50e84_ultra_11fbd1a3-ead9-45e2-8b5b-c3af2d8df677.webp?v=1781515087&width=1280',
  },
  {
    id: 'enterprise',
    label: 'Enterprise',
    slug: 'enterprise',
    image:
      'https://images.unsplash.com/photo-1482050340791-4d261c24ff5d?auto=format&fit=crop&q=80&w=400',
  },
];

export const PRODUCT_CATALOG: CatalogProduct[] = [
  {
    id: '1',
    title: 'E88 Pro Drone with 4K Camera',
    subtitle: 'Brushless Motor',
    price: '₹ 1,099.00',
    comparePrice: '₹ 1,999.00',
    discount: '45% off',
    rating: 4.7,
    reviewCount: 6,
    features: 'Foldable, Dual Camera',
    mainImage:
      'https://zonealpha.in/cdn/shop/files/IMG_20251121_143758_1.jpg?v=1763735715&width=2000',
    hoverImage:
      'https://zonealpha.in/cdn/shop/files/E88-PRO-Drone-4K-with-Wide-Angle-HD-4K-Dual-Camera-Height-Hold-WiFi-RC-Foldable-Quadcopter-E88-Drone_result.webp?v=1763735715&width=800',
    galleryImages: [
      'https://zonealpha.in/cdn/shop/files/IMG_20251121_143758_1.jpg?v=1763735715&width=2000',
      'https://zonealpha.in/cdn/shop/files/E88-PRO-Drone-4K-with-Wide-Angle-HD-4K-Dual-Camera-Height-Hold-WiFi-RC-Foldable-Quadcopter-E88-Drone_result.webp?v=1763735715&width=800',
      'https://zonealpha.in/cdn/shop/files/1773223019928_jpg.png?v=1773230646&width=1024',
      'https://zonealpha.in/cdn/shop/files/file_00000000d5fc71fa9299f1f43e8dc002.png?v=1776773513&width=1254',
      'https://zonealpha.in/cdn/shop/files/file_000000000e1c71fa867ee76d4733ad77.png?v=1776773513&width=1254',
    ],
    soldOut: true,
    emiPrice: '366',
    emiMonths: 3,
    category: 'drones',
    models: ['Without Brushless Motor', 'With Brushless Motor'],
    batteryOptions: ['2+1 Battery FREE', '3+1 Battery FREE'],
    prepaidPrice: '₹1044.05',
    prepaidDiscount: '₹54.95',
    freeGift: 'Get Free Extra 2 Battery worth ₹999',
    descriptionPoints: [
      '4K HD Dual Camera with Wide Angle Lens',
      'Foldable & Portable Quadcopter Design',
      'WiFi FPV Real-Time Video Transmission',
      'Headless Mode & One-Key Takeoff/Landing',
      'Altitude Hold & 360° Flip Stunts',
      'Up to 15 Minutes Flight Time',
      '2.4GHz Remote Control with 100m Range',
      'Ideal for Beginners & Outdoor Flying',
    ],
  },
  {
    id: '2',
    title: 'J6 Pro Brushless Motor Drone with Gimball Camera 180 ° Camera 📸',
    subtitle: '180 degree Gimball Rotating Camera',
    price: '₹ 2,700.00',
    comparePrice: '₹ 4,999.00',
    discount: '46% off',
    rating: 4.5,
    features: 'Double Battery',
    mainImage:
      'https://zonealpha.in/cdn/shop/files/1773223019928_jpg.png?v=1773230646&width=1024',
    hoverImage:
      'https://zonealpha.in/cdn/shop/files/1773230262744_jpg.png?v=1773230646&width=1234',
    soldOut: true,
    emiPrice: '900',
    category: 'drones',
    descriptionPoints: [
      '180° Gimbal Rotating Camera for Dynamic Shots',
      'Brushless Motor for Stable & Powerful Flight',
      'HD Aerial Photography & Videography',
      'Double Battery Pack for Extended Fly Time',
      'WiFi FPV Live Feed to Smartphone',
      'One-Key Return & Headless Mode',
      'Suitable for Indoor & Outdoor Use',
      'Durable Build with LED Night Lights',
    ],
  },
  {
    id: '3',
    title: 'E88 Pro GPS Quadcopter',
    subtitle:
      'Quadcopter Drone | 4K Camera | WiFi FPV, Headless Mode, One-Key Takeoff & Landing',
    price: '₹ 7,999.00',
    rating: 5.0,
    features: '100-140 Meter Range',
    mainImage:
      'https://zonealpha.in/cdn/shop/files/file_00000000d5fc71fa9299f1f43e8dc002.png?v=1776773513&width=1254',
    hoverImage:
      'https://zonealpha.in/cdn/shop/files/file_000000000e1c71fa867ee76d4733ad77.png?v=1776773513&width=1254',
    soldOut: true,
    emiPrice: '915',
    category: 'drones',
    descriptionPoints: [
      'GPS-Assisted Intelligent Flight Modes',
      '4K Camera with WiFi FPV Streaming',
      '100–140 Meter Control Range',
      'Headless Mode for Easy Orientation',
      'One-Key Takeoff, Landing & Return Home',
      'Follow Me & Waypoint Flight Support',
      'Stable Hover with Altitude Hold',
      'Includes Remote & Spare Propellers',
    ],
  },
  {
    id: '4',
    title: 'Alpha One Racing Drone',
    subtitle: 'High Speed Racing Edition',
    price: '₹ 12,499.00',
    comparePrice: '₹ 15,999.00',
    discount: '22% off',
    rating: 4.9,
    features: 'Carbon Fiber Frame',
    mainImage:
      'https://zonealpha.in/cdn/shop/files/file_00000000d5fc71fa9299f1f43e8dc002.png?v=1776773513&width=1254',
    hoverImage:
      'https://zonealpha.in/cdn/shop/files/IMG_20251121_143758_1.jpg?v=1763735715&width=2000',
    soldOut: false,
    emiPrice: '1,499',
    category: 'drones',
    descriptionPoints: [
      'High-Speed Racing Drone Design',
      'Carbon Fiber Lightweight Frame',
      'Responsive Controls for Agile Maneuvers',
      'HD FPV Camera for Immersive Flying',
      'Up to 120 km/h Top Speed',
      'Modular Parts for Easy Repairs',
      'Built for FPV Enthusiasts & Racers',
      'Includes Racing Remote Controller',
    ],
  },
  {
    id: 'combo-1',
    title: 'E88 Pro Drone + Futuristic Space Fighter LED Model',
    subtitle: 'Dual Flying Toys Combo Easy to Fly Foldable Drone',
    price: '₹ 2,399.00',
    comparePrice: '₹ 3,699.00',
    discount: '35% off',
    rating: 4.8,
    features: 'Hot Selling Combo 🔥',
    mainImage:
      'https://zonealpha.in/cdn/shop/files/E88-PRO-Drone-4K-with-Wide-Angle-HD-4K-Dual-Camera-Height-Hold-WiFi-RC-Foldable-Quadcopter-E88-Drone_result.jpg?v=1776777347&width=713',
    hoverImage:
      'https://zonealpha.in/cdn/shop/files/WhatsApp_Image_2026-06-06_at_1.53.51_PM_1_c483cdee-9e28-429e-89a8-8d5d06464b58.jpg?v=1780742159&width=1254',
    soldOut: false,
    emiPrice: '800',
    category: 'combos',
    descriptionPoints: [
      'E88 Pro Foldable 4K Drone Included',
      'Futuristic Space Fighter LED Model',
      'Easy to Fly for All Age Groups',
      'Crash-Resistant Durable Build',
      'Dual Flying Toys in One Combo Pack',
      'Perfect Gift for Kids & Beginners',
      'Indoor & Outdoor Flying Fun',
      'Complete Starter Kit with Batteries',
    ],
  },
  {
    id: 'combo-2',
    title: 'HY320 Mini Smart Projector + R39 Max Retro Gaming Console Combo',
    subtitle: 'Retro Gaming + Big Screen Movies in One Combo',
    price: '₹ 5,599.00',
    comparePrice: '₹ 8,299.00',
    discount: '33% off',
    rating: 4.6,
    features: '🔥 Best Seller Combo',
    mainImage:
      'https://zonealpha.in/cdn/shop/files/download_11_10b5666b-2fd2-4bdd-a392-2cea9a2bbdbf.png?v=1780494812&width=990',
    hoverImage:
      'https://zonealpha.in/cdn/shop/files/file_000000000d0c71fa9ff63aeb238c77af.png?v=1780494798&width=1254',
    soldOut: false,
    emiPrice: '641',
    category: 'combos',
    descriptionPoints: [
      'HY320 Mini Smart Projector with HD Output',
      'R39 Max Retro Gaming Console with 20,000+ Games',
      'Big Screen Movies & Gaming in One Bundle',
      'Compact Portable Entertainment Setup',
      'Dual HDMI & USB Connectivity Options',
      'Perfect for Home Theatre & Game Nights',
      'Easy Plug-and-Play Setup',
      'Best Value Entertainment Combo Deal',
    ],
  },
  {
    id: 'combo-3',
    title: 'E88 Pro Drone + Fighter JET + Spider Gesture Control Drone',
    subtitle: '3-in-1 RC combo Easy to fly Durable build Indoor & outdoor use',
    price: '₹ 4,799.00',
    comparePrice: '₹ 5,999.00',
    discount: '20% off',
    rating: 5.0,
    reviewCount: 12,
    features: '3-in-1 RC Combo Pack',
    mainImage: 'https://zonealpha.in/cdn/shop/files/IMG-20260327-WA0001.jpg?v=1776777198&width=1080',
    hoverImage:
      'https://zonealpha.in/cdn/shop/files/WhatsApp_Image_2026-06-06_at_4.23.21_PM.jpg?v=1780743270&width=1254',
    soldOut: false,
    emiPrice: '812',
    category: 'combos',
    descriptionPoints: [
      'E88 Pro 4K Foldable Drone',
      'Fighter JET RC Plane Model',
      'Spider Gesture Control Drone',
      '3-in-1 RC Combo for Maximum Fun',
      'Easy to Fly — Perfect for Kids',
      'Durable Build for Indoor & Outdoor',
      'Gesture & Remote Dual Control Modes',
      'Complete 3-Toy Gift Pack',
    ],
  },
  {
    id: 'combo-4',
    title: 'E88 Pro 4K Camera Drone + M1 Merak One 3-Axis Gimbal Combo',
    subtitle: 'Shoot Aerial + Smooth Cinematic Videos in One Combo',
    price: '₹ 4,399.00',
    comparePrice: '₹ 4,999.00',
    discount: '12% off',
    rating: 4.8,
    features: '🔥 Creator Combo Deal',
    mainImage:
      'https://zonealpha.in/cdn/shop/files/IMG_1237_ea817946-a274-47f6-aba3-6b17aa7677e7.jpg?v=1774610028&width=1946',
    hoverImage:
      'https://zonealpha.in/cdn/shop/files/file_00000000823c72088a7e3caf1b83ce1d.png?v=1776777347&width=1254',
    soldOut: false,
    emiPrice: '744',
    category: 'combos',
    descriptionPoints: [
      'E88 Pro 4K Aerial Camera Drone',
      'M1 Merak One 3-Axis Gimbal Stabilizer',
      'Shoot Smooth Cinematic Footage',
      'Creator-Focused Aerial + Handheld Combo',
      'Ideal for Vloggers & Content Creators',
      'Stable Gimbal for Shake-Free Videos',
      'Complete Content Creation Bundle',
      'Save More with This Creator Deal',
    ],
  },
  {
    id: 'combo-5',
    title: 'Spider Gesture Control Drone + R39 Max Retro Handheld Game',
    subtitle: 'Gesture Flying Drone + 20000+ Games Console',
    price: '₹ 4,999.00',
    comparePrice: '₹ 7,499.00',
    discount: '33% off',
    rating: 4.7,
    features: 'Hot Selling Combo',
    mainImage: 'https://zonealpha.in/cdn/shop/files/IMG-20260327-WA0001.jpg?v=1776777198&width=1080',
    hoverImage:
      'https://zonealpha.in/cdn/shop/files/file_00000000a8387208ad749ecea27ca590.png?v=1776777581&width=1254',
    soldOut: false,
    emiPrice: '845',
    category: 'combos',
    descriptionPoints: [
      'Spider Gesture Control Flying Drone',
      'R39 Max Retro Handheld Gaming Console',
      '20,000+ Built-In Classic Games',
      'LED Lights & 360° Flip Stunts',
      'Dual Joystick Gaming Controls',
      'Indoor & Outdoor Flying & Gaming',
      'Fun Combo for Kids & Teens',
      'Two Premium Toys in One Pack',
    ],
  },
  {
    id: 'combo-6',
    title: 'J-2 & E88 Pro Dual Foldable RC Drone Combo with Dual Batteries',
    subtitle: 'Dual Drone Combo | HD Camera | WiFi FPV | Easy Controls',
    price: '₹ 2,999.00',
    comparePrice: '₹ 3,699.00',
    discount: '19% off',
    rating: 4.6,
    features: 'Top Features',
    mainImage:
      'https://zonealpha.in/cdn/shop/files/WhatsApp-Image-2024-12-24-at-5.28.57-PM-scaled.jpg?v=1774610009&width=1426',
    hoverImage:
      'https://zonealpha.in/cdn/shop/files/WhatsApp_Image_2026-06-06_at_4.09.02_PM.jpg?v=1780742387&width=1254',
    soldOut: false,
    emiPrice: '1000',
    category: 'combos',
    descriptionPoints: [
      'J-2 & E88 Pro Dual Foldable Drones',
      'Dual Batteries for Extended Flight',
      'HD Camera with WiFi FPV',
      'Easy Controls for Beginners',
      'Long Flight Time per Charge',
      'Two Drones — Double the Fun',
      'Foldable Portable Design',
      'Complete Dual Drone Starter Kit',
    ],
  },
  {
    id: 'osmo-pocket-4-creator',
    title: 'Osmo Pocket 4 Creator Combo',
    subtitle: 'Pocket-sized 4K camera with creator accessories',
    price: '₹ 52,990.00',
    comparePrice: '₹ 59,990.00',
    discount: '12% off',
    rating: 4.8,
    features: 'Creator Edition',
    mainImage:
      'https://djiindiashop.com/cdn/shop/files/8bcf212a94cd1f7c089e7abaa5f11d0b_ultra.webp?v=1776849277&width=1280',
    hoverImage:
      'https://djiindiashop.com/cdn/shop/files/8bcf212a94cd1f7c089e7abaa5f11d0b_ultra.webp?v=1776849277&width=1280',
    soldOut: false,
    emiPrice: '1766',
    category: 'action',
    descriptionPoints: [
      '1" CMOS Sensor & 4K/120fps Recording',
      '14-Stop Dynamic Range for Pro Quality',
      '10-bit D-Log M Color Profile',
      '3-Axis Stabilization & Rotatable Touchscreen',
      '2x Lossless Zoom for Creative Shots',
      'Creator Combo with Handle & Accessories',
      'ActiveTrack 6.0 & Intelligent Focusing',
      'Osmo Audio Direct Microphone Connection',
    ],
  },
  {
    id: 'osmo-pocket-4-standard',
    title: 'Osmo Pocket 4 Standard',
    subtitle: 'Compact 4K handheld camera',
    price: '₹ 44,990.00',
    comparePrice: '₹ 49,990.00',
    discount: '10% off',
    rating: 4.7,
    features: 'Standard Edition',
    mainImage:
      'https://djiindiashop.com/cdn/shop/files/65c07cfe987bdaa28a3da5ec65f50e84_ultra_11fbd1a3-ead9-45e2-8b5b-c3af2d8df677.webp?v=1781515087&width=1280',
    hoverImage:
      'https://djiindiashop.com/cdn/shop/files/65c07cfe987bdaa28a3da5ec65f50e84_ultra_11fbd1a3-ead9-45e2-8b5b-c3af2d8df677.webp?v=1781515087&width=1280',
    soldOut: false,
    emiPrice: '1499',
    category: 'action',
    descriptionPoints: [
      '1" CMOS & 4K/240fps High-Speed Recording',
      '14-Stop Dynamic Range',
      '10-bit D-Log Color Profile',
      '3-Axis Stabilization & Rotatable Touchscreen',
      '2x Lossless Zoom',
      '107GB Built-In Storage & Fast Transfer',
      'New ActiveTrack 6.0 & Intelligent Focusing',
      'Osmo Audio 4-Channel Output',
    ],
  },
  {
    id: 'osmo-action-6',
    title: 'Osmo Action 6',
    subtitle: 'Action Camera',
    price: '₹ 29,990.00',
    comparePrice: '₹ 34,990.00',
    discount: '14% off',
    rating: 4.9,
    features: '4K HDR Video',
    mainImage:
      'https://djiindiashop.com/cdn/shop/files/imgi_86_07a460c41963750113b6f2d649e5873c_ultra_1068aeaa-cd51-43cb-8016-6ebd47fd8228.webp?v=1769678486&width=1280',
    hoverImage:
      'https://djiindiashop.com/cdn/shop/files/imgi_86_07a460c41963750113b6f2d649e5873c_ultra_1068aeaa-cd51-43cb-8016-6ebd47fd8228.webp?v=1769678486&width=1280',
    soldOut: false,
    emiPrice: '999',
    category: 'action',
    descriptionPoints: [
      '4K/120fps HDR Video Recording',
      '1/1.3" CMOS Sensor for Low-Light Performance',
      '10-bit & D-Log M Color Modes',
      'RockSteady 3.0 + HorizonSteady Stabilization',
      'Waterproof up to 18m with Case',
      'Front & Rear Color Touchscreens',
      'Magnetic Quick-Release Mounting',
      'Up to 160 Minutes Battery Life',
    ],
  },
  {
    id: 'osmo-mobile-8p',
    title: 'Osmo Mobile 8P',
    subtitle: 'Handheld Gimbal',
    price: '₹ 12,990.00',
    comparePrice: '₹ 14,990.00',
    discount: '13% off',
    rating: 4.7,
    features: 'ActiveTrack 7.0',
    mainImage:
      'https://djiindiashop.com/cdn/shop/files/ChatGPT_Image_May_8_2026_02_10_50_PM.png?v=1778229674&width=1092',
    hoverImage:
      'https://djiindiashop.com/cdn/shop/files/ChatGPT_Image_May_8_2026_02_10_50_PM.png?v=1778229674&width=1092',
    soldOut: false,
    emiPrice: '433',
    category: 'gimbals',
    descriptionPoints: [
      '3-Axis Smartphone Stabilization',
      'ActiveTrack 7.0 Subject Tracking',
      'Built-In Extension Rod & Tripod',
      'Fast Setup with Magnetic Phone Clamp',
      'Gesture Control for Hands-Free Shooting',
      'Supports Phones up to 290g',
      'Up to 10 Hours Battery Life',
      'Ideal for Vlogging & Live Streaming',
    ],
  },
];

export function getProductsByCategory(category?: string) {
  if (!category) return PRODUCT_CATALOG;
  return PRODUCT_CATALOG.filter((product) => product.category === category);
}

export function getProductById(id: string) {
  return PRODUCT_CATALOG.find((product) => product.id === id);
}

export function getProductPath(id: string) {
  return `/product/${id}`;
}

export const PRODUCTS_PAGE_PATH = '/products';
