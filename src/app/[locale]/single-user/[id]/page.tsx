'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs';
import Image from 'next/image';
import { useState } from 'react';
import AnalysesListCard from '@/features/analyses/ui/AnalysesListCard';
import CommentItem from '@/features/single-analyses/ui/CommentItem';
import { useQuery } from '@tanstack/react-query';
import comment_requests from '@/shared/config/api/comment/comment.request';
import user_requests from '@/shared/config/api/user/user.requests';
import { Edit, User } from 'lucide-react';
import { EditProfileDialog } from '@/features/user-profile/ui';
import { Button } from '@/shared/ui/button';
import { UPLOAD_BASE_URL } from '@/shared/config/api/URLs';
import { useParams } from 'next/navigation';
import IMDBIdMovie from '@/widgets/imdbIdMovie/ui';

function UserProfileContent() {
  const params = useParams();

  const [activeTab, setActiveTab] = useState<
    'analyses' | 'favorites' | 'watchlist' | 'replies'
  >('analyses');

  const activeTabStyle = 'border-b-2 border-gray-200 cursor-pointer';

  const comments = useQuery({
    queryKey: ['my-comments'],
    queryFn: () => comment_requests.geyMyComments(),
  });

  const me = useQuery({
    queryKey: ['user-info'],
    queryFn: () => user_requests.getMe(),
  });

  const userId = Number(params.id);
  const isCurrentUser = me.data?.id === userId;

  return (
    <section className="min-h-screen">
      <div className="w-full">
        {me.data?.coverImage && (
          <div className="h-[30vh] w-full relative">
            <Image
              src={UPLOAD_BASE_URL + me.data.coverImage}
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
                src={UPLOAD_BASE_URL + me.data.imageUrl}
                alt="Profile"
                width={100}
                height={100}
                sizes="100px"
                className="rounded-full h-[100px] w-[100px] object-cover"
              />
            ) : (
              <User className="w-5 h-5" />
            )}

            <div className="flex items-center gap-4 w-full">
              <div>
                <p className="text-lg font-medium">{me.data?.username}</p>
                <p className="text-sm text-gray-400">{me.data?.email}</p>
                {me.data?.about && (
                  <p className="mt-2 text-sm text-gray-300">{me.data.about}</p>
                )}
              </div>

              {isCurrentUser && me.data && (
                <div className="ml-auto">
                  <EditProfileDialog user={me.data}>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Edit className="h-4 w-4" />
                      <span>Malumotlarni o'zgartirish</span>
                    </Button>
                  </EditProfileDialog>
                </div>
              )}

              <button className="text-red-400 transition hover:text-red-600 text-sm cursor-pointer">
                Chiqish
              </button>
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

            <TabsContent value="analyses" className="grid grid-cols-4 gap-5">
              {Array.isArray(me.data?.posts) &&
                me.data.posts.map((item) => (
                  <AnalysesListCard
                    key={item.id}
                    analyses={item}
                    isOwner={me.data?.id == item.authorId}
                  />
                ))}
            </TabsContent>
            <TabsContent value="replies">
              {Array.isArray(comments.data) &&
                comments.data.map((item) => (
                  <CommentItem
                    key={item.id}
                    comment={item}
                    meId={me.data?.id || 0}
                  />
                ))}
            </TabsContent>
            <TabsContent value="watchlist" className="grid grid-cols-6 gap-10">
              {Array.isArray(me.data?.watchlist) &&
                me.data &&
                me.data.watchlist.map((item) => (
                  <IMDBIdMovie key={item} movieId={item} me={me.data} />
                ))}
            </TabsContent>
          </TabsList>
        </Tabs>
      </div>
    </section>
  );
}

export default UserProfileContent;
