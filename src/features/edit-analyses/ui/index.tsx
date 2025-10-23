"use client";

import { useRouter } from 'next/navigation';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import MenuBar from '@/features/create-analyses/ui/menu-bar';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import post_requests from '@/shared/config/api/posts/posts.request';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

function Star({ filled, onClick }: { filled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="focus:outline-none cursor-pointer"
      aria-label={`${filled ? 'Remove star' : 'Add star'}`}
    >
      <svg
        className={`w-7 h-7 ${filled ? 'text-yellow-400' : 'text-gray-500'}`}
        viewBox="0 0 20 20"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.374 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.457 2.703c-.784.57-1.838-.197-1.539-1.118l1.286-3.966a1 1 0 00-.364-1.118L2.552 9.393c-.783-.57-.38-1.81.588-1.81h4.173a1 1 0 00.95-.69L9.05 2.927z" />
      </svg>
    </button>
  );
}


export default function EditAnalysisPage() {
  const { id } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState(0);
  const [initialContent, setInitialContent] = useState('');

  const { data: analysis, isLoading } = useQuery({
    queryKey: ['analysis', id],
    queryFn: () => post_requests.getSinglePost(Number(id)),
  });

  useEffect(() => {
    if (analysis) {
      setTitle(analysis.title);
      setRating(analysis.rating || 0);
      setInitialContent(analysis.content);
    }
  }, [analysis]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            class: 'mb-4',
          },
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight,
    ],
    immediatelyRender: false,
    content: initialContent,
    editorProps: {
      attributes: {
        class:
          'border-2 border-[#333] min-h-[150px] max-h-[300px] overflow-y-auto p-5 rounded-xl outline-none bg-[#222] whitespace-pre-wrap',
      },
    },
    parseOptions: {
      preserveWhitespace: 'full',
    },
    enablePasteRules: [
      'textStyle',
      'bold',
      'italic',
      'underline',
      'strike',
      'code',
      'highlight',
      'textAlign',
    ],
  });

  useEffect(() => {
    if (editor && initialContent) {
      editor.commands.setContent(initialContent);
    }
  }, [editor, initialContent]);

  const updateMutation = useMutation({
    mutationFn: () =>
      post_requests.updatePost(Number(id), {
        title,
        content: editor?.getHTML() || '',
        rating,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analysis', id] });
      queryClient.invalidateQueries({ queryKey: ['analyses'] });
      toast.success('Tahlil muvaffaqiyatli yangilandi');
      router.push(`/analyses/${id}`);
    },
    onError: (error) => {
      toast.error('Tahlilni yangilashda xatolik yuz berdi');
      console.error('Update error:', error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => post_requests.deletePost(Number(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analyses'] });
      toast.success('Tahlil muvaffaqiyatli o\'chirildi');
      router.push('/analyses');
    },
    onError: (error) => {
      toast.error('Tahlilni o\'chirishda xatolik yuz berdi');
      console.error('Delete error:', error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editor) return;
    updateMutation.mutate();
  };

  const handleDelete = () => {
    if (window.confirm('Haqiqatan ham ushbu tahlilni o\'chirmoqchimisiz?')) {
      deleteMutation.mutate();
    }
  };

  if (isLoading) {
    return <div className="custom-container py-10">Yuklanmoqda...</div>;
  }

  if (!analysis) {
    return <div className="custom-container py-10">Tahlil topilmadi</div>;
  }

  return (
    <section className="custom-container py-10 text-gray-100">
      <h1 className="text-3xl font-bold mb-8">✏️ Tahlilni Tahrirlash</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2">
            🎬 Tahlil Sarlavhasi
          </label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Tahlil sarlavhasini kiriting"
            className="bg-black/40 border-white/10 text-gray-100"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            ⭐ Kino Bahosi
          </label>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  filled={i <= rating}
                  onClick={() => setRating(i)}
                />
              ))}
            </div>
            <span className="text-sm text-gray-400">{rating} / 5</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            📝 Tahlil Matni
          </label>
          <div className="border border-white/10 rounded-xl overflow-hidden">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
          </div>
        </div>

        <div className="flex items-center justify-between pt-4">
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? 'O\'chirilmoqda...' : 'Tahlilni O\'chirish'}
          </Button>
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={updateMutation.isPending}
            >
              Bekor Qilish
            </Button>
            <Button type="submit" disabled={updateMutation.isPending}>
              {updateMutation.isPending ? 'Saqlanmoqda...' : 'Saqlash'}
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}
