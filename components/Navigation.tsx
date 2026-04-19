'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { cn } from '@/lib/utils';
import { WalletConnectButton } from './WalletConnectButton';
import { siteConfig } from '@/lib/site-config';

export function Navigation() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { isConnected } = useAccount();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/demo', label: 'Demo' },
    { href: '/my-receipts', label: 'My Receipts' },
    { href: '/privacy', label: 'Privacy' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="relative flex h-6 w-6 items-center justify-center">
            {siteConfig.logoImage ? (
              <img src={siteConfig.logoImage} alt={siteConfig.name} className="h-6 w-auto mix-blend-multiply dark:mix-blend-screen" />
            ) : (
              <svg viewBox="0 0 36 36" className="h-6 w-6" fill="none">
                <rect x="2" y="2" width="32" height="32" rx="4" stroke="hsl(152 76% 42%)" strokeWidth="2.5" />
                <line x1="2" y1="18" x2="34" y2="18" stroke="hsl(152 76% 42%)" strokeWidth="2" />
                <line x1="18" y1="2" x2="18" y2="34" stroke="hsl(152 76% 42%)" strokeWidth="2" />
                <line x1="6" y1="6" x2="30" y2="30" stroke="hsl(152 76% 42%)" strokeWidth="1.5" opacity="0.5" />
                <line x1="30" y1="6" x2="6" y2="30" stroke="hsl(152 76% 42%)" strokeWidth="1.5" opacity="0.5" />
              </svg>
            )}
          </div>
          <span className="font-logo text-2xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-emerald-300 bg-clip-text text-transparent underline decoration-primary/40 underline-offset-4 decoration-2">
            Receipilot
          </span>
        </Link>

        <div className="hidden items-center space-x-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-lg px-4 py-2 text-sm font-medium transition-all',
                pathname === link.href
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="hidden rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:block"
            aria-label="Toggle theme"
          >
            {!mounted ? (
              <div className="h-5 w-5" />
            ) : theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
          {mounted && !isConnected && (
            <div className="hidden md:block">
              <WalletConnectButton label="Connect Wallet" size="sm" />
            </div>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-border/40 md:hidden">
          <div className="container mx-auto space-y-4 px-4 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'block text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400',
                  pathname === link.href
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-muted-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
            {!isConnected && (
              <div className="pt-4">
                <WalletConnectButton label="Connect Wallet" size="lg" fullWidth />
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
