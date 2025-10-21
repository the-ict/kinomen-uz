import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="dark:from-slate-900 dark:to-slate-800 py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-12 text-slate-900 dark:text-slate-100 tracking-tight">
          Maxfiylik Siyosati
        </h1>
        <div className="bg-white/70 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl shadow-2xl p-10 border border-slate-200 dark:border-slate-700 space-y-10 transition-all duration-300">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
              1. Biz yig‘adigan ma’lumotlar
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Biz siz to‘g‘ridan-to‘g‘ri taqdim etgan ma’lumotlarni yig‘amiz —
              masalan, akkaunt yaratganingizda, fikr qoldirganingizda yoki bizga
              murojaat qilganingizda. Bu sizning ismingiz, elektron pochtangiz,
              foydalanuvchi nomingiz va platformada joylashtirgan kontentingizni
              o‘z ichiga olishi mumkin.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
              2. Ma’lumotlardan qanday foydalanamiz
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Biz yig‘ilgan ma’lumotlardan xizmatlarimizni taqdim etish,
              yaxshilash, texnik qo‘llab-quvvatlash, siz bilan aloqada bo‘lish,
              yangi takliflar, yangiliklar va reklama xabarlari yuborish uchun
              foydalanamiz. Shuningdek, foydalanuvchi tajribasini yaxshilash va
              xavfsizlikni ta’minlash maqsadida ham foydalanamiz.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
              3. Ma’lumotlarni ulashish
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Biz sizning shaxsiy ma’lumotlaringizni uchinchi tomonlarga sizning
              roziligingizsiz bermaymiz. Faqat qonuniy talablar yoki
              platformamiz xavfsizligini ta’minlash uchun zarur hollarda
              ma’lumot ulashishimiz mumkin.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
              4. Ma’lumot xavfsizligi
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Biz foydalanuvchilar ma’lumotlarini ruxsatsiz kirish, o‘zgartirish
              yoki oshkor etilishdan himoya qilish uchun zamonaviy xavfsizlik
              choralari qo‘llaymiz. Ammo internet orqali uzatiladigan
              ma’lumotlar to‘liq xavfsizligini kafolatlab bo‘lmaydi.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
              5. Cookie va kuzatuv texnologiyalari
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Biz cookie fayllaridan sizning tajribangizni yaxshilash, sayt
              faoliyatini tahlil qilish va moslashtirilgan kontent ko‘rsatish
              uchun foydalanamiz. Siz cookie sozlamalarini brauzeringiz orqali
              boshqarishingiz mumkin.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
              6. Siyosatdagi o‘zgarishlar
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Ushbu Maxfiylik siyosati vaqti-vaqti bilan yangilanib turadi. Biz
              barcha o‘zgarishlarni ushbu sahifada e’lon qilamiz va "Yangilangan
              sana"ni ko‘rsatamiz.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
              7. Biz bilan bog‘lanish
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Agar sizda ushbu siyosat yuzasidan savollar yoki takliflar bo‘lsa,
              biz bilan{' '}
              <span className="text-orange-600 dark:text-orange-400 font-medium">
                privacy@kinomen.com
              </span>{' '}
              manzili orqali bog‘lanishingiz mumkin.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
