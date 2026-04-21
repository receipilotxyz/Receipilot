'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

export function FundingBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative bg-primary/10 border-b border-primary/20 py-2 px-4 text-center text-sm">
      <span className="font-medium text-foreground">We&apos;re in our early funding phase — </span>
      <span className="text-muted-foreground">Receipilot is and will always remain </span>
      <strong className="text-primary">completely free</strong>
      <span className="text-muted-foreground"> for users. </span>
      <a href="#upload" className="text-primary underline underline-offset-2 hover:text-primary/80">
        Mint your first receipt →
      </a>
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
