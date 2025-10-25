import { create } from "zustand";
import { supabase } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

export type AuthState = {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  authLoading: boolean;
  initialized: boolean;

  init: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
};

const fetchUserRole = async (userId: string): Promise<boolean> => {
  const { data: perfil, error } = await supabase
    .from("Perfil")
    .select("is_admin")
    .eq("id", userId)
    .maybeSingle();

  return !error && perfil?.is_admin === true;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAdmin: false,
  loading: true,
  authLoading: false,
  initialized: false,

  init: async () => {
    if (get().initialized) return;

    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;

      const user = data.session?.user ?? null;
      set({ user });

      if (user) {
        const isAdmin = await fetchUserRole(user.id);
        set({ isAdmin });
      } else {
        set({ isAdmin: false });
      }

      set({ initialized: true });
    } catch (error) {
      console.error("Error en inicialización:", error);
      set({ user: null, isAdmin: false, initialized: true });
    } finally {
      set({ loading: false });
    }

    // Suscripción
    supabase.auth.onAuthStateChange(async (_event, session) => {
      const user = session?.user ?? null;
      set({ user });

      if (user) {
        const isAdmin = await fetchUserRole(user.id);
        set({ isAdmin });
      } else {
        set({ isAdmin: false });
      }
    });
  },

  signIn: async (email, password) => {
    set({ authLoading: true });
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    } finally {
      set({ authLoading: false });
    }
  },

  signUp: async (email, password) => {
    set({ authLoading: true });
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
    } finally {
      set({ authLoading: false });
    }
  },

  signOut: async () => {
    set({ authLoading: true });
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } finally {
      set({ authLoading: false });
    }
  },

  signInWithGoogle: async () => {
    set({ authLoading: true });
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "https://mindme.vercel.app/auth/callback",
        },
      });
      if (error) throw error;
    } finally {
      set({ authLoading: false });
    }
  },
}));
