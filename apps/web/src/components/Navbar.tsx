import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import AnnouncementMarquee from '@/components/AnnouncementMarquee';
import { useCart } from '@/context/CartContext';

interface NavItem {
  label: string;
  to: string;
  hasMegaMenu?: boolean;
}

interface Category {
  label: string;
  image: string;
  to: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Drones', to: '/drones', hasMegaMenu: true },
  { label: 'Gimbals', to: '/gimbals' },
  { label: 'Action Cameras', to: '/action' },
  { label: 'Accessories', to: '/accessories' },
];

const CATEGORIES: Category[] = [
  {
    label: 'DJI Drones',
    image:
      'https://zonealpha.in/cdn/shop/files/E88-PRO-Drone-4K-with-Wide-Angle-HD-4K-Dual-Camera-Height-Hold-WiFi-RC-Foldable-Quadcopter-E88-Drone_result.webp?v=1763735715&width=800',
    to: '/drones',
  },
  {
    label: 'Gimbals',
    image:
      'https://djiindiashop.com/cdn/shop/files/ChatGPT_Image_May_8_2026_02_10_50_PM.png?v=1778229674&width=1092',
    to: '/gimbals',
  },
  {
    label: 'Action Cameras',
    image:
      'https://djiindiashop.com/cdn/shop/files/imgi_86_07a460c41963750113b6f2d649e5873c_ultra_1068aeaa-cd51-43cb-8016-6ebd47fd8228.webp?v=1769678486&width=1280',
    to: '/action',
  },
  {
    label: 'Accessories',
    image:
      'https://images.unsplash.com/photo-1473968512647-3e44a224fe8f?auto=format&fit=crop&q=80&w=400',
    to: '/accessories',
  },
  {
    label: 'FPV & Goggles',
    image:
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=400',
    to: '/fpv',
  },
  {
    label: 'Enterprise',
    image:
      'https://images.unsplash.com/photo-1482050340791-4d261c24ff5d?auto=format&fit=crop&q=80&w=400',
    to: '/enterprise',
  },
  {
    label: 'New Arrivals',
    image:
      'https://djiindiashop.com/cdn/shop/files/65c07cfe987bdaa28a3da5ec65f50e84_ultra_11fbd1a3-ead9-45e2-8b5b-c3af2d8df677.webp?v=1781515087&width=1280',
    to: '/new-arrivals',
  },
  {
    label: 'Combos',
    image:
      'https://zonealpha.in/cdn/shop/files/IMG-20260327-WA0001.jpg?v=1776777198&width=1080',
    to: '/combos',
  },
];

const Logo = ({ className }: { className?: string }) => (
  <span className={cn('text-2xl font-bold tracking-tighter', className)}>
    DJI <span className="font-light text-cyan-400 text-sm align-top ml-0.5">INDIA</span>
  </span>
);

const MegaMenu = ({ isVisible }: { isVisible: boolean }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
        className="absolute top-full left-0 w-full bg-white text-black shadow-xl z-50 border-t border-neutral-100"
      >
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
            {CATEGORIES.map((category) => (
              <Link
                key={category.label}
                to={category.to}
                className="flex flex-col items-center group transition-transform duration-300"
              >
                <div className="w-24 h-24 mb-4 overflow-hidden rounded-lg flex items-center justify-center bg-neutral-50 group-hover:scale-105 transition-transform">
                  <img
                    src={category.image}
                    alt={category.label}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-bold text-center group-hover:text-neutral-600 transition-colors">
                  {category.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const MobileNav = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black z-[60]"
          onClick={onClose}
        />
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed top-0 left-0 bottom-0 w-[300px] bg-white z-[70] p-6 text-black flex flex-col"
        >
          <div className="flex justify-between items-center mb-8">
            <Logo className="text-black" />
            <button onClick={onClose} className="p-2" aria-label="Close menu">
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col gap-6">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="text-lg font-medium border-b border-neutral-100 pb-2 flex justify-between items-center"
                onClick={onClose}
              >
                {item.label}
                {item.hasMegaMenu && <ChevronDown className="w-4 h-4" />}
              </Link>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-3 pt-6">
            <Link
              to="/account/signin"
              onClick={onClose}
              className="flex items-center justify-center gap-2 rounded-full bg-black text-white py-3 text-sm font-bold"
            >
              <User className="w-4 h-4" />
              Sign In
            </Link>
            <Link
              to="/account/signup"
              onClick={onClose}
              className="text-center text-sm font-medium text-neutral-600"
            >
              Create an account
            </Link>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const Navbar = () => {
  const [isMegaMenuVisible, setIsMegaMenuVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { itemCount, openCart } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-[#0a0a0a] text-white">
      {/* Announcement Marquee */}
      <AnnouncementMarquee />

      {/* Top Header Row */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-[65px] md:h-[80px]">
          {/* Mobile Menu Toggle (Left on Mobile) */}
          <div className="flex lg:hidden flex-1">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Toggle Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Desktop Navigation (Left on Desktop) */}
          <nav className="hidden lg:flex items-center gap-8 flex-1">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="relative h-full flex items-center"
                onMouseEnter={() => item.hasMegaMenu && setIsMegaMenuVisible(true)}
                onMouseLeave={() => item.hasMegaMenu && setIsMegaMenuVisible(false)}
              >
                <Link
                  to={item.to}
                  className="group flex items-center gap-1.5 text-[15px] font-medium hover:text-white/80 transition-colors py-8"
                >
                  {item.label}
                  {item.hasMegaMenu && (
                    <ChevronDown
                      className={cn(
                        'w-3.5 h-3.5 transition-transform duration-300',
                        isMegaMenuVisible ? 'rotate-180' : 'rotate-0',
                      )}
                    />
                  )}
                  <span className="absolute bottom-6 left-0 w-0 h-[1.5px] bg-white transition-all group-hover:w-full" />
                </Link>
              </div>
            ))}
          </nav>

          {/* Logo (Center) */}
          <div className="flex-none flex justify-center">
            <Link to="/" className="flex items-center">
              <Logo className="text-white" />
            </Link>
          </div>

          {/* Icons (Right) */}
          <div className="flex items-center justify-end gap-3 md:gap-5 flex-1">
            <button
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Search"
            >
              <Search className="w-[18px] h-[18px]" />
            </button>
            <Link
              to="/account/signin"
              className="hidden sm:flex p-2 hover:bg-white/10 rounded-full transition-colors relative"
              aria-label="Account"
            >
              <div className="relative">
                <User className="w-[20px] h-[20px]" />
                <div className="absolute -top-1 -right-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="#06b6d4" />
                  </svg>
                </div>
              </div>
            </Link>
            <button
              type="button"
              onClick={openCart}
              className="p-2 hover:bg-white/10 rounded-full transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingCart className="w-[20px] h-[20px]" />
              {itemCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-cyan-500 px-1 text-[10px] font-bold text-black ring-2 ring-[#0a0a0a]">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mega Menu Overlay */}
      <div
        onMouseEnter={() => setIsMegaMenuVisible(true)}
        onMouseLeave={() => setIsMegaMenuVisible(false)}
      >
        <MegaMenu isVisible={isMegaMenuVisible} />
      </div>

      {/* Mobile Sidebar */}
      <MobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
};

export default Navbar;
