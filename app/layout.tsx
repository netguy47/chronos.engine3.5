import './globals.css';

export const metadata = {
  title: 'Chronos Engine 3.5',
  description: 'Scenario Simulator and Cinematic Generator',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="bg-slate-950 text-slate-50">{children}</body>
    </html>
  );
}
