'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs';
import Image from 'next/image';
import CoverImage from '../../../../../public/movie-analysis.webp';
import ProfilePicture from '../../../../../public/pp.jpg';
import { useState } from 'react';
import AnalysesListCard from '@/features/analyses/ui/AnalysesListCard';
import CommentItem from '@/features/single-analyses/ui/CommentItem';
import MovieCard from '@/widgets/movies/ui/movie-card';
import { useQuery } from '@tanstack/react-query';
import post_requests from '@/shared/config/api/posts/posts.request';
import comment_requests from '@/shared/config/api/comment/comment.request';
import user_requests from '@/shared/config/api/user/user.requests';
import { User } from 'lucide-react';

export default function index() {
  const [activeTab, setActiveTab] = useState<
    'analyses' | 'favorites' | 'watchlist' | 'replies'
  >('analyses');

  const activeTabStyle = 'border-b-2 border-gray-200 cursor-pointer';

  const posts = useQuery({
    queryKey: ['my-posts'],
    queryFn: () => post_requests.getMyPosts(),
  });

  const comments = useQuery({
    queryKey: ['my-comments'],
    queryFn: () => comment_requests.geyMyComments(),
  });

  const me = useQuery({
    queryKey: ['user-info'],
    queryFn: () => user_requests.getMe(),
  });

  console.log(posts.data);
  console.log(comments.data);
  console.log(me.data);

  return (
    <section className="min-h-screen">
      <div className="w-full">
        {me.data?.coverImage && (
          <div className="h-[30vh] w-full relative">
            <Image
              src={me.data.coverImage}
              alt="hero"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        )}

        <div className="w-full">
          <div className="custom-container flex items-center gap-5">
            {me.data?.imageUrl ? (
              <Image
                src={me.data.imageUrl}
                alt="Profile"
                width={100}
                height={100}
                sizes="100px"
                className="rounded-full h-[100px] w-[100px] object-cover"
              />
            ) : (
              <User className="w-5 h-5" />
            )}

            <div className="flex items-center gap-2">
              <p>{me.data?.username}</p>
              <p className="text-sm text-gray-200">{me.data?.email}</p>
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
              {posts.data?.map((item) => (
                <AnalysesListCard key={item.id} analyses={item} isOwner={me.data?.id == item.authorId}/>
              ))}
            </TabsContent>
            <TabsContent value="replies">
              {Array.isArray(comments.data) && comments.data.map((item) => (
                <CommentItem key={item.id} comment={item} meId={me.data?.id || 0}/>
              ))}
            </TabsContent>
            <TabsContent value="watchlist" className="grid grid-cols-6 gap-10">
              {Array.isArray(posts.data) && posts.data.map((item) => (
                <MovieCard
                  key={item.id}
                  movie={item}
                />
              ))}
            </TabsContent>
            <TabsContent value="favorites" className="grid grid-cols-6 gap-10">
              {Array.isArray(posts.data) && posts.data.map((item) => (
                <MovieCard
                  key={item.id}
                  movie={item}
                />
              ))}
            </TabsContent>
          </TabsList>
        </Tabs>
      </div>
    </section>
  );
}
