import React, { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CreditCard, Gift, Percent, ShieldCheck, Star, Truck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';
import { getProductById } from '@/data/products';
import { useCart } from '@/context/CartContext';

function StarRating({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              'w-4 h-4',
              i < Math.floor(rating)
                ? 'fill-emerald-500 text-emerald-500'
                : 'fill-emerald-200 text-emerald-200',
            )}
          />
        ))}
      </div>
      <span className="text-sm text-gray-600">{reviewCount} reviews</span>
    </div>
  );
}

const TRUST_BADGES = [
  { icon: ShieldCheck, label: '100% Genuine Product' },
  { icon: Truck, label: 'Free Shipping' },
  { icon: Percent, label: 'GST Invoice Provided' },
  { icon: ShieldCheck, label: '1 Year Replacement Warranty' },
];

export default function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const product = productId ? getProductById(productId) : undefined;

  const gallery = product?.galleryImages ?? [product?.mainImage, product?.hoverImage].filter(Boolean) as string[];
  const models = product?.models ?? [product?.subtitle ?? 'Standard'];
  const batteryOptions = product?.batteryOptions ?? ['Standard Battery'];

  const [activeImage, setActiveImage] = useState(0);
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [selectedBattery, setSelectedBattery] = useState(batteryOptions[0]);
  const { addItem } = useCart();

  if (!product) {
    return <Navigate to="/products/drones" replace />;
  }

  const reviewCount = product.reviewCount ?? Math.round(product.rating * 2);
  const emiMonths = product.emiMonths ?? 3;

  const goPrev = () => setActiveImage((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  const goNext = () => setActiveImage((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-[98px] md:pt-[113px]">
        {/* Breadcrumbs */}
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-4">
          <nav className="text-sm text-gray-500">
            <Link to="/" className="hover:text-black transition-colors">
              Home
            </Link>
            <span className="mx-2">&gt;</span>
            <span className="text-gray-900 font-medium">{product.title}</span>
          </nav>
        </div>

        <section className="max-w-[1200px] mx-auto px-4 md:px-8 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Gallery */}
            <div className="flex gap-4 lg:sticky lg:top-[130px] self-start">
              <div className="hidden sm:flex flex-col gap-3 shrink-0">
                {gallery.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    className={cn(
                      'w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all bg-white',
                      activeImage === index ? 'border-black' : 'border-gray-200 hover:border-gray-400',
                    )}
                  >
                    <img src={image} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>

              <div className="relative flex-1 aspect-square bg-white rounded-2xl overflow-hidden">
                <img
                  src={gallery[activeImage]}
                  alt={product.title}
                  className="w-full h-full object-contain"
                />
                {gallery.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={goPrev}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black text-white shadow-md flex items-center justify-center hover:bg-gray-800 transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black text-white shadow-md flex items-center justify-center hover:bg-gray-800 transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Product info */}
            <div className="flex flex-col gap-5">
              <StarRating rating={product.rating} reviewCount={reviewCount} />

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                {product.title}
              </h1>

              <div>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-3xl md:text-4xl font-bold text-[#e53935]">{product.price}</span>
                  {product.comparePrice && (
                    <>
                      <span className="text-lg text-gray-400 line-through">{product.comparePrice}</span>
                      {product.discount && (
                        <span className="px-2.5 py-1 bg-[#e53935] text-white text-xs font-bold rounded-md">
                          Save {product.discount.replace(' off', '')}
                        </span>
                      )}
                    </>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">MRP (Inclusive of all taxes)</p>
              </div>

              {/* EMI */}
              <div className="flex flex-col gap-1 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-semibold text-emerald-800">EMI Available</span>
                </div>
                <p className="text-sm text-gray-700">
                  Starting from <strong className="text-black">₹{product.emiPrice}</strong>/month ({emiMonths}{' '}
                  months)
                </p>
              </div>

              {/* Product description points */}
              <div className="py-2">
                <ul className="space-y-2.5">
                  {product.descriptionPoints.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-gray-800 leading-snug">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gray-900 shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {TRUST_BADGES.map((badge) => (
                  <div
                    key={badge.label}
                    className="flex flex-col items-center text-center gap-2 p-3 rounded-xl bg-amber-50 border border-amber-100"
                  >
                    <div className="w-10 h-10 rounded-full bg-amber-400/20 flex items-center justify-center">
                      <badge.icon className="w-5 h-5 text-amber-700" />
                    </div>
                    <span className="text-[10px] font-bold text-gray-800 uppercase leading-tight">
                      {badge.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Promo banners */}
              <div className="rounded-xl overflow-hidden bg-gradient-to-r from-[#f97316] to-[#fb923c] text-white px-5 py-3 text-sm font-semibold text-center">
                India&apos;s No.1 Gadget Store | 1 Lakh+ Active Customers
              </div>

              {product.freeGift && (
                <div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-[#fed7aa] to-[#ffedd5] px-5 py-3 text-sm font-semibold text-gray-900">
                  <Gift className="w-5 h-5 shrink-0 text-orange-600" />
                  {product.freeGift}
                </div>
              )}

              {/* Prepaid discount */}
              {product.prepaidPrice && product.prepaidDiscount && (
                <div className="flex items-center justify-between gap-4 p-4 border border-gray-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <Percent className="w-5 h-5 text-gray-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">
                      Get it for <strong className="text-black">{product.prepaidPrice}</strong> at
                      checkout. Extra prepaid discount applied.
                    </p>
                  </div>
                  <span className="shrink-0 px-3 py-1.5 border border-dashed border-gray-400 rounded-lg text-xs font-bold text-gray-800 whitespace-nowrap">
                    Extra {product.prepaidDiscount} off
                  </span>
                </div>
              )}

              {/* Model selector */}
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-3">
                  Model: <span className="font-normal text-gray-600">{selectedModel}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {models.map((model) => (
                    <button
                      key={model}
                      type="button"
                      onClick={() => setSelectedModel(model)}
                      className={cn(
                        'px-4 py-2.5 rounded-full text-sm font-medium border transition-colors',
                        selectedModel === model
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-gray-800 border-gray-300 hover:border-gray-500',
                      )}
                    >
                      {model}
                    </button>
                  ))}
                </div>
              </div>

              {/* Battery selector */}
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-3">
                  Battery: <span className="font-normal text-gray-600">{selectedBattery}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {batteryOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setSelectedBattery(option)}
                      className={cn(
                        'px-4 py-2.5 rounded-full text-sm font-medium border transition-colors',
                        selectedBattery === option
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-gray-800 border-gray-300 hover:border-gray-500',
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to cart */}
              <button
                type="button"
                onClick={() =>
                  addItem({
                    productId: product.id,
                    title: product.title,
                    price: product.price,
                    comparePrice: product.comparePrice,
                    image: product.mainImage,
                    model: selectedModel,
                    battery: selectedBattery,
                  })
                }
                className="w-full py-4 rounded-xl text-base font-bold transition-all mt-2 bg-[#f97316] hover:bg-[#ea580c] text-black active:scale-[0.99]"
              >
                Add to cart
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
