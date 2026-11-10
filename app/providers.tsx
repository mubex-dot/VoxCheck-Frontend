"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Provider } from "react-redux";
import type { AppStore } from "@/lib/store";
import { initializeAuth } from "@/lib/features/auth/authSlice";

export function Providers({ children }: { children: ReactNode }) {
  const [store, setStore] = useState<AppStore | null>(null);

  useEffect(() => {
    let active = true;

    void import("@/lib/store")
      .then(({ makeStore }) => {
        if (active) {
          const newStore = makeStore();
          // Hydrate tokens from localStorage BEFORE rendering children.
          // This ensures AuthGuard sees the correct state on first render.
          newStore.dispatch(initializeAuth());
          setStore(newStore);
        }
      })
      .catch((error: unknown) => {
        console.error("Failed to initialize the Redux store", error);
      });

    return () => {
      active = false;
    };
  }, []);

  if (!store) {
    // Returning null here prevents any flash of unauthenticated UI.
    // AuthGuard will never see `isHydrated: false` — it'll only render
    // once the store is fully ready.
    return null;
  }

  return <Provider store={store}>{children}</Provider>;
}
