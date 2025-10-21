import Image from 'next/image';
import React from 'react';
import ProfilePicture from '../../../../public/pp.jpg';
import { ChevronDown, Edit, Trash } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';

export default function CommentItem() {
  return (
    <div className="mt-5 w-full flex items-start gap-5">
      <Image
        src={ProfilePicture}
        alt="What up"
        width={50}
        height={50}
        className="rounded-full object-cover cursor-pointer"
      />
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <p>@the-ict</p>
          <p className="text-sm text-gray-200">10 kun oldin</p>
        </div>
        <p className="text-sm text-gray-200">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates
          sed accusantium quos temporibus rem quae magni, distinctio consectetur
          ipsam harum deserunt ducimus explicabo amet sapiente sunt minus odit
          fuga praesentium.
        </p>

        <div className="flex items-center gap-5">
          <button className="flex items-center gap-2 cursor-pointer">
            <i className="fa-regular fa-thumbs-up"></i>

            <p>100</p>
          </button>

          <button className="flex items-center gap-2 cursor-pointer">
            <i className="fa-regular fa-thumbs-down"></i>

            <p>100</p>
          </button>

          <button className="hover:bg-[#333] transition-all py-2 px-5 rounded-full cursor-pointer">
            Javob yozish
          </button>
        </div>

        <div className="text-blue-500 cursor-pointer px-4 py-2 rounded-full hover:bg-[#333] w-max flex items-center gap-2">
          <ChevronDown className="w-5 h-5" />
          <span>4 ta javob</span>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className='outline-none'>
          <i className="fa-solid fa-ellipsis-vertical cursor-pointer"></i>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem className='flex items-center justify-between cursor-pointer'>O'zgartirish <Edit className="w-5 h-5" /></DropdownMenuItem>
          <DropdownMenuItem className='flex items-center justify-between cursor-pointer'>O'chirish <Trash className="w-5 h-5" /></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
