import { Providers } from "../providers";

export const instant = false;

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-paper flex flex-col items-center justify-center p-4">
      <Providers>{children}</Providers>
    </div>
  );
}
