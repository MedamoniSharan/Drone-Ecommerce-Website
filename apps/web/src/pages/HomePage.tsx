import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import { ShippingMarquee } from '@/components/ShippingMarquee';
import CategoryGrid from '@/components/CategoryGrid';
import ProductGrid from '@/components/ProductGrid';
import Footer from '@/components/Footer';
import { ShieldCheck, HeadphonesIcon, Truck, RotateCcw } from 'lucide-react';

const features = [
  { icon: ShieldCheck, title: 'Official Warranty', desc: 'Authorized DJI Dealer' },
  { icon: HeadphonesIcon, title: 'Expert Support', desc: 'Call +91 99999 99999' },
  { icon: Truck, title: 'Free Shipping', desc: 'On orders above ₹10,000' },
  { icon: RotateCcw, title: 'Easy Returns', desc: '7 days return policy' },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-[140px]">
        <Hero />

        <ShippingMarquee />

        {/* Features Bar */}
        <section className="bg-gray-50 border-y border-gray-200 py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-600 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-300">
                    <feature.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-bold text-sm uppercase tracking-wider">
                      {feature.title}
                    </h3>
                    <p className="text-gray-500 text-xs">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CategoryGrid />

        {/* Promo Section */}
        <section className="relative h-[60vh] flex items-center overflow-hidden bg-gray-100">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-black/30 z-10" />
            <img
              src="https://images.unsplash.com/photo-1521405924368-64c5b84bec6a?auto=format&fit=crop&q=80&w=2000"
              alt="DJI Goggles"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container mx-auto px-4 relative z-20 text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter drop-shadow-lg">
              Experience First-Person View
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto italic font-light drop-shadow">
              DJI Goggles 2 offer next-level comfort and convenience. Now smaller, lighter, and
              equipped with Micro-OLED screens.
            </p>
            <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold px-10 py-4 rounded-full transition-all hover:scale-105 active:scale-95">
              Explore FPV
            </button>
          </div>
        </section>

        <ProductGrid />

        {/* Newsletter Section */}
        <section className="py-24 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tighter">
              Stay In The Loop
            </h2>
            <p className="text-gray-500 mb-8 font-medium">
              Get the latest DJI news, reviews and store deals delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-white border border-gray-300 rounded-full px-8 py-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <button className="bg-gray-900 text-white font-bold px-10 py-4 rounded-full hover:bg-cyan-500 transition-all">
                Subscribe
              </button>
            </form>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
