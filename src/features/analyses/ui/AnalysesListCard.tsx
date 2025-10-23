import Image from 'next/image';
import React from 'react';
import AnalysisCardImage from '../../../../public/movie-analysis.webp';
import { HeartHandshake, User, MessageCircle, Eye } from 'lucide-react';
import type { IPost } from '@/shared/config/api/posts/posts.model';

interface AnalysesListCardProps {
  analyses: IPost;
  isOwner?: boolean;
}

export default function AnalysesListCard({
  analyses,
  isOwner = false,
}: AnalysesListCardProps) {
  return (
    <div
      onClick={(e) => {
        if (!(e.target as HTMLElement).closest('.edit-button')) {
          window.location.href = `/analyses/${analyses.id}`;
        }
      }}
      className="group relative h-[500px] flex flex-col justify-between overflow-hidden rounded-2xl bg-[#161616] border border-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.08)] transition-all duration-300 cursor-pointer"
    >
      {isOwner && (
        <div className="absolute top-3 right-3 z-10 edit-button">
          <a
            href={`/analyses/edit/${analyses.id}`}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center justify-center p-2 rounded-full bg-black/80 hover:bg-black/60 transition-colors"
            title="Edit analysis"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z" />
            </svg>
          </a>
        </div>
      )}
      <div className="relative w-full h-[250px]">
        <Image
          src={analyses.imageUrl || AnalysisCardImage.src}
          alt="Analysis"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-5 flex flex-col gap-3">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <User className="w-5 h-5 text-gray-400" />
          <span>{analyses.author.email}</span>
        </div>

        <h1 className="text-lg font-semibold text-white group-hover:text-primary transition-colors">
          {analyses.title}
        </h1>
        <p
          className="text-gray-400 text-sm leading-relaxed line-clamp-4"
          dangerouslySetInnerHTML={{ __html: analyses.content }}
        />

        <div className="flex items-center justify-between pt-3 border-t border-white/10 text-gray-400 text-sm">
          <div className="flex items-center gap-1">
            <HeartHandshake className="w-5 h-5 text-pink-500" />
            <span>{analyses.likes.length}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="w-5 h-5 text-blue-400" />
            <span>10</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-5 h-5 text-green-400" />
            <span>{analyses.view.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
