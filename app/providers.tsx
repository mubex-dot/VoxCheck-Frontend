"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Provider } from "react-redux";
import type { AppStore } from "@/lib/store";

export function Providers({ children }: { children: ReactNode }) {
  const [store, setStore] = useState<AppStore | null>(null);

  useEffect(() => {
    let active = true;

    void import("@/lib/store")
      .then(({ makeStore }) => {
        if (active) {
          setStore(makeStore());
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
    return null;
  }

  return <Provider store={store}>{children}</Provider>;
}
