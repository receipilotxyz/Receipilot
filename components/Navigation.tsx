'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useTheme } from 'next-themes';
import { Moon, Sun, Menu, X, Receipt } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { isWalletConnectEnabled } from '@/lib/wagmi-config';

export function Navigation() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
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
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600">
            <Receipt className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            Recei<span className="gradient-text">pilot</span>
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
                  ? 'bg-violet-500/10 text-violet-400'
                  : 'text-muted-foreground hover:bg-white/5 hover:text-white'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="hidden rounded-lg p-2 text-muted-foreground transition-colors hover:bg-white/5 hover:text-white md:block"
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
          <div className="hidden md:block [&>*]:!rounded-lg">
            {mounted && isWalletConnectEnabled ? (
              <ConnectButton />
            ) : (
              <button
                className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-black opacity-80"
                type="button"
              >
                Connect Wallet
              </button>
            )}
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-muted-foreground hover:bg-white/5 md:hidden"
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
            <div className="pt-4">
              {isWalletConnectEnabled ? (
                <ConnectButton />
              ) : (
                <button
                  className="w-full rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-black opacity-80"
                  type="button"
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
