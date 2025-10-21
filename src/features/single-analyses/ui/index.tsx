import React from 'react';

import MoviePoster from '../../../../public/movieposter.jpg';
import ProfilePicture from '../../../../public/pp.jpg';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import CommentItem from './CommentItem';


export default function index() {
  return (
    <section className="custom-container mt-[30px]">
      <div className="grid grid-cols-[20%_80%] gap-10">
        <div className='relative h-[500px]'>
            <Image src={MoviePoster} alt="movie" className="w-full h-full object-cover" fill  />
            <div className='w-max absolute top-0 right-0 px-5 py-2 bg-yellow-500 font-bold text-black rounded'>
                8.5
            </div>
        </div>
        <div>
          <div className="flex items-center justify-between gap-5">
            <Image
              src={ProfilePicture}
              alt="What up"
              width={50}
              height={50}
              className="rounded-full object-cover cursor-pointer"
            />

            <div>
              <p className="font-semibold">@the_ict</p>
              <p className="text-sm text-gray-200 w-[70%]">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptas aliquid doloribus culpa recusandae harum saepe earum
                obcaecati ab ducimus exercitationem. Tempora aliquam eos eaque a
                ea optio nemo quam dicta?
              </p>
            </div>

            <div className="flex flex-col gap-2 items-center cursor-pointer">
              <Heart className="w-5 h-5" />
              <p className="text-sm">100.223</p>
            </div>
          </div>

          <p className="mt-5 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
            pariatur aliquid qui suscipit non quis, nam dolor? Distinctio animi
            facere illo? Officia amet nam repellat cupiditate adipisci dolore ut
            incidunt. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptate et laboriosam incidunt sequi quasi? Veritatis eveniet
            autem blanditiis, distinctio assumenda molestias cupiditate quisquam
            totam eos delectus voluptatibus quos veniam sunt. Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Quis modi id magnam
            laudantium rerum nesciunt aliquam harum ducimus tempora vel
            explicabo, perferendis ipsam doloremque veniam recusandae ex in sint
            nemo. Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
            saepe eligendi ullam eaque, molestiae dolor ex officiis dicta, earum
            quam alias reiciendis sapiente amet modi hic corrupti, est ipsum
            molestias. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Veritatis, dignissimos eius? Optio blanditiis quas eos voluptas
            libero repellendus totam tempora! Ipsam officia magnam repudiandae
            aliquid praesentium! Nemo earum libero doloremque? Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Voluptate totam earum dicta
            sunt debitis. Labore doloremque quos neque eius aliquid, beatae
            saepe. Asperiores cupiditate blanditiis explicabo laborum doloribus
            delectus necessitatibus!
          </p>
        </div>
      </div>

      <div className="mt-10 w-full flex items-end justify-between gap-5 border-b-[1px] border-gray-100 py-3">
        <Image
          src={ProfilePicture}
          alt="What up"
          width={50}
          height={50}
          className="rounded-full object-cover cursor-pointer"
        />
        <input
          type="text"
          placeholder="Comment yozing!"
          className="flex-1 outline-none border-none"
        />
        <button className="bg-blue-500 font-semibold hover:bg-blue-700 transition-all py-2 px-10 rounded-full cursor-pointer">
          Jo'natish
        </button>
      </div>

      <div className="flex flex-col items-start gap-5 my-5">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
          <CommentItem key={item} />
        ))}
      </div>
    </section>
  );
}
