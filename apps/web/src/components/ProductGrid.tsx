import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const products = [
  {
    id: 1,
    name: 'DJI Mini 4 Pro (DJI RC 2)',
    price: '₹94,900',
    originalPrice: '₹1,09,900',
    image:
      'https://images.unsplash.com/photo-1506947411487-a56738267384?auto=format&fit=crop&q=80&w=600',
    tag: 'Bestseller',
  },
  {
    id: 2,
    name: 'DJI Air 3 (DJI RC-N2)',
    price: '₹1,19,900',
    originalPrice: '₹1,35,000',
    image:
      'https://images.unsplash.com/photo-1473968512647-3e44a224fe8f?auto=format&fit=crop&q=80&w=600',
    tag: 'Hot',
  },
  {
    id: 3,
    name: 'Osmo Pocket 3',
    price: '₹52,990',
    originalPrice: '₹59,990',
    image:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600',
    tag: 'New',
  },
  {
    id: 4,
    name: 'Osmo Action 4 Standard Combo',
    price: '₹29,990',
    originalPrice: '₹34,990',
    image:
      'https://images.unsplash.com/photo-1526170315873-3a92bafc8a14?auto=format&fit=crop&q=80&w=600',
    tag: 'Limited',
  },
];

const ProductGrid = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tighter">Bestsellers</h2>
          <div className="w-20 h-1 bg-cyan-500 mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden bg-white aspect-square mb-6 border border-gray-200 rounded-2xl shadow-sm group-hover:border-cyan-500/40 group-hover:shadow-md transition-all">
                {product.tag && (
                  <Badge className="absolute top-4 left-4 z-20 bg-cyan-500 text-white border-none rounded-sm px-2 py-0.5 text-[10px] uppercase tracking-widest font-bold">
                    {product.tag}
                  </Badge>
                )}

                <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 transform translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="bg-white text-gray-700 shadow-md hover:bg-cyan-500 hover:text-white rounded-full w-10 h-10"
                  >
                    <Heart size={18} />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="bg-white text-gray-700 shadow-md hover:bg-cyan-500 hover:text-white rounded-full w-10 h-10"
                  >
                    <Eye size={18} />
                  </Button>
                </div>

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                  <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-xl py-6">
                    <ShoppingCart size={18} className="mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-gray-800 font-semibold group-hover:text-cyan-600 transition-colors line-clamp-1">
                  {product.name}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold text-gray-900">{product.price}</span>
                  <span className="text-sm text-gray-400 line-through">
                    {product.originalPrice}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
