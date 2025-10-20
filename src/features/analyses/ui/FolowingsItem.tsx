import { User } from 'lucide-react';
import React from 'react';

export default function FolowingsItem() {
  return (
    <div className="flex items-center w-full py-3 bg-[#222] px-3 rounded-xl gap-2 justify-between">
      <div className="flex items-center gap-2 cursor-pointer">
        <User className="w-5 h-5" />
        <span>@the_ict</span>
      </div>
      <span className="text-blue-400 cursor-pointer">Ko'rish</span>
    </div>
  );
}
