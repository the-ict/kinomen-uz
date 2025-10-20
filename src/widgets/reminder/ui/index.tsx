import React from 'react';

export default function Reminder() {
  return (
    <div className="reminder fixed bottom-4 right-4 z-50 h-[100px] rounded shadow shadow-white w-[400px] bg-black/50 backdrop-blur-sm flex flex-col items-start gap-2 p-4">
      <h1>
        Kinomen <span className="text-red-500">.uz</span> ga xush kelibsiz!
      </h1>
      <b>Eng yoqtirgan kinolaringizni doimiy kuzatib boring!</b>
    </div>
  );
}
