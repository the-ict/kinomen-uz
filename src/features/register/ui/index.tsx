'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import auth_requests from '@/shared/config/api/auth/auth.requests';
import { z } from 'zod';
import { useStore } from '@/shared/store';

const RegisterSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  email: z.string().min(3).email('Email is required'),
  password: z.string().min(3, 'Password must be at least 3 characters long'),
});

export default function Register() {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const userStore = useStore();

  useEffect(() => {
    if (!userStore.token) window.location.replace('/');
  }, []);

  const register = useMutation({
    mutationKey: ['register'],
    mutationFn: () => auth_requests.register({ username, email, password }),
    onSuccess: (res) => {
      userStore.setToken(res.token);
      window.location.href = '/analyses';
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const result = RegisterSchema.safeParse({ username, email, password });

    if (!result.success) {
      console.log(result.error);
      return;
    }

    register.mutate();
  };

  return (
    <div className="bg-black h-screen w-screen flex items-center justify-center">
      <div className="bg-[#111] h-max py-10 w-[400px] rounded-xl shadow-2xl flex flex-col px-10 gap-5 justify-center">
        <h1 className="font-semibold text-center">
          Kinomen <span className="text-red-500">.uz</span>
        </h1>
        <Input
          placeholder="Username"
          value={username}
          type="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          placeholder="Email"
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          placeholder="Confirm Password"
          value={confirmPassword}
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button onClick={handleSubmit} type="submit">
          Ro'hatdan o'tish
        </Button>

        <div className="flex items-center justify-center gap-2 text-center text-sm">
          <span>Avval ro'yhatdan o'tganmisiz?</span>
          <Link href={'/login'} className="text-blue-400 font-semibold">
            <span>Kirish</span>
          </Link>
        </div>

        <Button variant={'outline'} className="cursor-pointer">
          Google bilan
        </Button>
      </div>
    </div>
  );
}
