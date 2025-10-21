import Image from 'next/image';
import React from 'react';
import AnalysisCardImage from '../../../../public/movie-analysis.webp';
import { HeartHandshake, User, MessageCircle, Eye } from 'lucide-react';

export default function AnalysesListCard() {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-[#161616] border border-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.08)] transition-all duration-300 cursor-pointer">
      <div className="relative w-full h-[250px]">
        <Image
          src={AnalysisCardImage.src}
          alt="Analysis"
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-black/40 to-transparent" />
      </div>

      <div className="p-5 flex flex-col gap-3">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <User className="w-5 h-5 text-gray-400" />
          <span>@the_ict</span>
        </div>

        <h1 className="text-lg font-semibold text-white group-hover:text-primary transition-colors">
          “Tinchlik Izlab: Insoniyat va Umid Chegarasida”
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-4">
          "Tinchlik Izlab" — bu oddiy jangovar film emas. Bu insoniyatning ichki
          kurashi, umid va qo‘rquv o‘rtasidagi nozik chiziq haqida hikoya
          qiladi. Filmda asosiy qahramon — urushdan charchagan askar, o‘zining
          ma’nosiz hayotini tushunishga harakat qiladi. U har bir portlash, har
          bir yo‘qotish ortida faqat yov emas, balki o‘zi bilan ham
          kurashayotganini anglaydi.
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-white/10 text-gray-400 text-sm">
          <div className="flex items-center gap-1">
            <HeartHandshake className="w-5 h-5 text-pink-500" />
            <span>12.0k</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="w-5 h-5 text-blue-400" />
            <span>3.4k</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-5 h-5 text-green-400" />
            <span>48.2k</span>
          </div>
        </div>
      </div>
    </div>
  );
}
