'use client';

import { Button } from './ui/button';
import { WalletConnectButton } from './WalletConnectButton';
import { FundingBanner } from './FundingBanner';
import { useAccount } from 'wagmi';
import { ArrowRight } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export function Hero() {
  const { isConnected } = useAccount();

  return (
    <section className="relative overflow-hidden py-16 md:py-24 lg:py-28">

      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Text Block */}
          <div className="flex flex-col items-center text-center">
            {/* Small label */}
            <div className="mb-6 inline-flex items-center rounded-full border border-border bg-muted px-4 py-2 text-sm font-medium text-muted-foreground">
              {siteConfig.hero.badge}
            </div>

            {/* Headline - reduced 25% from previous */}
            <h1 className="mb-5 text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
              {siteConfig.hero.headlineStart}{' '}
              <span className="text-primary">{siteConfig.hero.headlineHighlight}</span>
            </h1>

            {/* Subheadline */}
            <p className="mb-8 max-w-lg text-base text-muted-foreground sm:text-lg">
              {siteConfig.hero.subheadline}
            </p>

            {/* Feature Pills */}
            <div className="mb-8 flex flex-wrap justify-center gap-3">
              {siteConfig.hero.pills.map((text) => (
                <div
                  key={text}
                  className="rounded-full border border-border bg-muted px-3 py-1.5 text-sm font-medium text-foreground"
                >
                  {text}
                </div>
              ))}
            </div>

            {/* NFT Image — visible on mobile only, hidden on lg where it's in the right column */}
            <div className="mb-8 flex justify-center lg:hidden">
              <div className="nft-aura">
                <div
                  role="presentation"
                  aria-hidden="true"
                  className="w-64 sm:w-72 drop-shadow-2xl"
                  style={{
                    backgroundImage: `url(${siteConfig.receiptImage})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    aspectRatio: '4/5',
                    WebkitUserSelect: 'none',
                    userSelect: 'none',
                    pointerEvents: 'none',
                  }}
                />
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {!isConnected && <WalletConnectButton label="Connect Wallet" size="lg" />}
              <Button size="lg" variant="outline" asChild>
                <a href="/demo">Try Live Demo</a>
              </Button>
              {isConnected && (
                <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                  <a href="#upload">
                    Start Minting
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>

            {/* Stats */}
            <div className="mt-10 flex flex-wrap justify-center gap-8 sm:gap-12">
              {siteConfig.hero.stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl font-bold text-foreground md:text-3xl">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Wallet-connected grant notification */}
            <div className="mt-8 w-full max-w-lg">
              <FundingBanner />
            </div>
          </div>

          {/* Right: Receipt Card Image — protected: not an img element */}
          <div className="relative hidden lg:flex items-center justify-center">
            <div className="nft-aura">
              <div
                role="presentation"
                aria-hidden="true"
                className="w-full max-w-sm drop-shadow-2xl"
                style={{
                  backgroundImage: `url(${siteConfig.receiptImage})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  aspectRatio: '4/5',
                  WebkitUserSelect: 'none',
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
