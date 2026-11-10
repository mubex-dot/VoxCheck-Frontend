"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";

export default function AuthRedirect({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { accessToken, isHydrated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isHydrated && accessToken) {
      router.replace("/");
    }
  }, [isHydrated, accessToken, router]);

  if (isHydrated && accessToken) return null;

  return <>{children}</>;
}
