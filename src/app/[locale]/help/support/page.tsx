import React from 'react';
import { Button } from '@/shared/ui/button';

export default function SupportPage() {
  return (
    <div className="dark:from-slate-900 dark:to-slate-800 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-12 text-slate-900 dark:text-slate-100 tracking-tight">
          Yordam Markazi
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl p-8 border border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-slate-200">
              Aloqa ma’lumotlari
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-lg font-medium text-slate-700 dark:text-slate-300">
                  Email:
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  support@kinomen.com
                </p>
              </div>
              <div>
                <p className="text-lg font-medium text-slate-700 dark:text-slate-300">
                  Telefon:
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  +1 (555) 123-4567
                </p>
              </div>
              <div>
                <p className="text-lg font-medium text-slate-700 dark:text-slate-300">
                  Ish vaqti:
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  Dush–Juma, 09:00 — 18:00 (UTC)
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl p-8 border border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-slate-200">
              Yordam usullari
            </h2>
            <div className="space-y-4">
              <Button className="w-full text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Email orqali yozish
              </Button>
              <Button className="w-full text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Jonli chat orqali bog‘lanish
              </Button>
              <Button className="w-full text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                FAQ sahifasiga o‘tish
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
