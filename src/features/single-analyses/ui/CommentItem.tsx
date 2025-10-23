'use client';

import Image from 'next/image';
import React from 'react';
import ProfilePicture from '../../../../public/pp.jpg';
import { ChevronDown, Edit, Trash, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { IComment } from '@/shared/config/api/comment/comment.model';

interface CommentItemProps {
  comment: IComment;
  meId: number;
}

export default function CommentItem({ comment, meId }: CommentItemProps) {
  return (
    <div className="mt-5 w-full flex items-start gap-5">
      {comment.author.imageUrl ? (
        <Image
          src={comment.author.imageUrl}
          alt="What up"
          width={50}
          height={50}
          className="rounded-full object-cover cursor-pointer"
        />
      ) : (
        <User className="w-5 h-5" />
      )}
      <div className="flex flex-col gap-2 flex-1">
        <div className="flex items-center gap-2">
          <p>@{comment.author.username}</p>
          <p className="text-sm text-gray-200">
            {comment.createdAt.toString()}
          </p>
        </div>
        <p className="text-sm text-gray-200">{comment.content}</p>

        <div className="flex items-center gap-5">
          <button className="flex items-center gap-2 cursor-pointer">
            <i className="fa-regular fa-thumbs-up"></i>

            <p>{comment.likes.length}</p>
          </button>

          <button className="flex items-center gap-2 cursor-pointer">
            <i className="fa-regular fa-thumbs-down"></i>

            <p>{comment.likes.length}</p>
          </button>

          <button className="hover:bg-[#333] transition-all py-2 px-5 rounded-full cursor-pointer">
            Javob yozish
          </button>
        </div>

        <div className="text-blue-500 cursor-pointer px-4 py-2 rounded-full hover:bg-[#333] w-max flex items-center gap-2">
          <ChevronDown className="w-5 h-5" />
          <span>{comment.replies?.length} ta javob</span>
        </div>
      </div>

      {comment.author.id === meId && (
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <i className="fa-solid fa-ellipsis-vertical cursor-pointer"></i>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem className="flex items-center justify-between cursor-pointer">
              O'zgartirish <Edit className="w-5 h-5" />
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center justify-between cursor-pointer">
              O'chirish <Trash className="w-5 h-5" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
