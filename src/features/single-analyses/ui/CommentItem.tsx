'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Edit,
  Trash,
  User,
  MessageSquare,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { IComment } from '@/shared/config/api/comment/comment.model';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import comment_requests from '@/shared/config/api/comment/comment.request';
import { Button } from '@/shared/ui/button';
import { UPLOAD_BASE_URL } from '@/shared/config/api/URLs';

interface CommentItemProps {
  comment: IComment;
  meId: number;
}

export default function CommentItem({ comment, meId }: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [editedContent, setEditedContent] = useState(comment.content);
  const queryClient = useQueryClient();

  const hasLiked = comment.likes?.includes(String(meId));
  const hasDisliked = comment.dislikes?.includes(String(meId));

  const updateComment = useMutation({
    mutationKey: ['update-comment', comment.id],
    mutationFn: () =>
      comment_requests.updateComment(comment.id, { content: editedContent }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      setIsEditing(false);
    },
  });

  const deleteComment = useMutation({
    mutationKey: ['delete-comment', comment.id],
    mutationFn: () => comment_requests.deleteComment(comment.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });

  const handleUpdate = () => {
    if (editedContent.trim() !== '') {
      updateComment.mutate();
    }
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this comment?')) {
      deleteComment.mutate();
    }
  };

  const likeComment = useMutation({
    mutationKey: ['like-comment', comment.id],
    mutationFn: () => comment_requests.likeComment(comment.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      queryClient.invalidateQueries({ queryKey: ['comment-replies', comment.parentId] });
    },
  });

  const dislikeComment = useMutation({
    mutationKey: ['dislike-comment', comment.id],
    mutationFn: () => comment_requests.dislikeComment(comment.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      queryClient.invalidateQueries({ queryKey: ['comment-replies', comment.parentId] });
    },
  });

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (hasLiked) {
      likeComment.mutate();
    } else {
      likeComment.mutate();
      if (hasDisliked) {
        dislikeComment.mutate();
      }
    }
  };

  const handleDislike = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (hasDisliked) {
      dislikeComment.mutate();
    } else {
      dislikeComment.mutate();
      if (hasLiked) {
        likeComment.mutate();
      }
    }
  };

  const repliesQuery = useQuery({
    queryKey: ['comment-replies', comment.id],
    queryFn: () => comment_requests.getReplies(comment.id),
    enabled: showReplies,
  });

  const createReply = useMutation({
    mutationKey: ['create-reply', comment.id],
    mutationFn: () =>
      comment_requests.createComment({
        postId: comment.postId,
        content: replyContent,
        authorId: meId,
        parentId: comment.id,
      }),
    onSuccess: () => {
      setReplyContent('');
      setShowReplyForm(false);
      queryClient.invalidateQueries({
        queryKey: ['comment-replies', comment.id],
      });
      if (comment.parentId) {
        queryClient.invalidateQueries({
          queryKey: ['comment-replies', comment.parentId],
        });
      }
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyContent.trim()) {
      createReply.mutate();
    }
  };

  const toggleReplies = () => {
    setShowReplies(!showReplies);
    if (!showReplies && comment.replies && comment.replies.length > 0) {
      queryClient.prefetchQuery({
        queryKey: ['comment-replies', comment.id],
        queryFn: () => comment_requests.getReplies(comment.id),
      });
    }
  };

  return (
    <div className="mt-5 w-full flex items-start gap-5">
      {comment.author.imageUrl ? (
        <Image
          src={UPLOAD_BASE_URL + comment.author.imageUrl}
          alt="Profile"
          width={50}
          height={50}
          sizes="50px"
          className="rounded-full h-[50px] w-[50px] object-cover cursor-pointer"
        />
      ) : (
        <User className="w-5 h-5" />
      )}
      <div className="flex flex-col gap-2 flex-1">
        <div className="flex items-center gap-2">
          <p>@{comment.author.username}</p>
          <p className="text-sm text-gray-200">
            {new Date(comment.createdAt).toLocaleString()}
          </p>
        </div>

        {isEditing ? (
          <div className="flex flex-col gap-2">
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="min-h-[100px] p-5 rounded border border-[#333]"
            />
            <div className="flex gap-2">
              <Button
                onClick={handleUpdate}
                disabled={updateComment.isPending}
                size="sm"
              >
                {updateComment.isPending ? 'Saving...' : 'Save'}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setEditedContent(comment.content);
                }}
                size="sm"
                className="cursor-pointer"
              >
                Bekor qilish
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-200 whitespace-pre-line">
            {comment.content}
          </p>
        )}

        <div className="flex items-center gap-5">
          <button
            onClick={handleLike}
            disabled={likeComment.isPending || dislikeComment.isPending}
            className={`flex items-center gap-2 cursor-pointer ${hasLiked ? 'text-blue-500' : 'text-gray-400 hover:text-blue-400'}`}
          >
            <i
              className={`fa-${hasLiked ? 'solid' : 'regular'} fa-thumbs-up`}
            ></i>
            <p>{comment.likes?.length || 0}</p>
          </button>

          <button
            onClick={handleDislike}
            disabled={likeComment.isPending || dislikeComment.isPending}
            className={`flex items-center gap-2 cursor-pointer ${hasDisliked ? 'text-red-500' : 'text-gray-400 hover:text-red-400'}`}
          >
            <i
              className={`fa-${hasDisliked ? 'solid' : 'regular'} fa-thumbs-down`}
            ></i>
            <p>{comment.dislikes?.length || 0}</p>
          </button>
        </div>

        {((comment.replies && comment.replies.length > 0) || showReplies) && (
          <div
            className="text-blue-500 cursor-pointer px-4 py-2 rounded-full hover:bg-[#333] w-max flex items-center gap-2"
            onClick={() => setShowReplies(!showReplies)}
          >
            {showReplies ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
            <span>{comment.replies?.length || 0} ta javob</span>
          </div>
        )}

        {showReplies && (
          <div className="mt-4 pl-6 border-l-2 border-gray-700">
            {repliesQuery.isLoading ? (
              <div>Loading replies...</div>
            ) : repliesQuery.data?.length > 0 ? (
              <div className="space-y-4 mt-2">
                {repliesQuery.data.map((reply: IComment) => (
                  <CommentItem key={reply.id} comment={reply} meId={meId} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">No replies yet</p>
            )}
          </div>
        )}

        <button
          onClick={() => setShowReplyForm(!showReplyForm)}
          className="text-sm text-gray-400 cursor-pointer hover:text-blue-400 flex items-center gap-1 mt-2"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Javob yozish</span>
        </button>

        {showReplyForm && (
          <form onSubmit={handleReplySubmit} className="mt-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Javob yozing..."
                className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button
                type="submit"
                size="sm"
                disabled={createReply.isPending || !replyContent.trim()}
              >
                {createReply.isPending ? 'Yuborilmoqda...' : 'Yuborish'}
              </Button>
            </div>
          </form>
        )}
      </div>

      {comment.author.id === meId && (
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <i className="fa-solid fa-ellipsis-vertical cursor-pointer"></i>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setIsEditing(true)}
            >
              O'zgartirish <Edit className="w-4 h-4 ml-2" />
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center justify-between cursor-pointer text-red-500 focus:text-red-500"
              onClick={handleDelete}
            >
              O'chirish <Trash className="w-4 h-4 ml-2" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
