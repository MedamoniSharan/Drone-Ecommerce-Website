import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import { ShippingMarquee } from '@/components/ShippingMarquee';
import { ComboOffersSection } from '@/components/ComboOffersSection';
import { ProductShowcase } from '@/components/ProductShowcase';
import { ProductShowcaseGrid } from '@/components/ProductShowcaseGrid';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-[98px] md:pt-[113px]">
        <Hero />

        <ShippingMarquee />

        <ProductShowcaseGrid />

        <ComboOffersSection />

        <ProductShowcase />

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
