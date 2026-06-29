import { create } from 'zustand';

type AuthState = {
  isAuth: boolean;
  userName: string;
  login: (name: string) => void;
};

export const useAuthStore = create<AuthState>()((set) => ({
  isAuth: false,
  userName: '',
  login: (name) => set({ isAuth: true, userName: name }),
}));
