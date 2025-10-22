'use client';

import React, { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import {useEditor,EditorContent} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import TextAlign from "@tiptap/extension-text-align"
import Highlight from "@tiptap/extension-highlight"
import MenuBar from './menu-bar';

export default function CreateAnalysisPage() {
  const [movieName, setMovieName] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);

  const editor = useEditor({
    extensions: [StarterKit, TextAlign.configure({
      types: ['heading', 'paragraph'],
    }), Highlight],
    content: "Xoxlaganingizcha sharx yozing !",
    immediatelyRender: true,
    onUpdate: (content) => {
      setContent(content.editor.getHTML());
      console.log("Content:   ",content.editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "border-2 border-[#333] min-h-[150px] max-h-[300px] overflow-y-scroll p-5 rounded-xl outline-none bg-[#222]"
      }
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Tahlil yuborildi:', { movieName, title, content, rating });
    alert(`✅ Tahlilingiz saqlandi! Rating: ${rating} ⭐`);
  };

  function Star({ filled }: { filled: boolean }) {
    return (
      <svg
        className={`w-7 h-7 ${filled ? 'text-yellow-400' : 'text-gray-500'}`}
        viewBox="0 0 20 20"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.374 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.457 2.703c-.784.57-1.838-.197-1.539-1.118l1.286-3.966a1 1 0 00-.364-1.118L2.552 9.393c-.783-.57-.38-1.81.588-1.81h4.173a1 1 0 00.95-.69L9.05 2.927z" />
      </svg>
    );
  }

  return (
    <section className="custom-container py-10 text-gray-100">
      <h1 className="text-3xl font-bold mb-8">
        📝 Yangi Kino Tahlili Yaratish
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-[#161616] border border-white/10 rounded-2xl p-8 flex flex-col gap-6"
      >
        <div>
          <label className="block text-sm font-semibold mb-2">
            🎬 Kino nomi
          </label>
          <Input
            type="text"
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
            placeholder="Masalan: 'Inception (2010)'"
            className="bg-black/40 border-white/10 text-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            🖋️ Tahlil sarlavhasi
          </label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Masalan: 'Tushlar va Haqiqat chegarasida'"
            className="bg-black/40 border-white/10 text-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            🖋️ Tahlil sarlavhasi
          </label>
          <MenuBar editor={editor} />
         <EditorContent editor={editor} />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            ⭐ Kino bahosi
          </label>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setRating(i)}
                  onMouseEnter={() => {}}
                  className="focus:outline-none cursor-pointer"
                  aria-label={`${i} star`}
                >
                  <Star filled={i <= rating} />
                </button>
              ))}
            </div>
            <span className="text-sm text-gray-400">{rating} / 5</span>
          </div>
        </div>

        <div className="flex justify-end">
          <Button className="bg-[#e50914] hover:bg-[#b0060f] text-white font-semibold px-10 py-2 rounded-full">
            Yuborish
          </Button>
        </div>
      </form>
    </section>
  );
}
