import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getProductPath } from '@/data/products';

interface Product {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  originalPrice: string;
  discount: string;
  image: string;
  hoverImage: string;
  tag: string;
  rating?: string;
  emiPrice: string;
}

const PRODUCTS: Product[] = [
  {
    id: 'combo-1',
    title: 'E88 Pro Drone + Futuristic Space Fighter LED Model',
    subtitle:
      'Dual Flying Toys Combo Easy to Fly Foldable Drone Crash Resistant Plane Fun for All Ages',
    price: '₹ 2,399.00',
    originalPrice: '₹ 3,699.00',
    discount: '35% off',
    image:
      'https://zonealpha.in/cdn/shop/files/E88-PRO-Drone-4K-with-Wide-Angle-HD-4K-Dual-Camera-Height-Hold-WiFi-RC-Foldable-Quadcopter-E88-Drone_result.jpg?v=1776777347&width=713',
    hoverImage:
      'https://zonealpha.in/cdn/shop/files/WhatsApp_Image_2026-06-06_at_1.53.51_PM_1_c483cdee-9e28-429e-89a8-8d5d06464b58.jpg?v=1780742159&width=1254',
    tag: 'Hot Selling Combo 🔥',
    emiPrice: '800',
  },
  {
    id: 'combo-2',
    title:
      'HY320 Mini Smart Projector + R39 Max Retro Gaming Console Combo | Big Screen Gaming & Entertainment Bundle',
    subtitle: 'Retro Gaming + Big Screen Movies in One Combo',
    price: '₹ 5,599.00',
    originalPrice: '₹ 8,299.00',
    discount: '33% off',
    image:
      'https://zonealpha.in/cdn/shop/files/download_11_10b5666b-2fd2-4bdd-a392-2cea9a2bbdbf.png?v=1780494812&width=990',
    hoverImage:
      'https://zonealpha.in/cdn/shop/files/file_000000000d0c71fa9ff63aeb238c77af.png?v=1780494798&width=1254',
    tag: '🔥 Best Seller Combo',
    emiPrice: '641',
  },
  {
    id: 'combo-3',
    title: 'E88 Pro Drone + Fighter JET + Spider Gesture Control Drone',
    subtitle: '3-in-1 RC combo Easy to fly Durable build Indoor & outdoor use Perfect for kids',
    price: '₹ 4,799.00',
    originalPrice: '₹ 5,999.00',
    discount: '20% off',
    image: 'https://zonealpha.in/cdn/shop/files/IMG-20260327-WA0001.jpg?v=1776777198&width=1080',
    hoverImage:
      'https://zonealpha.in/cdn/shop/files/WhatsApp_Image_2026-06-06_at_4.23.21_PM.jpg?v=1780743270&width=1254',
    tag: '3-in-1 RC Combo Pack',
    rating: '5.0',
    emiPrice: '812',
  },
  {
    id: 'combo-4',
    title: 'E88 Pro 4K Camera Drone + M1 Merak One 3-Axis Gimbal Combo',
    subtitle: 'Shoot Aerial + Smooth Cinematic Videos in One Combo',
    price: '₹ 4,399.00',
    originalPrice: '₹ 4,999.00',
    discount: '12% off',
    image:
      'https://zonealpha.in/cdn/shop/files/IMG_1237_ea817946-a274-47f6-aba3-6b17aa7677e7.jpg?v=1774610028&width=1946',
    hoverImage:
      'https://zonealpha.in/cdn/shop/files/file_00000000823c72088a7e3caf1b83ce1d.png?v=1776777347&width=1254',
    tag: '🔥 Creator Combo Deal',
    emiPrice: '744',
  },
  {
    id: 'combo-5',
    title: 'Spider Gesture Control Drone + R39 Max Retro Handheld Game',
    subtitle:
      'Gesture Flying Drone 20000+ Games Console LED Lights and Flips Dual Joystick Gaming Indoor and Outdoor Use',
    price: '₹ 4,999.00',
    originalPrice: '₹ 7,499.00',
    discount: '33% off',
    image: 'https://zonealpha.in/cdn/shop/files/IMG-20260327-WA0001.jpg?v=1776777198&width=1080',
    hoverImage:
      'https://zonealpha.in/cdn/shop/files/file_00000000a8387208ad749ecea27ca590.png?v=1776777581&width=1254',
    tag: 'Hot Selling Combo',
    emiPrice: '845',
  },
  {
    id: 'combo-6',
    title: 'J-2 & E88 Pro Dual Foldable RC Drone Combo with Dual Batteries',
    subtitle: 'Dual Drone Combo | HD Camera | WiFi FPV | Easy Controls | Long Flight Time',
    price: '₹ 2,999.00',
    originalPrice: '₹ 3,699.00',
    discount: '19% off',
    image:
      'https://zonealpha.in/cdn/shop/files/WhatsApp-Image-2024-12-24-at-5.28.57-PM-scaled.jpg?v=1774610009&width=1426',
    hoverImage:
      'https://zonealpha.in/cdn/shop/files/WhatsApp_Image_2026-06-06_at_4.09.02_PM.jpg?v=1780742387&width=1254',
    tag: 'Top Features',
    emiPrice: '1000',
  },
];

