import React, { useMemo, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Star, X, ChevronDown, ArrowRight, Zap } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';
import {
  CATEGORY_ICONS,
  getProductsByCategory,
  getProductPath,
  type CatalogProduct,
} from '@/data/products';

const EmiWidget = ({ price }: { price: string }) => (
  <div className="flex items-center gap-1 mt-1 text-[11px] sm:text-xs">
    <div className="flex items-center px-2 py-1 bg-white border border-gray-100 rounded-md shadow-sm">
      <span className="text-gray-500 mr-1">or</span>
      <span className="font-bold text-black flex items-center">
        ₹<span className="mx-0.5">{price}</span>/Month
      </span>
    </div>
    <button
      type="button"
      className="bg-[#2DA257] hover:bg-[#258a49] text-white px-2 py-1 rounded-md font-semibold flex items-center gap-1 transition-colors"
    >
      <span className="hidden sm:inline">Buy on EMI</span>
      <span className="sm:hidden">EMI</span>
      <motion.div animate={{ x: [0, 2, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
        <ArrowRight className="w-2.5 h-2.5" />
      </motion.div>
    </button>
  </div>
);

const ListingProductCard = ({ product }: { product: CatalogProduct }) => {
  return (
    <Link to={getProductPath(product.id)} className="group relative flex flex-col h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col h-full"
      >
        <div className="relative aspect-square overflow-hidden rounded-[20px] bg-[#F2F2F2] border border-[#EBEBEB] transition-all duration-300 group-hover:shadow-xl group-hover:shadow-black/5">
          <div className="relative w-full h-full">
            <img
              src={product.mainImage}
              alt={product.title}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0"
            />
            <img
              src={product.hoverImage}
              alt={`${product.title} Alternate View`}
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
            />
          </div>

          {product.soldOut && (
            <div className="absolute top-4 right-4 z-10">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-white/90 backdrop-blur-sm text-black shadow-sm">
                Sold out
              </span>
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-between bg-[#FACC15] text-black px-4 py-2 text-[11px] sm:text-xs font-semibold">
            <div className="flex items-center gap-1.5 truncate pr-2">
              <Zap className="w-3 h-3 fill-current shrink-0" />
              <span className="truncate uppercase tracking-wider">{product.features}</span>
            </div>
            <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-full shadow-sm shrink-0">
              <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
              <span>{product.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col flex-grow px-2">
          <h3 className="text-sm font-bold text-gray-900 line-clamp-2 min-h-[40px] group-hover:text-blue-600 transition-colors leading-tight">
            {product.title}
          </h3>

          <p className="mt-1 text-[11px] text-gray-500 font-medium truncate uppercase tracking-tight">
            {product.subtitle}
          </p>

          <div className="my-3 border-t border-dashed border-gray-300 w-full" />

          <div className="flex flex-col gap-0.5">
            <span className="text-xl font-black text-gray-900 tracking-tight">{product.price}</span>
            {product.comparePrice && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 line-through">{product.comparePrice}</span>
                <span className="text-xs font-bold text-green-600">{product.discount}</span>
              </div>
            )}
          </div>

          <div className="mt-3">
            <EmiWidget price={product.emiPrice} />
          </div>

          <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="w-full py-2 bg-black text-white text-xs font-bold rounded-lg group-hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
              VIEW DETAILS
              <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default function ProductsPage() {
  const { category: categoryParam } = useParams<{ category?: string }>();
  const location = useLocation();
  const category =
    categoryParam ??
    (location.pathname.startsWith('/products') ? undefined : location.pathname.slice(1)) ??
    'drones';
  const [showOutOfStockOnly, setShowOutOfStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('best-selling');

  const products = useMemo(() => {
    let list = getProductsByCategory(category);
    if (showOutOfStockOnly) {
      list = list.filter((product) => product.soldOut);
    }
    if (sortBy === 'price-low') {
      list = [...list].sort(
        (a, b) =>
          parseFloat(a.price.replace(/[^\d.]/g, '')) - parseFloat(b.price.replace(/[^\d.]/g, '')),
      );
    } else if (sortBy === 'price-high') {
      list = [...list].sort(
        (a, b) =>
          parseFloat(b.price.replace(/[^\d.]/g, '')) - parseFloat(a.price.replace(/[^\d.]/g, '')),
      );
    }
    return list;
  }, [category, showOutOfStockOnly, sortBy]);

  const activeCategory = category || 'drones';

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-[98px] md:pt-[113px]">
        {/* Category icon strip */}
        <section className="border-b border-gray-100 bg-white">
          <div className="max-w-[1540px] mx-auto px-4 md:px-8 py-6 overflow-x-auto">
            <div className="flex items-start justify-center gap-6 md:gap-10 min-w-max md:min-w-0">
              {CATEGORY_ICONS.map((cat) => {
                const isActive = cat.slug === activeCategory;
                return (
                  <Link
                    key={cat.id}
                    to={`/products/${cat.slug}`}
                    className="flex flex-col items-center gap-2 group w-[72px] md:w-[88px] shrink-0"
                  >
                    <div
                      className={cn(
                        'w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden flex items-center justify-center transition-transform group-hover:scale-105',
                        isActive ? 'bg-black ring-2 ring-black ring-offset-2' : 'bg-gray-50',
                      )}
                    >
                      <img
                        src={cat.image}
                        alt={cat.label}
                        className={cn(
                          'w-full h-full object-cover',
                          isActive && 'brightness-110 contrast-125',
                        )}
                      />
                    </div>
                    <span
                      className={cn(
                        'text-[11px] md:text-xs font-bold text-center leading-tight',
                        isActive ? 'text-black' : 'text-gray-600 group-hover:text-black',
                      )}
                    >
                      {cat.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Toolbar */}
        <section className="border-b border-gray-100">
          <div className="max-w-[1540px] mx-auto px-4 md:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setShowOutOfStockOnly((prev) => !prev)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              FILTER
            </button>

            <div className="hidden md:flex items-center gap-2 text-gray-400">
              {[2, 3, 4, 6].map((cols) => (
                <div
                  key={cols}
                  className={cn(
                    'p-2 rounded cursor-pointer hover:text-black transition-colors',
                    cols === 3 && 'text-black',
                  )}
                >
                  <div
                    className="grid gap-0.5"
                    style={{ gridTemplateColumns: `repeat(${Math.min(cols, 4)}, 1fr)` }}
                  >
                    {Array.from({ length: Math.min(cols, 4) }).map((_, i) => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-current" />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-lg text-sm font-medium bg-white cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <option value="best-selling">Best selling</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-gray-500" />
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="max-w-[1540px] mx-auto px-4 md:px-8 py-8">
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <p className="text-sm font-semibold text-gray-900">
              {products.length} Product{products.length !== 1 ? 's' : ''} Found
            </p>
            {showOutOfStockOnly && (
              <button
                type="button"
                onClick={() => setShowOutOfStockOnly(false)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Out of stock
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ListingProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 text-gray-500">
              <p className="text-lg font-medium">No products found in this category.</p>
              <Link to="/products/drones" className="text-cyan-600 hover:underline mt-2 inline-block">
                Browse all drones
              </Link>
            </div>
          )}
        </section>

        <Footer />
      </div>
    </main>
  );
}
