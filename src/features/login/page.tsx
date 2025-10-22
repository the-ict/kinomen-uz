"use client"

import { useEffect, useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import Link from 'next/link';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import auth_requests from '@/shared/config/api/auth/auth.requests';
import { useStore } from '@/shared/store';

const LoginSchema = z.object({
  email: z.string().email().min(3, 'Email must be at least 3 character'),
  password: z.string().min(3),
});

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const userStore = useStore();

  useEffect(() => {
    if(userStore.token) {
      window.location.replace('/')
    }
  }, [])

  const login = useMutation({
    mutationKey: ['login'],
    mutationFn: () => auth_requests.login({ password, email }),
    onSuccess: (res) => {
      userStore.setToken(res.token);
      window.location.href = "/analyses"
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    
    const result = LoginSchema.safeParse({ email, password });
    console.log(result);
    if (!result.success) throw new Error('Validation error!');

    login.mutate();
  };

  return (
    <div className="bg-black h-screen w-screen flex items-center justify-center">
      <div className="bg-[#111] h-max py-10 w-[400px] rounded-xl shadow-2xl flex flex-col px-10 gap-5 justify-center">
        <h1 className="font-semibold text-center">
          Kinomen <span className="text-red-500">.uz</span>
        </h1>
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSubmit}>Kirish</Button>

        <div className="flex items-center justify-center gap-2 text-center text-sm">
          <span>Ro'yhatdan o'tmaganmisiz?</span>
          <Link href={'/register'} className="text-blue-400 font-semibold">
            <span>Ro'yhatdan o'tish</span>
          </Link>
        </div>

        <Button variant={'outline'} className="cursor-pointer">
          Google bilan
        </Button>
      </div>
    </div>
  );
}
