import * as React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { getProductPath } from '@/data/products';

interface Product {
  id: string;
  title?: string;
  imageUrl: string;
  buttonText: string;
  link: string;
  buttonColor: string;
}

const PRODUCTS: Product[] = [
  {
    id: 'osmo-pocket-4-creator',
    title: '',
    imageUrl:
      'https://djiindiashop.com/cdn/shop/files/8bcf212a94cd1f7c089e7abaa5f11d0b_ultra.webp?v=1776849277&width=1280',
    buttonText: 'Buy Now',
    link: '#',
    buttonColor: 'bg-[#8533D7]',
  },
  {
    id: 'osmo-pocket-4-standard',
    title: '',
    imageUrl:
      'https://djiindiashop.com/cdn/shop/files/65c07cfe987bdaa28a3da5ec65f50e84_ultra_11fbd1a3-ead9-45e2-8b5b-c3af2d8df677.webp?v=1781515087&width=1280',
    buttonText: 'Buy Now',
    link: '#',
    buttonColor: 'bg-[#8533D7]',
  },
  {
    id: 'osmo-action-6',
    title: 'Osmo Action 6',
    imageUrl:
      'https://djiindiashop.com/cdn/shop/files/imgi_86_07a460c41963750113b6f2d649e5873c_ultra_1068aeaa-cd51-43cb-8016-6ebd47fd8228.webp?v=1769678486&width=1280',
    buttonText: 'Buy Now',
    link: '#',
    buttonColor: 'bg-[#803CEE]',
  },
  {
    id: 'osmo-mobile-8p',
    title: 'Osmo mobile 8P',
    imageUrl:
      'https://djiindiashop.com/cdn/shop/files/ChatGPT_Image_May_8_2026_02_10_50_PM.png?v=1778229674&width=1092',
    buttonText: 'Buy Now',
    link: '#',
    buttonColor: 'bg-[#803CEE]',
  },
];

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative group w-full h-[300px] md:h-[604px] overflow-hidden rounded-[10px] bg-black cursor-pointer shadow-lg transition-shadow duration-300 hover:shadow-2xl"
    >
      <Link to={getProductPath(product.id)} className="block w-full h-full">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <motion.img
            src={product.imageUrl}
            alt={product.title || 'Product Image'}
            className="w-full h-full object-cover object-center"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          />
          <span className="absolute inset-0 z-10 bg-transparent transition-colors duration-200 group-hover:bg-black/5" />
        </div>

        <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-12 px-6 text-center">
          {product.title && (
            <h3 className="font-heading text-white text-2xl md:text-[32px] font-semibold leading-tight tracking-[-0.6px] mb-8">
              {product.title}
            </h3>
          )}

          <button
            type="button"
            className={cn(
              'relative px-8 py-3.5 rounded-[60px] text-white font-bold text-base transition-all duration-150 active:scale-95',
              product.buttonColor,
              'hover:brightness-110 shadow-[0_5px_15px_rgba(16,16,16,0.1)]',
            )}
          >
            <span>{product.buttonText}</span>
            <span className="absolute inset-0 opacity-0 pointer-events-none flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.4s]" />
            </span>
          </button>
        </div>
      </Link>
    </motion.div>
  );
};

export const ProductShowcaseGrid = () => {
  return (
    <section className="w-full bg-white py-12 md:py-24 px-4 md:px-8 lg:px-12">
      <div className="max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 items-start">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcaseGrid;
