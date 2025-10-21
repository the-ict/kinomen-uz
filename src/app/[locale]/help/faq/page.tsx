import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/ui/accordion';

export default function FAQPage() {
  return (
    <div className="dark:from-slate-900 dark:to-slate-800 py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-12 text-slate-900 dark:text-slate-100 tracking-tight">
          Tez-tez so‘raladigan savollar
        </h1>
        <div className="bg-white/70 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl shadow-2xl p-10 border border-slate-200 dark:border-slate-700 space-y-6 transition-all duration-300">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left cursor-pointer text-lg font-semibold text-slate-800 dark:text-slate-100 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-200">
                Kinomen nima?
              </AccordionTrigger>
              <AccordionContent className="text-slate-700 dark:text-slate-300 leading-relaxed">
                <span className="font-medium text-orange-600">Kinomen</span> —
                bu kino ixlosmandlari uchun mo‘ljallangan platforma. Unda siz
                filmlar haqida tahlillar, fikrlar va muhokamalarni o‘qishingiz,
                hamda o‘zingizning fikrlaringizni ham bo‘lishishingiz mumkin.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left cursor-pointer text-lg font-semibold text-slate-800 dark:text-slate-100 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-200">
                Qanday qilib akkaunt ochsam bo‘ladi?
              </AccordionTrigger>
              <AccordionContent className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Saytning yuqori qismidagi{' '}
                <span className="font-medium">“Ro‘yxatdan o‘tish”</span>{' '}
                tugmasini bosing. Foydalanuvchi nomi, elektron pochta va parolni
                kiriting. So‘ngra elektron pochtangizga yuborilgan tasdiqlash
                havolasini bosib, akkauntingizni faollashtiring.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left cursor-pointer text-lg font-semibold text-slate-800 dark:text-slate-100 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-200">
                O‘zimning kino tahlilimni joylashtirsam bo‘ladimi?
              </AccordionTrigger>
              <AccordionContent className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Albatta! Ro‘yxatdan o‘tgan foydalanuvchilar{' '}
                <span className="font-medium">“Tahlillar”</span> bo‘limida
                o‘zlarining kino tahlillarini yozib, jamoa bilan bo‘lishishlari
                mumkin. Faqat{' '}
                <span className="italic">jamoa qoidalariga rioya qilish</span>ni
                unutmang.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left cursor-pointer text-lg font-semibold text-slate-800 dark:text-slate-100 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-200">
                Saytdan foydalanish bepulmi?
              </AccordionTrigger>
              <AccordionContent className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Ha, <span className="font-medium text-orange-600">Kinomen</span>{' '}
                butunlay bepul. Siz filmlarni ko‘rishingiz, tahlillarni
                o‘qishingiz va fikr bildirish orqali ishtirok etishingiz mumkin.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left cursor-pointer text-lg font-semibold text-slate-800 dark:text-slate-100 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-200">
                Qo‘llab-quvvatlash xizmati bilan qanday bog‘lanaman?
              </AccordionTrigger>
              <AccordionContent className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Agar biror muammo yoki savolingiz bo‘lsa, saytning{' '}
                <span className="font-medium">“Aloqa”</span> sahifasi orqali
                murojaat qilishingiz yoki
                <span className="text-orange-600 dark:text-orange-400 font-medium">
                  {' '}
                  support@kinomen.com{' '}
                </span>{' '}
                manziliga yozishingiz mumkin.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
