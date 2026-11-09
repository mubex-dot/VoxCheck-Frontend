import { Sidebar } from "./_components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-paper text-ink">
      <Sidebar />
      <main className="flex-1 ml-65 flex flex-col min-h-screen">
        <div className="flex-1 p-8 pb-4 max-w-350 w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
