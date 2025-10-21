'use client';

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
import { authedMenu, menu } from '../lib/data';
import { PRODUCT_INFO } from '@/shared/constants/data';
import RenderMenuItem from './RenderItem';
import RenderMobileMenuItem from './RenderMobileMenuItem';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/shared/lib/utils';

const Navbar = () => {
  const [isHide, setIsHide] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes('register') || pathname.includes('login')) {
      setIsHide(true);
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const auth = {
    login: { title: 'Kirish', url: '/login' },
    signup: { title: "Ro'yhatdan o'tish", url: '/register' },
  };

  if (isHide) return;

  return (
    <section
      className={cn(
        'py-4 sticky top-0 z-50 transition duration-200',
        isScrolled ? 'bg-white/10 backdrop-blur-sm' : '',
      )}
    >
      <div className="custom-container">
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-2">
            <Link href={'/'} className="flex items-center gap-2">
              <span className="text-xl font-semibold tracking-tighter">
                {PRODUCT_INFO.name}
              </span>
            </Link>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => RenderMenuItem({ item, isScrolled }))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {authedMenu.map((item) =>
                    RenderMenuItem({ item, isScrolled }),
                  )}
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
             <span className="text-xl font-semibold tracking-tighter">
                {PRODUCT_INFO.name}
              </span>
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
                   <span className="text-xl font-semibold tracking-tighter">
                {PRODUCT_INFO.name}
              </span>
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
