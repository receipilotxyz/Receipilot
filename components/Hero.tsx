'use client';

import { Button } from './ui/button';
import { WalletConnectButton } from './WalletConnectButton';
import { useAccount } from 'wagmi';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  const { isConnected } = useAccount();

  return (
    <section className="relative overflow-hidden py-16 md:py-24 lg:py-28">
      {/* Dot Grid Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 dot-grid" />

      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Text Block */}
          <div className="flex flex-col items-center text-center">
            {/* Small label */}
            <div className="mb-6 inline-flex items-center rounded-full border border-border bg-muted px-4 py-2 text-sm font-medium text-muted-foreground">
              Powered by vlayer ZK Technology
            </div>

            {/* Headline - reduced 25% from previous */}
            <h1 className="mb-5 text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
              Turn Receipts into{' '}
              <span className="text-primary">Verified NFTs</span>
            </h1>

            {/* Subheadline */}
            <p className="mb-8 max-w-lg text-base text-muted-foreground sm:text-lg">
              Transform any online purchase email into a cryptographically verified NFT
              in seconds. Impossible to fake, forever on-chain.
            </p>

            {/* Feature Pills */}
            <div className="mb-10 flex flex-wrap justify-center gap-3">
              {['DKIM Verified', 'Instant Mint', 'On-Chain Forever'].map((text) => (
                <div
                  key={text}
                  className="rounded-full border border-border bg-muted px-4 py-2 text-sm font-medium text-foreground"
                >
                  {text}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              {!isConnected && <WalletConnectButton label="Connect Wallet" size="xl" />}
              <Button size="xl" variant="outline" asChild>
                <a href="/demo">Try Live Demo</a>
              </Button>
              {isConnected && (
                <Button size="xl" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                  <a href="#upload">
                    Start Minting
                    <ArrowRight className="h-5 w-5" />
                  </a>
                </Button>
              )}
            </div>

            {/* Stats */}
            <div className="mt-12 flex flex-wrap justify-center gap-8 sm:gap-12">
              {[
                { value: '2 Free', label: 'mints per week' },
                { value: '100%', label: 'verified' },
                { value: '$0', label: 'gas fees' },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl font-bold text-foreground md:text-3xl">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Receipt Card Image */}
          <div className="relative hidden lg:flex items-center justify-center">
            <img
              src="/receipt-card.png"
              alt="Receipt Minted - Verified by vLayer"
              className="w-full max-w-sm drop-shadow-xl"
              style={{ background: 'transparent' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
