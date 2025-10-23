import AnalysisCardImage from '../../../../public/movie-analysis.webp';
import { User } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

export default function AnalysesCard() {
  return (
    <section className="relative h-[500px] cursor-pointer">
      <div className="relative h-[500px] rounded-xl overflow-hidden">
        <Image 
          src={AnalysisCardImage.src} 
          alt="Analyses" 
          fill 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="absolute h-[100px] gap-3 w-full bottom-0 left-0 right-0 bg-white/10 rounded-t-2xl backdrop-blur-2xl flex items-center justify-center">
        <User className="w-7 h-7" />
        <span>-</span>
        <h1 className="text-xl font-semibold">
          “Tinchlik Izlab: Insoniyat va Umid Chegarasida”
        </h1>
      </div>
    </section>
  );
}
