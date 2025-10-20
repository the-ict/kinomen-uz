"use client"

import { useEffect, useState } from 'react';
import { sections } from '../lib/data';
import { InstagramIcon, YoutubeIcon, SendIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const [isHide, setIsHide] = useState<boolean>(false);

  const pathname = usePathname();

  useEffect(() => {
    if(pathname.includes('register') || pathname.includes("login")) {
      setIsHide(true)
    }
  }, [pathname])

  if(isHide) return;

  return (
    <footer className="bg-[#0d0d0d] text-white py-16 border-t border-[#1f1f1f]">
      <div className="custom-container">
        <div className="flex flex-col lg:flex-row justify-between gap-10">
          <div className="flex flex-col gap-6 max-w-sm">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-semibold tracking-wide">
                Kinomen<span className="text-[#e50914]">.uz</span>
              </h2>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Kinomen — bu joy, bu yerda siz sevimli filmlaringiz haqida fikr
              almashasiz, baho berasiz va yangi kinolarni kashf etasiz. 🎬
            </p>

            <ul className="flex items-center gap-6 text-gray-400">
              <li className="hover:text-[#e50914] transition">
                <a href="#">
                  <InstagramIcon className="size-5" />
                </a>
              </li>
              <li className="hover:text-[#e50914] transition">
                <a href="#">
                  <YoutubeIcon className="size-5" />
                </a>
              </li>
              <li className="hover:text-[#e50914] transition">
                <a href="#">
                  <SendIcon className="size-5" />
                </a>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-semibold text-white text-lg">
                  {section.title}
                </h3>
                <ul className="space-y-3 text-gray-400">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="hover:text-[#e50914] transition-colors"
                    >
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Pastki qism */}
        <div className="mt-12 border-t border-[#1f1f1f] pt-6 flex flex-col lg:flex-row justify-between items-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Kinomen.uz — Barcha huquqlar
            himoyalangan.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#e50914]">
              Maxfiylik siyosati
            </a>
            <a href="#" className="hover:text-[#e50914]">
              Foydalanish shartlari
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
