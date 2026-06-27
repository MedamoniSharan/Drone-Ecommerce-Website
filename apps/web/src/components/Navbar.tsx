import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnnouncementMarquee from '@/components/AnnouncementMarquee';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      {/* Announcement Marquee */}
      <AnnouncementMarquee />

      {/* Top Bar */}
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-bold text-gray-900 tracking-tighter">
            DJI <span className="font-light text-gray-500 text-sm align-top ml-1">INDIA</span>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            <Link
              to="/drones"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              DJI Drones
            </Link>
            <Link
              to="/gimbals"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Gimbals
            </Link>
            <Link
              to="/action"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Action Cameras
            </Link>
            <Link
              to="/accessories"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Accessories
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center bg-gray-100 border border-gray-200 rounded-full px-4 py-1.5 gap-2">
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="bg-transparent border-none focus:outline-none text-sm text-gray-900 placeholder:text-gray-400 w-40 lg:w-64"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-gray-700 hover:bg-gray-100">
              <User size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-700 hover:bg-gray-100 relative"
            >
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-cyan-500 text-white text-[10px] font-bold px-1.5 rounded-full">
                0
              </span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-gray-700 hover:bg-gray-100"
            >
              <Menu size={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* Sub Navbar (Categories) */}
      <div className="hidden lg:block border-t border-gray-100 bg-gray-50">
        <div className="container mx-auto px-4 h-10 flex items-center justify-center gap-8">
          {['Consumer', 'Professional', 'Enterprise', 'Agriculture', 'Components'].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="text-[11px] uppercase tracking-widest font-semibold text-gray-500 hover:text-cyan-600 transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
