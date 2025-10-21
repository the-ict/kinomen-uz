import React from 'react';
import Image from 'next/image';
import { Heart, Clock, CalendarDays, Film, User } from 'lucide-react';

import MoviePoster from '../../../../public/movieposter.jpg';
import ProfilePicture from '../../../../public/pp.jpg';
import CommentItem from '@/features/single-analyses/ui/CommentItem';

export default function index() {
  return (
    <section className="custom-container mt-[30px] text-gray-100">
      <div className="grid grid-cols-[30%_70%] gap-10">
        <div className="relative h-[500px]">
          <Image
            src={MoviePoster}
            alt="Movie Poster"
            className="w-full h-full object-cover rounded-2xl"
            fill
          />
          <div className="absolute top-0 right-0 px-5 py-2 bg-yellow-500 text-black font-bold rounded-br-2xl rounded-tl-2xl">
            8.5
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-3">Inception (2010)</h1>

          <div className="flex flex-wrap gap-5 text-sm text-gray-300 mb-5">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" /> Christopher Nolan
            </div>
            <div className="flex items-center gap-2">
              <Film className="w-4 h-4" /> Sci-Fi, Thriller
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" /> 2h 28min
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" /> 2010
            </div>
          </div>

          <p className="text-sm leading-relaxed text-gray-200">
            A thief who steals corporate secrets through the use of
            dream-sharing technology is given the inverse task of planting an
            idea into the mind of a C.E.O. But his tragic past may doom the
            project and his team to disaster. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Laudantium debitis, explicabo cumque
            provident adipisci natus officiis alias asperiores nostrum
            blanditiis fugit dolorem sit enim odit aut placeat sapiente quidem
            mollitia!
          </p>

          {/* Like section */}
          <div className="flex items-center gap-2 mt-5 cursor-pointer w-max group">
            <Heart className="w-5 h-5 group-hover:text-red-500 transition-all" />
            <span className="text-sm">125.876 likes</span>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-5">
        <h2 className="text-xl font-semibold mb-3">Kino haqida fikrlar</h2>

        <div className="mt-8 w-full flex items-end justify-between gap-5 border-b border-gray-600 py-3">
          <Image
            src={ProfilePicture}
            alt="Profile"
            width={50}
            height={50}
            className="rounded-full object-cover cursor-pointer"
          />
          <input
            type="text"
            placeholder="Comment yozing..."
            className="flex-1 outline-none border-none bg-transparent text-gray-100 placeholder-gray-400"
          />
          <button className="bg-blue-500 font-semibold hover:bg-blue-700 transition-all py-2 px-10 rounded-full cursor-pointer">
            Jo'natish
          </button>
        </div>

        <div className="flex flex-col items-start gap-5 my-5">
          {[1, 2, 3, 4, 5].map((item) => (
            <CommentItem key={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
