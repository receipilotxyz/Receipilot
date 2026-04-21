'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { X, Sparkles } from 'lucide-react';

export function FundingBanner() {
  const { isConnected } = useAccount();
  const [dismissed, setDismissed] = useState(false);

  if (!isConnected || dismissed) return null;

  return (
    <div className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 rounded-xl w-full py-3 px-5 text-center text-sm shadow-sm">
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <Sparkles className="h-4 w-4 text-primary shrink-0" />
        <span className="text-foreground">
          <strong>You&apos;re one of our earliest users.</strong>{' '}
          <span className="text-muted-foreground">Receipilot is building open, verifiable proof-of-purchase infrastructure — and we&apos;re actively seeking grant support to scale it globally.</span>
        </span>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        aria-label="Dismiss"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
