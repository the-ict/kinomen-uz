'use client';

import { movie_requests } from '@/shared/config/api/movie/movie.requests';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import { useEditor, EditorContent } from '@tiptap/react';
import { Button } from '@/shared/ui/button';
import StarterKit from '@tiptap/starter-kit';
import { Input } from '@/shared/ui/input';
import React, { useEffect, useState } from 'react';
import MenuBar from './menu-bar';
import { useMutation } from '@tanstack/react-query';
import post_requests from '@/shared/config/api/posts/posts.request';
import Image from 'next/image';
import { z } from 'zod';

const createPostSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long'),
  content: z.string().min(3, 'Content must be at least 3 characters long'),
  rating: z
    .number()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must be at most 5'),
  movie: z.string().min(3, 'Movie must be at least 3 characters long'),
});

export interface IMovie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export default function CreateAnalysisPage() {
  const [movieName, setMovieName] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [guessedMovies, setGuessedMovies] = useState<IMovie[]>([]);
  const [chosenMovie, setChosenMovie] = useState<IMovie | null>(null);
  const [error, setError] = useState<string>('');

  const post = useMutation({
    mutationKey: ['create-post'],
    mutationFn: () =>
      post_requests
        .createPost({
          title,
          content,
          rating,
          movie: chosenMovie?.Title || '',
          imageUrl: chosenMovie?.Poster || '',
        })
        .then((res) => console.log(res)),
  });

  useEffect(() => {
    movie_requests
      .searchForMovie(movieName)
      .then((res) => setGuessedMovies(res.Search || []))
      .catch((err) => setError(err.message));
  }, [movieName]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight,
    ],
    content: 'Xoxlaganingizcha sharx yozing !',
    immediatelyRender: false,
    onUpdate: (content) => {
      setContent(content.editor.getHTML());
      console.log('Content:   ', content.editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          'border-2 border-[#333] min-h-[150px] max-h-[300px] overflow-y-scroll p-5 rounded-xl outline-none bg-[#222]',
      },
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('malumotlar: ', { movieName, title, content, rating });

    const result = createPostSchema.safeParse({
      title,
      content,
      rating,
      movie: chosenMovie?.Title || '',
    });

    if (!result.success) {
      console.log(result.error);
      return;
    }

    post.mutate();
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
        {chosenMovie && (
          <div className="flex items-center gap-5 my-5">
            <div className="relative h-[150px] w-[250px]">
              <Image
                alt={chosenMovie.Title}
                src={chosenMovie.Poster}
                className="w-full h-full object-cover rounded-2xl"
                fill
              />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold">{chosenMovie.Title}</h2>
              <p className="text-gray-300">IMDB ID: {chosenMovie.imdbID}</p>
              <p className="text-gray-300">Yili: {chosenMovie.Year}</p>
            </div>
          </div>
        )}

        <div className="relative">
          <label className="block text-sm font-semibold mb-2">
            🎬 Kino nomi
          </label>
          <Input
            type="text"
            value={chosenMovie?.Title || movieName}
            onChange={(e) => setMovieName(e.target.value)}
            placeholder="Masalan: 'Inception (2010)'"
            className="bg-black/40 border-white/10 text-gray-100"
          />

          {Array.isArray(guessedMovies) && guessedMovies.length > 0 && (
            <div className="absolute left-0 w-full top-[calc(100%+10px)] rounded bg-[#222] z-50">
              <ul className="p-4">
                {guessedMovies.map((movie) => (
                  <li
                    key={movie.imdbID}
                    className="flex items-center gap-4 border-b border-white/10 p-4 cursor-pointer"
                    onClick={() => {
                      setMovieName('');
                      setGuessedMovies([]);
                      setChosenMovie(movie);
                    }}
                  >
                    <img
                      src={movie.Poster}
                      alt={movie.Title}
                      className="w-20 h-20 object-cover rounded-2xl"
                    />
                    <div className="flex flex-col">
                      <h3 className="text-gray-100">
                        {movie.Title} ({movie.Year})
                      </h3>
                      <p className="text-gray-400 text-sm">{movie.Type}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
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
