'use client';

import React, { useEffect } from 'react';
import MoviePoster from '../../../../public/movieposter.jpg';
import { Heart, User } from 'lucide-react';
import Image from 'next/image';
import CommentItem from './CommentItem';
import { useParams } from 'next/navigation';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import post_requests from '@/shared/config/api/posts/posts.request';
import user_requests from '@/shared/config/api/user/user.requests';
import comment_requests from '@/shared/config/api/comment/comment.request';
import { UPLOAD_BASE_URL } from '@/shared/config/api/URLs';

export default function index() {
  const [commentText, setCommentText] = React.useState<string>('');

  const params = useParams();
  const queryClient = useQueryClient();

  useEffect(() => {
    console.log(params);
  }, [params]);

  const singlePost = useQuery({
    queryKey: ['single-post'],
    queryFn: () => post_requests.getSinglePost(Number(params.id) || 1),
  });

  const author = useQuery({
    queryKey: ['profile'],
    queryFn: () => user_requests.getProfile(singlePost.data?.author.id || 1),
  });

  const me = useQuery({
    queryKey: ['me'],
    queryFn: () => user_requests.getMe(),
  });

  const comments = useQuery({
    queryKey: ['comments', params.id],
    queryFn: () => comment_requests.getPostComments(Number(params.id)),
    select: (data) => data.reverse(),
  });

  const createComment = useMutation({
    mutationKey: ['create-comment'],
    mutationFn: () =>
      comment_requests.createComment({
        postId: singlePost.data?.id || 1,
        content: commentText,
        authorId: author.data?.id || 1,
      }),
    onSuccess: () => {
      setCommentText('');
      queryClient.invalidateQueries({ queryKey: ['comments', params.id] });
    },
  });

  const followUser = useMutation({
    mutationKey: ['follow-user'],
    mutationFn: () => user_requests.followUser(Number(params.id) || 1),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  const likePost = useMutation({
    mutationKey: ['like-post'],
    mutationFn: () => post_requests.likePost(Number(params.id) || 1),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['single-post'] });
    },
  });

  const handleCreateComment = () => {
    console.log(commentText, 'comment text');
    if (commentText.trim() === '') return;

    createComment.mutate();
  };

  const handleFollow = () => {
    followUser.mutate();
  };

  const handleLike = () => {
    likePost.mutate();
  };

  return (
    <section className="custom-container mt-[30px]">
      <div className="grid grid-cols-[20%_80%] gap-10">
        <div className="relative h-[500px]">
          <Image
            src={singlePost.data?.imageUrl || MoviePoster.src}
            alt="movie"
            className="w-full h-full object-cover"
            fill
          />
          <div className="w-max absolute top-0 right-0 px-5 py-2 bg-yellow-500 font-bold text-black rounded">
            {singlePost.data?.rating}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between gap-5">
            {author.data?.imageUrl ? (
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="relative w-10 h-10">
                  <Image
                    src={UPLOAD_BASE_URL + author.data.imageUrl}
                    alt="What up"
                    fill
                    sizes="50%50"
                    className="rounded-full object-cover"
                  />
                </div>
                <p className="text-gray-200">{author.data.username}</p>
              </div>
            ) : (
              <div className="flex items-center gap-2 cursor-pointer">
                <User className="w-5 h-5" />
                <p className="font-semibold">{author.data?.username}</p>
              </div>
            )}

            <div className="flex gap-10 items-center cursor-pointer">
              {me.data?.id != author.data?.id && (
                <button
                  onClick={handleFollow}
                  className="outline-none text-blue-400 hover:text-blue-500 cursor-pointer text-sm transition"
                >
                  Obuna bo'lish
                </button>
              )}

              <div className="flex items-center gap-2 cursor-pointer">
                {singlePost.data?.likes.includes(String(me.data?.id)) ? (
                  <Heart
                    className="w-5 h-5 text-red-500"
                    onClick={handleLike}
                  />
                ) : (
                  <Heart className="w-5 h-5" onClick={handleLike} />
                )}
                <p className="text-sm">{singlePost.data?.likes.length}</p>
              </div>
            </div>
          </div>

          <p
            className="mt-5 text-sm"
            dangerouslySetInnerHTML={{
              __html: String(singlePost.data?.content),
            }}
          />
        </div>
      </div>

      <div className="mt-10 w-full flex items-end justify-between gap-5 border-b py-3">
        {me.data?.imageUrl ? (
          <div className="relative w-10 h-10">
            <Image
              src={UPLOAD_BASE_URL + me.data?.imageUrl}
              alt="What up"
              fill
              sizes="50x50"
              className="rounded-full object-cover cursor-pointer"
            />
          </div>
        ) : (
          <User className="w-5 h-5" />
        )}
        <input
          type="text"
          placeholder="Izoh yozing!"
          className="flex-1 outline-none border-none"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button
          onClick={handleCreateComment}
          className="bg-blue-500 text-[11px] font-semibold hover:bg-blue-700 transition-all py-2 px-10 rounded-full cursor-pointer"
        >
          Yaratish
        </button>
      </div>

      <div className="flex flex-col items-start gap-5 my-5">
        {Array.isArray(comments.data) &&
          comments.data.length > 0 &&
          comments.data.map((comment, index) => (
            <CommentItem
              key={index}
              comment={comment}
              meId={me.data?.id || 0}
            />
          ))}
      </div>
    </section>
  );
}
