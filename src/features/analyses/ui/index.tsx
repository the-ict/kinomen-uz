"use client"

import React from 'react';
import AnalysesListCard from './AnalysesListCard';
import Followings from './Followings';
import { useQuery } from '@tanstack/react-query';
import post_requests from '@/shared/config/api/posts/posts.request';
import user_requests from '@/shared/config/api/user/user.requests';

export default function index() {

  const analyses = useQuery({
    queryKey: ["analyses"],
    queryFn: () => post_requests.getAll(),
  })

  const me = useQuery({
    queryKey: ["me"],
    queryFn: () => user_requests.getMe(),
  })


  return (
    <div className="custom-container grid grid-cols-[80%_20%] gap-5 relative">
      <div className="grid grid-cols-3 gap-5">
        {
          Array.isArray(analyses.data) && analyses.data.map((analysis) => (
            <AnalysesListCard key={analysis.id} analyses={analysis} isOwner={analysis.author.id === me.data?.id}/>
          ))
        }
      </div>
      <Followings />
    </div>
  );
}
