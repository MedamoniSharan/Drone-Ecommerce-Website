import React from 'react';
import { motion } from 'framer-motion';

const ANNOUNCEMENTS = [
  'Easy UPI EMI Available',
  'Get 5% extra on all prepaid orders',
  '1L+ Happy Customers',
];

const AnnouncementItem: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex items-center shrink-0 select-none">
    <span className="mx-6 text-[11px] font-semibold uppercase tracking-[0.15em] text-white whitespace-nowrap">
      {text}
    </span>
    <span className="text-white/40 text-[8px]">●</span>
  </div>
);

/**
 * AnnouncementMarquee renders a thin, dark, infinitely scrolling promotional bar
 * pinned above the navbar.
 */
const AnnouncementMarquee: React.FC = () => {
  const items = Array(8).fill(ANNOUNCEMENTS).flat();
  return (
    <div className="w-full bg-black py-2 overflow-hidden">
      <div className="relative flex">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: [0, -1000] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        >
          {items.map((text, index) => (
            <AnnouncementItem key={`ann-1-${index}`} text={text} />
          ))}
        </motion.div>
        <motion.div
          className="flex whitespace-nowrap absolute top-0 left-full"
          animate={{ x: [0, -1000] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        >
          {items.map((text, index) => (
            <AnnouncementItem key={`ann-2-${index}`} text={text} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AnnouncementMarquee;
