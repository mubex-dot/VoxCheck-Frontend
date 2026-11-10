"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { accessToken, isHydrated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isHydrated && !accessToken) {
      router.replace("/login");
    }
  }, [isHydrated, accessToken, router]);

  // TODO: Show nothing (or a loading spinner) while checking auth or redirecting
  if (!isHydrated || !accessToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper">
        <div className="animate-skeleton w-8 h-8 rounded-full bg-surface-sunken" />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;
