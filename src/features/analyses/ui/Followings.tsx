import React from 'react'
import FolowingsItem from './FolowingsItem'

export default function Followings() {
  return (
    <div className='flex flex-col items-start gap-2 sticky top-0'>
        {
            [1,2,3,4,5,6,7,8,9].map(following => (
                <FolowingsItem key={following}/>
            ))
        }
    </div>
  )
}
