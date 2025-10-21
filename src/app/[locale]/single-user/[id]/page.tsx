'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs';
import Image from 'next/image';
import CoverImage from '../../../../../public/movie-analysis.webp';
import ProfilePicture from '../../../../../public/pp.jpg';
import { useState } from 'react';
import AnalysesListCard from '@/features/analyses/ui/AnalysesListCard';
import CommentItem from '@/features/single-analyses/ui/CommentItem';
import MovieCard from '@/widgets/movies/ui/movie-card';

export default function index() {
  const [activeTab, setActiveTab] = useState<
    'analyses' | 'favorites' | 'watchlist' | 'replies'
  >('analyses');

  const activeTabStyle = 'border-b-2 border-gray-200 cursor-pointer';

  return (
    <section className="min-h-screen">
      <div className="w-full h-[30vh] relative">
        <Image src={CoverImage.src} alt="hero" fill className="object-cover" />

        <div className="absolute -bottom-[15px] w-full">
          <div className="custom-container flex items-center gap-5">
            <Image
              src={ProfilePicture.src}
              alt="What up"
              width={50}
              height={50}
              className="rounded-full object-cover cursor-pointer"
            />

            <div className="flex items-center gap-2">
              <p>@the-ict</p>
              <p className="text-sm text-gray-200">10 kun oldin</p>
            </div>
          </div>
        </div>
      </div>

      <div className="custom-container">
        <Tabs defaultValue="analyses" className="w-full mt-5">
          <TabsList>
            <TabsTrigger
              value="analyses"
              className={`${activeTab === 'analyses' ? activeTabStyle : ''} cursor-pointer  py-2 px-5 mb-3`}
              onClick={() => setActiveTab('analyses')}
            >
              Tahlillar
            </TabsTrigger>
            <TabsTrigger
              onClick={() => setActiveTab('replies')}
              value="replies"
              className={`cursor-pointer  py-2 px-5 mb-3 ml-5 ${activeTab === 'replies' ? activeTabStyle : ''}`}
            >
              Javoblar
            </TabsTrigger>

            <TabsTrigger
              onClick={() => setActiveTab('watchlist')}
              value="watchlist"
              className={`cursor-pointer  py-2 px-5 mb-3 ml-5 ${activeTab === 'watchlist' ? activeTabStyle : ''}`}
            >
              Watchlist
            </TabsTrigger>
            <TabsTrigger
              onClick={() => setActiveTab('favorites')}
              value="favorites"
              className={`cursor-pointer  py-2 px-5 mb-3 ml-5 ${activeTab === 'favorites' ? activeTabStyle : ''}`}
            >
              Favorites
            </TabsTrigger>

            <TabsContent value="analyses" className="grid grid-cols-4 gap-5">
              {[1, 2, 3, 4, 5, 6, 6, 7, 8, 9, 10].map((item) => (
                <AnalysesListCard key={item} />
              ))}
            </TabsContent>
            <TabsContent value="replies">
              {[1, 2, 3, 4, 5, 6, 6, 7, 8, 9, 10].map((item) => (
                <CommentItem key={item} />
              ))}
            </TabsContent>
            <TabsContent value="watchlist" className="grid grid-cols-6 gap-10">
              {[1, 2, 3, 4, 5, 6, 6, 7, 8, 9, 10].map((item) => (
                <MovieCard
                  key={item}
                  movie={{
                    id: 3,
                    title: 'Movie 3',
                    year: 2024,
                    genre: 'Drama',
                    country: 'France',
                    poster: '',
                    rating: 9.1,
                  }}
                />
              ))}
            </TabsContent>
            <TabsContent value="favorites" className='grid grid-cols-6 gap-10'>
              {[1, 2, 3, 4, 5, 6, 6, 7, 8, 9, 10].map((item) => (
                <MovieCard
                  key={item}
                  movie={{
                    id: 3,
                    title: 'Movie 3',
                    year: 2024,
                    genre: 'Drama',
                    country: 'France',
                    poster: '',
                    rating: 9.1,
                  }}
                />
              ))}
            </TabsContent>
          </TabsList>
        </Tabs>
      </div>
    </section>
  );
}
