import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import Link from 'next/link';
import React from 'react';

export default function Register() {
  return (
    <div className="bg-black h-screen w-screen flex items-center justify-center">
      <div className="bg-[#111] h-max py-10 w-[400px] rounded-xl shadow-2xl flex flex-col px-10 gap-5 justify-center">
        <h1 className="font-semibold text-center">
          Kinomen <span className="text-red-500">.uz</span>
        </h1>
        <Input placeholder="Username" />
        <Input placeholder="Email" />
        <Input placeholder="Password" />
        <Input placeholder="Confirm Password" />
        <Button>Ro'hatdan o'tish</Button>

        <div className="flex items-center justify-center gap-2 text-center text-sm">
          <span>Avval ro'yhatdan o'tganmisiz?</span>
          <Link href={'/login'} className="text-blue-400 font-semibold">
            <span>Kirish</span>
          </Link>
        </div>

        <Button variant={'outline'} className="cursor-pointer">
          Google bilan
        </Button>
      </div>
    </div>
  );
}
