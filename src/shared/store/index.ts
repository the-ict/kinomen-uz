import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface UserStore {
  token: string;
  setToken: (token: string) => void;
}

const store = create(
  persist<UserStore>(
    (set) => ({
      token: '',
      setToken: (token: string) =>
        set(() => {
          return { token };
        }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export const useStore = store;
export { store };
