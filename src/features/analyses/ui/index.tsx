import React from 'react';
import AnalysesCard from './AnalysesCard';
import AnalysesListCard from './AnalysesListCard';
import Followings from './Followings';

export default function index() {
  return (
    <div className="custom-container grid grid-cols-[80%_20%] gap-5 relative">
      <div className="grid grid-cols-3 gap-5">
        {
          [1,2,3,4,5,6,7,8,9].map(analysis => (
            <AnalysesListCard key={analysis}/>
          ))
        }
      </div>
      
      <Followings />
    </div>
  );
}
