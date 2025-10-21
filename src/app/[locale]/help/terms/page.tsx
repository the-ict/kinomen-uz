import React from 'react';

export default function TermsPage() {
  return (
    <div className="dark:from-slate-900 dark:to-slate-800 py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-12 text-slate-900 dark:text-slate-100 tracking-tight">
          Foydalanish shartlari
        </h1>
        <div className="bg-white/70 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl shadow-2xl p-10 border border-slate-200 dark:border-slate-700 space-y-6 transition-all duration-300">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
              1. Shartlarni qabul qilish
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Kinomen xizmatidan foydalanish orqali siz ushbu kelishuvda
              ko‘rsatilgan barcha shartlarni qabul qilasiz va ularga rioya
              qilishga rozilik bildirasiz. Agar siz bu shartlarga rozi
              bo‘lmasangiz, iltimos, xizmatdan foydalanmang.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">
              2. Foydalanish litsenziyasi
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Sizga Kinomen materiallaridan shaxsiy, notijorat maqsadlarda
              vaqtinchalik foydalanish uchun ruxsat beriladi. Bu — mulk huquqini
              emas, balki cheklangan foydalanish huquqini bildiradi. Quyidagi
              harakatlar taqiqlanadi:
            </p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 mt-2 space-y-1">
              <li>materiallarni o‘zgartirish yoki ko‘paytirish;</li>
              <li>ularni tijorat yoki jamoat maqsadlarida ishlatish;</li>
              <li>
                har qanday dasturiy kodni teskari tahlil qilish yoki
                dekompilyatsiya qilish;
              </li>
              <li>
                mualliflik huquqlari yoki mulkiy belgilarning olib tashlanishi.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">
              3. Foydalanuvchi mas’uliyati
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Siz o‘z akkauntingiz va parolingiz maxfiyligini saqlash uchun
              javobgarsiz. Akkauntingiz ostida amalga oshiriladigan barcha
              harakatlar uchun siz javobgar bo‘lasiz. Har qanday xavfsizlik
              buzilishi yoki ruxsatsiz foydalanish holatida darhol bizni
              xabardor qilishingiz kerak.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">
              4. Kontent
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Bizning xizmatimiz sizga matn, rasm, havola yoki boshqa
              ma’lumotlarni joylashtirish imkonini beradi. Siz joylashtirgan
              barcha kontent uchun, shu jumladan uning qonuniyligi,
              ishonchliligi va mosligi uchun shaxsan javobgarsiz.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">
              5. Akkauntni bekor qilish
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Biz har qanday sababga ko‘ra, shu jumladan shartlarni buzgan
              taqdirda, oldindan ogohlantirmasdan akkauntingizni bekor qilish
              yoki xizmatga kirishni cheklash huquqiga egamiz.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">
              6. Qonuniy asos
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Ushbu shartlar O‘zbekiston Respublikasi qonunlariga muvofiq
              tartibga solinadi va talqin etiladi. Siz ushbu yurisdiksiya
              sudlarining vakolatini tan olasiz.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
