import { LucideIcon } from 'lucide-react';
import React from 'react';

export default function FeaturesCard({
  Icon,
  title,
  description,
  index,
}: {
  Icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}) {
  return (
    <div
      key={index}
      className="bg-[#161616] cursor-pointer border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300"
    >
      <div className="bg-red-600/10 text-red-500 p-4 rounded-full mb-4">
        <Icon size={32} />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
