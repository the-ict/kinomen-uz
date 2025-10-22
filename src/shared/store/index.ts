import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserStore {
  token: string;
  setToken: (token: string) => void;
}

export const useStore = create(
  persist<UserStore>((set) => ({
    token: "",
    setToken: (token: string) => set(() => ({ token })),
  }), {
    name: "user",
  })
)