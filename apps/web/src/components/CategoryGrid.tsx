import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const categories = [
  {
    title: 'DJI Drones',
    description: 'Capture your moments from above.',
    image:
      'https://zonealpha.in/cdn/shop/files/E88-PRO-Drone-4K-with-Wide-Angle-HD-4K-Dual-Camera-Height-Hold-WiFi-RC-Foldable-Quadcopter-E88-Drone_result.webp?v=1763735715&width=800',
    link: '/drones',
    span: 'col-span-2 row-span-2',
  },
  {
    title: 'Handheld Gimbals',
    description: 'Stable footage, anywhere.',
    image:
      'https://djiindiashop.com/cdn/shop/files/ChatGPT_Image_May_8_2026_02_10_50_PM.png?v=1778229674&width=1092',
    link: '/gimbals',
    span: 'col-span-1 row-span-1',
  },
  {
    title: 'Action Cameras',
    description: 'Built for adventure.',
    image:
      'https://djiindiashop.com/cdn/shop/files/imgi_86_07a460c41963750113b6f2d649e5873c_ultra_1068aeaa-cd51-43cb-8016-6ebd47fd8228.webp?v=1769678486&width=1280',
    link: '/action',
    span: 'col-span-1 row-span-1',
  },
  {
    title: 'Accessories',
    description: 'Enhance your experience.',
    image:
      'https://images.unsplash.com/photo-1473968512647-3e44a224fe8f?auto=format&fit=crop&q=80&w=800',
    link: '/accessories',
    span: 'col-span-1 row-span-1',
  },
  {
    title: 'New Arrivals',
    description: 'Explore the latest tech.',
    image:
      'https://djiindiashop.com/cdn/shop/files/65c07cfe987bdaa28a3da5ec65f50e84_ultra_11fbd1a3-ead9-45e2-8b5b-c3af2d8df677.webp?v=1781515087&width=1280',
    link: '/new-arrivals',
    span: 'col-span-1 row-span-1',
  },
];

const CategoryGrid = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tighter">
              Explore Categories
            </h2>
            <p className="text-gray-500 max-w-md">
              Find the perfect gear for your next creative project.
            </p>
          </div>
          <Link
            to="/all"
            className="text-sm font-bold text-cyan-600 hover:text-cyan-500 transition-colors uppercase tracking-widest pb-1 border-b border-cyan-500/30"
          >
            View All Store
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[250px]">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-2xl bg-gray-100 shadow-sm ${cat.span}`}
            >
              <Link to={cat.link} className="block w-full h-full">
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                  <h3 className="text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-cyan-400 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-gray-400 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    {cat.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
