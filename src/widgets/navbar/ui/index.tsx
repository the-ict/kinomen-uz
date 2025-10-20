"use client"

import { useEffect, useState } from 'react';

import { Accordion } from '@/shared/ui/accordion';
import { Button } from '@/shared/ui/button';
import {
  NavigationMenu,
  NavigationMenuList,
} from '@/shared/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/sheet';
import { Menu } from 'lucide-react';
import { menu } from '../lib/data';
import { PRODUCT_INFO } from '@/shared/constants/data';
import RenderMenuItem from './RenderItem';
import RenderMobileMenuItem from './RenderMobileMenuItem';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isHide, setIsHide] = useState<boolean>(false);

  const pathname = usePathname();

  useEffect(() => {
    if(pathname.includes('register') || pathname.includes("login")) {
      setIsHide(true)
    }
  }, [pathname])

  const auth = {
    login: { title: 'Kirish', url: '/login' },
    signup: { title: "Ro'yhatdan o'tish", url: '/register' },
  };

  if(isHide) return;

  return (
    <section className="py-4">
      <div className="custom-container">
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            <Link href={'/'} className="flex items-center gap-2">
              <span className="text-xl font-semibold tracking-tighter">
                {PRODUCT_INFO.name}
              </span>
            </Link>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => RenderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href={auth.login.url}>{auth.login.title}</Link>
            </Button>
            <Button asChild>
              <Link href={auth.signup.url}>{auth.signup.title}</Link>
            </Button>
          </div>
        </nav>

        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link href={'/'} className="flex items-center gap-2">
              <img
                src={PRODUCT_INFO.logo}
                className="max-h-8"
                alt={PRODUCT_INFO.name}
              />
            </Link>
            <Sheet>
              <div className="space-x-2">
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="size-4" />
                  </Button>
                </SheetTrigger>
              </div>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link href={'/'} className="flex items-center gap-2">
                      <img
                        src={PRODUCT_INFO.logo}
                        className="max-h-8"
                        alt={PRODUCT_INFO.name}
                      />
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => RenderMobileMenuItem(item))}
                  </Accordion>

                  <div className="flex flex-col gap-3">
                    <Button asChild variant="outline">
                      <Link href={auth.login.url}>{auth.login.title}</Link>
                    </Button>
                    <Button asChild>
                      <Link href={auth.signup.url}>{auth.signup.title}</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
