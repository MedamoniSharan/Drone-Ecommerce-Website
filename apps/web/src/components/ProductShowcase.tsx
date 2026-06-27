import * as React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ArrowRight, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getProductsByCategory, getProductPath, type CatalogProduct } from '@/data/products';

const DRONE_PRODUCTS = getProductsByCategory('drones');

const StatusBadge = ({ label, className }: { label: string; className?: string }) => {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center px-4 py-1.5 rounded-full text-sm font-medium bg-white/90 backdrop-blur-sm text-black shadow-sm',
        className,
      )}
    >
      <span>{label}</span>
    </div>
  );
};

const EmiWidget = ({ price }: { price: string }) => {
  return (
    <div className="flex items-center gap-1 mt-1 text-[11px] sm:text-xs">
      <div className="flex items-center px-2 py-1 bg-white border border-gray-100 rounded-md shadow-sm">
        <span className="text-gray-500 mr-1">or</span>
        <span className="font-bold text-black flex items-center">
          ₹<span className="mx-0.5">{price}</span>/Month
        </span>
      </div>
      <button
        type="button"
        className="bg-[#2DA257] hover:bg-[#258a49] text-white px-2 py-1 rounded-md font-semibold flex items-center gap-1 transition-colors group"
      >
        <span className="hidden sm:inline">Buy on EMI</span>
        <span className="sm:hidden">EMI</span>
        <motion.div
          animate={{ x: [0, 2, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowRight className="w-2.5 h-2.5" />
        </motion.div>
      </button>
    </div>
  );
};

const ProductCard = ({ product }: { product: CatalogProduct }) => {
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
              <StatusBadge label="Sold out" />
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

export const ProductShowcase = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-12 bg-white">
      <header className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-3">
          Featured Collections
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Explore our latest collection of high-performance drones, from 4K aerial photography to
          agile racing machines.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {DRONE_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductShowcase;
