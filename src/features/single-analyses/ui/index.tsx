'use client';

import React, { useEffect } from 'react';
import MoviePoster from '../../../../public/movieposter.jpg';
import { Heart, User } from 'lucide-react';
import Image from 'next/image';
import CommentItem from './CommentItem';
import { useParams } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import post_requests from '@/shared/config/api/posts/posts.request';
import user_requests from '@/shared/config/api/user/user.requests';
import comment_requests from '@/shared/config/api/comment/comment.request';

export default function index() {
  const [commentText, setCommentText] = React.useState<string>('');

  const params = useParams();

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

  useEffect(() => {
    console.log(comments.data);
  }, [comments.data]);

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
    },
  });

  const handleCreateComment = () => {
    console.log(commentText, 'comment text');
    if (commentText.trim() === '') return;

    createComment.mutate();
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
                <Image
                  src={author.data.imageUrl}
                  alt="What up"
                  width={50}
                  height={50}
                  className="rounded-full object-cover"
                />
                <p className="font-semibold">{author.data?.username}</p>
              </div>
            ) : (
              <div className="flex items-center gap-2 cursor-pointer">
                <User className="w-5 h-5" />
                <p className="font-semibold">{author.data?.username}</p>
              </div>
            )}

            <div>
              <p className="text-sm text-gray-200 w-[70%]">
                {author.data?.about}
              </p>
            </div>

            <div className="flex flex-col gap-2 items-center cursor-pointer">
              <Heart className="w-5 h-5" />
              <p className="text-sm">{singlePost.data?.likes.length}</p>
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
          <Image
            src={me.data.imageUrl}
            alt="What up"
            width={50}
            height={50}
            className="rounded-full object-cover cursor-pointer"
          />
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
          className="bg-blue-500 font-semibold hover:bg-blue-700 transition-all py-2 px-10 rounded-full cursor-pointer"
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
