'use client';

import React, { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import 'easymde/dist/easymde.min.css';
import FroalaEditor from 'react-froala-wysiwyg';
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/plugins/code_view.min.css';
import 'froala-editor/css/plugins/colors.min.css';
import 'froala-editor/css/plugins/line_breaker.min.css';
import 'froala-editor/css/plugins/table.min.css';
import 'froala-editor/css/plugins/video.min.css';

export default function CreateAnalysisPage() {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Tahlil yuborildi:', content);
    alert('✅ Tahlilingiz saqlandi!');
  };

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
            placeholder="Masalan: 'Tushlar va Haqiqat chegarasida'"
            className="bg-black/40 border-white/10 text-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            📄 Tahlil matni
          </label>

          <div className="bg-black/40 border border-white/10 rounded-lg overflow-hidden">
            <FroalaEditor
              tag="textarea"
              model={content}
              onModelChange={(value: string) => setContent(value)}
              config={{
                placeholderText: 'Tahlil matnini yozing...',
                heightMin: 250,
                toolbarButtons: [
                  'bold',
                  'italic',
                  'underline',
                  'strikeThrough',
                  'paragraphFormat',
                  'align',
                  'formatOL',
                  'formatUL',
                  'insertLink',
                  'insertImage',
                  'insertTable',
                  'undo',
                  'redo',
                  'html',
                ],
                theme: 'dark',
              }}
            />
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
