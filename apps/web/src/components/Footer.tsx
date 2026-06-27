import React from 'react';
import { Link } from 'react-router-dom';
import { Share2, Globe, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-20 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="text-3xl font-bold text-white tracking-tighter">
              DJI <span className="font-light text-gray-500 text-sm align-top ml-1">INDIA</span>
            </Link>
            <p className="text-sm leading-relaxed">
              DJI India Shop is the authorized dealer of DJI products in India. We provide the
              latest drones, gimbals, and action cameras with official warranty and support.
            </p>
            <div className="flex gap-4">
              {[Share2, Globe, Mail, Share2].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-cyan-500 hover:text-white hover:border-cyan-500 transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">
              Products
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link to="/drones" className="hover:text-cyan-600 transition-colors">
                  Consumer Drones
                </Link>
              </li>
              <li>
                <Link to="/gimbals" className="hover:text-cyan-600 transition-colors">
                  Handheld Gimbals
                </Link>
              </li>
              <li>
                <Link to="/action" className="hover:text-cyan-600 transition-colors">
                  Action Cameras
                </Link>
              </li>
              <li>
                <Link to="/enterprise" className="hover:text-cyan-600 transition-colors">
                  Enterprise Solutions
                </Link>
              </li>
              <li>
                <Link to="/accessories" className="hover:text-cyan-600 transition-colors">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">
              Support
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link to="/service" className="hover:text-cyan-600 transition-colors">
                  Service & Support
                </Link>
              </li>
              <li>
                <Link to="/warranty" className="hover:text-cyan-600 transition-colors">
                  Warranty Policy
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-cyan-600 transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-cyan-600 transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cyan-600 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">
              Get In Touch
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-cyan-500 shrink-0 mt-1" />
                <span>New Delhi, India - 110001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-cyan-500 shrink-0" />
                <span>+91 99999 99999</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-cyan-500 shrink-0" />
                <span>support@djiindiashop.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-medium uppercase tracking-widest">
          <p>© 2026 DJI INDIA SHOP. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
