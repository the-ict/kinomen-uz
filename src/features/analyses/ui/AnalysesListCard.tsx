import Image from 'next/image';
import React from 'react';
import AnalysisCardImage from '../../../../public/movie-analysis.webp';
import { HeartHandshake, User, MessageCircle, Eye } from 'lucide-react';
import type { IPost } from '@/shared/config/api/posts/posts.model';

interface AnalysesListCardProps {
  analyses: IPost;
}

export default function AnalysesListCard({ analyses }: AnalysesListCardProps) {
  return (
    <div
      onClick={() => (window.location.href = `/analyses/${analyses.id}`)}
      className="group relative h-[500px] flex flex-col justify-between overflow-hidden rounded-2xl bg-[#161616] border border-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.08)] transition-all duration-300 cursor-pointer"
    >
      <div className="relative w-full h-[250px]">
        <Image
          src={analyses.imageUrl || AnalysisCardImage.src}
          alt="Analysis"
          fill
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
