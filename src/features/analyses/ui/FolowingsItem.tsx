import { User } from 'lucide-react';
import ProfilePicture from '../../../../public/pp.jpg';
import React from 'react';
import Image from 'next/image';

export default function FolowingsItem() {
  return (
    <div className="flex items-center w-full py-3 px-3 rounded-xl gap-2 justify-between">
      <div className="flex items-center gap-2 cursor-pointer">
        <Image
          src={ProfilePicture}
          alt="ProfilePicture"
          width={48}
          height={48}
          sizes="48px"
          className="w-12 h-12 rounded-full object-cover cursor-pointer"
        />

        <div className="flex items-start flex-col">
          <span className="text-sm font-bold">@the_ict</span>
          <p className="text-[10px] text-gray-200 line-clamp-1">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat
            laboriosam ipsa eos quidem molestiae! Nesciunt aliquid deleniti
            nostrum porro explicabo hic, fugiat aperiam non, quam ad
            consectetur, voluptatibus vero illo.
          </p>
        </div>
      </div>
      <span className="text-blue-400 cursor-pointer">Ko'rish</span>
    </div>
  );
}