const EmiWidget = ({ amount }: { amount: string }) => (
  <div className="flex items-center gap-1 mt-1 bg-white border border-transparent rounded-md w-fit cursor-pointer hover:bg-gray-50 transition-colors group">
    <span className="text-[12px] font-normal text-gray-800 flex items-center">
      <span>or</span>
      <span className="ml-1 font-bold text-[#9e5a16]">₹{amount}</span>
      <span>/Month</span>
    </span>
    <div className="ml-1 px-1.5 py-1 bg-[#2da257] text-white rounded-sm flex items-center gap-1">
      <span className="text-[9px] font-medium leading-none whitespace-nowrap">Buy on EMI</span>
      <img
        src="https://assets.snapmint.com/assets/merchant/whitearrow-category.png"
        alt="EMI arrow"
        className="w-2 h-auto"
      />
    </div>
  </div>
);

const ProductCard = ({ product }: { product: Product }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Link to={getProductPath(product.id)} className="block h-full">
      <article
        className="group flex flex-col bg-[#f2f2f2] rounded-[20px] border-[0.6px] border-[#ebebeb] overflow-hidden transition-all duration-300 hover:shadow-lg h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
      {/* Media Section */}
      <div className="relative aspect-square overflow-hidden rounded-t-[16px] m-0 p-0">
        <img
          src={product.image}
          alt={product.title}
          className={cn(
            'absolute inset-0 w-full h-full object-cover transition-opacity duration-500',
            isHovered ? 'opacity-0' : 'opacity-100',
          )}
        />
        <img
          src={product.hoverImage}
          alt={`${product.title} alternate`}
          className={cn(
            'absolute inset-0 w-full h-full object-cover transition-opacity duration-500',
            isHovered ? 'opacity-100' : 'opacity-0',
          )}
        />

        {/* Tag Banner */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#facc15] text-black px-3 py-2 flex items-center justify-between z-10">
          <span className="text-[12px] font-bold truncate pr-2">{product.tag}</span>
          {product.rating && (
            <div className="flex items-center gap-0.5 bg-white px-1.5 py-0.5 rounded-md text-[11px] font-bold shadow-sm">
              <Star size={10} className="fill-black" />
              <span>{product.rating}</span>
            </div>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="flex flex-col p-3.5 pt-5 gap-3 flex-grow">
        <h3 className="text-[14px] font-bold leading-tight line-clamp-2 text-black group-hover:text-gray-700 transition-colors">
          {product.title}
        </h3>

        <p className="text-[10px] text-gray-500 leading-relaxed line-clamp-2 min-h-[28px]">
          {product.subtitle}
        </p>

        {/* Separator */}
        <div className="border-t-[0.6px] border-dashed border-gray-400 w-full my-0.5" />

        {/* Price Section */}
        <div className="flex flex-col gap-0.5">
          <span className="text-[20px] font-extrabold text-black">{product.price}</span>
          <div className="flex items-center gap-2">
            <span className="text-[13px] text-gray-400 line-through">{product.originalPrice}</span>
            <span className="text-[13px] text-[#16a34a] font-bold">{product.discount}</span>
          </div>
        </div>

        <EmiWidget amount={product.emiPrice} />
      </div>
    </article>
    </Link>
  );
};

export const ComboOffersSection = () => {
  return (
    <section className="w-full max-w-[1540px] mx-auto px-4 md:px-12 py-10">
      {/* Header */}
      <div className="flex flex-col gap-2 mb-8 text-left">
        <h2 className="text-[28px] md:text-[32px] font-extrabold text-black tracking-tight">
          Combo Offers
        </h2>
        <div className="w-16 h-1 bg-[#facc15] rounded-full" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 items-stretch">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Mobile Scroll Indicator */}
      <div className="flex justify-center mt-10 md:hidden">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-black" />
          <div className="w-2 h-2 rounded-full bg-gray-300" />
          <div className="w-2 h-2 rounded-full bg-gray-300" />
        </div>
      </div>
    </section>
  );
};

export default ComboOffersSection;
