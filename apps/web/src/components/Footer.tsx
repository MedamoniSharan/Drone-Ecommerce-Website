import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const linkColumns = [
  ['About', 'Features', 'Gallery', 'Pricing', 'Contact'],
  ['Drones', 'Gimbals', 'Action Cameras', 'Accessories', 'Support'],
];

const socials = [
  {
    label: 'Instagram',
    color: 'bg-[#E1306C]',
    path: 'M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.31-1.46.72-2.13 1.38C1.35 2.68.94 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13.67.66 1.34 1.07 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.31 1.46-.72 2.13-1.38.66-.67 1.07-1.34 1.38-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.31-.79-.72-1.46-1.38-2.13C21.32 1.35 20.65.94 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 01-1.38-.9 3.72 3.72 0 01-.9-1.38c-.16-.43-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07zm0 3.68a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zm0 10.16a4 4 0 110-8 4 4 0 010 8zm7.85-10.41a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z',
  },
  {
    label: 'LinkedIn',
    color: 'bg-[#0A66C2]',
    path: 'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 110-4.14 2.07 2.07 0 010 4.14zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z',
  },
  {
    label: 'YouTube',
    color: 'bg-[#FF0000]',
    path: 'M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 00.5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 002.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 002.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z',
  },
  {
    label: 'Facebook',
    color: 'bg-[#1877F2]',
    path: 'M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z',
  },
];

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] text-white pt-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-12">
          {/* Link columns */}
          {linkColumns.map((column, i) => (
            <nav key={i} className="flex flex-col gap-3 text-[15px] font-medium text-gray-300">
              {column.map((label) => (
                <Link key={label} to="#" className="hover:text-cyan-400 transition-colors w-fit">
                  {label}
                </Link>
              ))}
            </nav>
          ))}

          {/* Brand + newsletter */}
          <div className="col-span-2 md:col-span-1 flex flex-col items-center text-center gap-4">
            <Link to="/" className="text-2xl font-extrabold tracking-tight">
              DJI <span className="text-cyan-400">INDIA</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-[260px]">
              Empowering creators to capture the world with clarity, control, and confidence.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center w-full max-w-[300px] rounded-full bg-white/10 pl-5 pr-1.5 py-1.5"
            >
              <input
                type="email"
                placeholder="Enter Your Email"
                className="flex-1 bg-transparent text-sm text-white placeholder:text-gray-400 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center hover:bg-cyan-400 transition-colors shrink-0"
              >
                <ArrowRight size={16} />
              </button>
            </form>
          </div>

          {/* Socials + contact */}
          <div className="col-span-2 md:col-span-1 flex flex-col md:items-end gap-4">
            <div className="flex gap-3">
              {socials.map(({ label, color, path }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className={`w-10 h-10 rounded-full ${color} text-white flex items-center justify-center hover:opacity-90 hover:scale-105 transition-all`}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
            <div className="md:text-right">
              <p className="text-base font-bold text-white">(+91) 99999 99999</p>
              <p className="text-sm text-gray-400 mt-1">New Delhi, India - 110001</p>
            </div>
          </div>
        </div>
      </div>

      {/* Oversized faded brand text */}
      <div className="relative select-none pointer-events-none">
        <h2 className="text-center font-extrabold tracking-tighter leading-none text-[18vw] text-white">
          DJI INDIA
        </h2>
      </div>
    </footer>
  );
};

export default Footer;
