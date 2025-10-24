import React from 'react';
import FolowingsItem from './FolowingsItem';
import { useQuery } from '@tanstack/react-query';
import user_requests from '@/shared/config/api/user/user.requests';
import { UserBodyModels } from '@/shared/config/api/user/user.models';

export default function Followings({me}: {me: UserBodyModels}) {
  const userFollows = useQuery({
    queryKey: ["user-follows"],
    queryFn: () => user_requests.getFollowings(me.id || 0)
  })

  console.log(userFollows.data, "user data");
  return (
    <div className="flex flex-col items-start gap-2 sticky top-0">
      {userFollows.data?.followings.map((following) => (
        <FolowingsItem key={following} />
      ))}
    </div>
  );
}
