// import { create } from 'zustand';
// import type { User } from '@/features/auth/types';
// import { devtools } from 'zustand/middleware';

// interface AuthState {
//   /** Eski kodla tam uyum için hem token hem accessToken tutuyoruz */
//   token: string | null;
//   accessToken: string | null;      // isteyen yeni kodlar bunu da kullanabilir
//   refreshToken: string | null;
//   user: User | null;

//   /** setter'lar */
//   setToken: (token: string | null) => void;
//   setRefreshToken: (token: string | null) => void;
//   setUser: (user: User | null) => void;
//   clearAuth: () => void;
// }

// export const useAuth = create<AuthState>()(
//   devtools((set) => ({
//     token: localStorage.getItem('accessToken'),
//     accessToken: localStorage.getItem('accessToken'),
//     refreshToken: localStorage.getItem('refreshToken'),
//     user: null,

//     setToken: (token) => {
//       if (token) localStorage.setItem('accessToken', token);
//       else localStorage.removeItem('accessToken');
//       set({ token, accessToken: token });
//     },

//     setRefreshToken: (token) => {
//       if (token) localStorage.setItem('refreshToken', token);
//       else localStorage.removeItem('refreshToken');
//       set({ refreshToken: token });
//     },

//     setUser: (user) => set({ user }),

//     clearAuth: () => {
//       localStorage.removeItem('accessToken');
//       localStorage.removeItem('refreshToken');
//       set({ token: null, accessToken: null, refreshToken: null, user: null });
//     },
//   }), { name: 'AuthStore' }) // ← bu ad DevTools'ta görünür
// );




import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import type { User } from '@/features/auth/types';

interface AuthState {
  token: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;

  setToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  clearAuth: () => void;
}

export const useAuth = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        token: null,
        accessToken: null,
        refreshToken: null,
        user: null,

        setToken: (token) =>
          set(() => {
            if (token) localStorage.setItem('accessToken', token);
            else localStorage.removeItem('accessToken');
            return { token, accessToken: token };
          }),

        setRefreshToken: (token) =>
          set(() => {
            if (token) localStorage.setItem('refreshToken', token);
            else localStorage.removeItem('refreshToken');
            return { refreshToken: token };
          }),

        setUser: (user) => set({ user }),

        clearAuth: () => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          set({
            token: null,
            accessToken: null,
            refreshToken: null,
            user: null,
          });
        },
      }),
      {
        name: 'auth-store', // localStorage key
      }
    )
  )
);
export const getAuthToken = () => useAuth.getState().accessToken;