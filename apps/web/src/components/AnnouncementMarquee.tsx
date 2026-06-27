import React from 'react';
import { motion } from 'framer-motion';

const ANNOUNCEMENTS = [
  'Easy UPI EMI Available',
  'Get 5% extra on all prepaid orders',
  '1L+ Happy Customers',
];

const AnnouncementItem: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex w-[300px] shrink-0 select-none items-center justify-center gap-8">
    <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-black whitespace-nowrap">
      {text}
    </span>
    <span className="text-black/40 text-[8px]">●</span>
  </div>
);

const AnnouncementGroup = ({ items }: { items: string[] }) => (
  <div className="flex shrink-0 whitespace-nowrap">
    {items.map((text, index) => (
      <AnnouncementItem key={`${text}-${index}`} text={text} />
    ))}
  </div>
);

/**
 * AnnouncementMarquee renders a thin, dark, infinitely scrolling promotional bar
 * pinned above the navbar.
 */
const AnnouncementMarquee: React.FC = () => {
  const items = Array(8).fill(ANNOUNCEMENTS).flat();
  return (
    <div className="w-full bg-white py-2 overflow-hidden border-b border-black/10">
      <motion.div
        className="flex w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
      >
        <AnnouncementGroup items={items} />
        <AnnouncementGroup items={items} />
      </motion.div>
    </div>
  );
};

export default AnnouncementMarquee;
