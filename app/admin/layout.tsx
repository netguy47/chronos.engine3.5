import type { ReactNode } from 'react';

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#0C172E] text-[#D2D6DC]">
      <aside className="hidden lg:flex w-64 flex-shrink-0 flex-col border-r border-[#1F2E4A] p-6 gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#8A94A6]">Chronos Engine</p>
          <p className="text-lg font-semibold">Admin Area</p>
        </div>
        <div className="space-y-2 text-sm text-[#8A94A6]">
          <p>Use this space to add navigation or status widgets as the admin tools come online.</p>
          <p className="text-[#D2D6DC]">The layout is ready — just drop in your real components later.</p>
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="border-b border-[#1F2E4A] px-6 py-4">
          <h1 className="text-xl font-semibold text-[#D2D6DC]">Admin Console</h1>
          <p className="text-sm text-[#8A94A6]">
            Secure workspace for reviewer/admin-only tools.
          </p>
        </header>
        <section className="flex-1 p-6 overflow-auto bg-[#0F1B34]">
          {children}
        </section>
      </main>
    </div>
  );
}
