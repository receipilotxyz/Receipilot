'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { WalletConnectButton } from './WalletConnectButton';
import { useAccount } from 'wagmi';
import { ArrowRight } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export function CTASection() {
  const { isConnected } = useAccount();

  return (
    <section className="container mx-auto px-4 py-24">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-12 text-center md:p-16">
        {/* Dot Grid Background */}
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-50" />
        
        <div className="relative z-10">
          <div className="mb-6 inline-flex items-center rounded-full border border-border bg-muted px-4 py-2 text-sm font-medium text-muted-foreground">
            {siteConfig.cta.badge}
          </div>
          
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            {siteConfig.cta.title.split(' ').slice(0, -1).join(' ')}{' '}
            <span className="text-primary">{siteConfig.cta.title.split(' ').slice(-1)}</span>
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground">
            {siteConfig.cta.subtitle}
          </p>
          
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            {isConnected ? (
              <Button size="xl" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <a href="#upload">
                  Mint Your First Receipt
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
            ) : (
              <WalletConnectButton label="Connect Wallet" size="xl" />
            )}
            <Button size="xl" variant="outline" asChild>
              <Link href="/demo">Try Live Demo</Link>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            {siteConfig.cta.perks.map((perk, i) => (
              <span key={i} className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                {perk}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
