import type { Metadata } from 'next';
import '../globals.css';
import { golosText } from '@/shared/config/fonts';
import { ThemeProvider } from '@/shared/config/theme-provider';
import { PRODUCT_INFO } from '@/shared/constants/data';
import { hasLocale, Locale, NextIntlClientProvider } from 'next-intl';
import { routing } from '@/shared/config/i18n/routing';
import { notFound } from 'next/navigation';
import Footer from '@/widgets/footer/ui';
import Navbar from '@/widgets/navbar/ui';
import { ReactNode } from 'react';
import { setRequestLocale } from 'next-intl/server';
import QueryProvider from '@/shared/config/react-query/QueryProvider';
import Script from 'next/script';

export const metadata: Metadata = {
  title: PRODUCT_INFO.name,
  description: PRODUCT_INFO.description,
  icons: PRODUCT_INFO.favicon,
};

type Props = {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body className={`${golosText.variable} antialiased`}>
        <NextIntlClientProvider locale={locale}>
          <ThemeProvider
            attribute={'class'}
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <QueryProvider>
              <Navbar />
              {children}
              <Footer />
            </QueryProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
      <Script
        src="https://buttons.github.io/buttons.js"
        strategy="lazyOnload"
        async
        defer
      />
    </html>
  );
}
