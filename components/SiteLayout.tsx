'use client';

import { usePathname } from 'next/navigation';
import { Navigation } from './Navigation';
import { Footer } from './Footer';

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname === '/bodda' || pathname.startsWith('/bodda/');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
