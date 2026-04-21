'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { 
  Mail, 
  Shield, 
  CheckCircle2, 
  Wallet,
  ArrowRight,
  Copy,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useToast } from './ui/use-toast';
import { siteConfig } from '@/lib/site-config';

type DemoStep = 'idle' | 'verifying' | 'generating' | 'minting' | 'complete';

const MOCK_RECEIPT = siteConfig.demo;

const MOCK_NFT = {
  tokenId: '#4892',
  txHash: '0x7f9a...8d4e',
  contractAddress: '0x1234...5678',
  network: 'Base',
  timestamp: new Date().toISOString(),
};

export function Demo() {
  const [step, setStep] = useState<DemoStep>('idle');
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    if (step === 'verifying') {
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            setStep('generating');
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(timer);
    }
    
    if (step === 'generating') {
      setProgress(0);
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            setStep('minting');
            return 100;
          }
          return prev + 3;
        });
      }, 40);
      return () => clearInterval(timer);
    }

    if (step === 'minting') {
      setProgress(0);
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            setStep('complete');
            return 100;
          }
          return prev + 4;
        });
      }, 30);
      return () => clearInterval(timer);
    }

    return undefined;
  }, [step]);

  const handleStart = () => {
    setStep('verifying');
    setProgress(0);
  };

  const handleReset = () => {
    setStep('idle');
    setProgress(0);
    toast({
      title: 'Demo Reset',
      description: 'Ready for another demonstration',
    });
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: 'Address copied to clipboard',
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left: Email Preview */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="nft-card p-6"
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Mail className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">Receipt Email</h3>
              <p className="text-sm text-muted-foreground">Source Document</p>
            </div>
          </div>

          <div className="space-y-4 rounded-xl border border-border bg-muted/50 p-4">
            <div className="border-b border-border pb-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">From:</span>
                <span className="text-primary">noreply@{MOCK_RECEIPT.merchant.toLowerCase().replace(/\s/g, '')}.com</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subject:</span>
                <span>Your {MOCK_RECEIPT.merchant} Receipt</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order ID</span>
                <span className="font-mono text-sm">{MOCK_RECEIPT.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Product</span>
                <span className="text-sm">{MOCK_RECEIPT.product}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span className="text-sm">{MOCK_RECEIPT.date}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-3">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-green-400">{MOCK_RECEIPT.total}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-green-500/10 p-3 text-xs text-green-400">
              <Shield className="h-4 w-4" />
              DKIM Signature: Valid
            </div>
          </div>
        </motion.div>

        {/* Right: NFT Preview / Process */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="nft-card relative overflow-hidden p-6"
        >
          <AnimatePresence mode="wait">
            {step === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-full flex-col items-center justify-center py-12 text-center"
              >
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-muted">
                  <ArrowRight className="h-10 w-10 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Ready to Mint</h3>
                <p className="mb-6 max-w-xs text-sm text-muted-foreground">
                  Click below to simulate the complete NFT minting process
                </p>
                <Button onClick={handleStart} size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                  Start Demo
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            )}

            {(step === 'verifying' || step === 'generating' || step === 'minting') && (
              <motion.div
                key="processing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex h-full flex-col items-center justify-center py-8"
              >
                <div className="mb-8 relative">
                  <svg className="h-32 w-32 -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="hsl(152 76% 42% / 0.2)"
                      strokeWidth="6"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={`${progress * 2.83} 283`}
                      className="transition-all duration-100"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#1db870" />
                        <stop offset="100%" stopColor="#0d9488" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">{Math.round(progress)}%</span>
                  </div>
                </div>

                <div className="space-y-3 text-center">
                  <h3 className="text-xl font-bold">
                    {step === 'verifying' && 'Verifying Email...'}
                    {step === 'generating' && 'Generating ZK Proof...'}
                    {step === 'minting' && 'Minting NFT...'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step === 'verifying' && 'Checking DKIM signature authenticity'}
                    {step === 'generating' && 'Creating cryptographic proof via vlayer'}
                    {step === 'minting' && 'Writing to Base blockchain'}
                  </p>
                </div>

                {/* Step indicators */}
                <div className="mt-8 flex items-center gap-2">
                  {['verifying', 'generating', 'minting'].map((s, i) => (
                    <div
                      key={s}
                      className={`h-2 w-8 rounded-full transition-all ${
                        step === s
                          ? 'bg-primary animate-pulse'
                          : ['verifying', 'generating', 'minting'].indexOf(step) > i
                          ? 'bg-primary'
                          : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {step === 'complete' && (
              <motion.div
                key="complete"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6"
              >
                {/* Receipt Card — protected: not an img element, can't be right-clicked/saved/dragged */}
                <div className="mb-6 flex justify-center">
                  <div
                    role="presentation"
                    aria-hidden="true"
                    className="w-full max-w-xs drop-shadow-xl"
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

                {/* NFT Details */}
                <div className="mb-6 space-y-3 rounded-xl border border-border bg-muted/50 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Token ID</span>
                    <span className="font-mono font-bold text-foreground">{MOCK_NFT.tokenId}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Network</span>
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-blue-500" />
                      {MOCK_NFT.network}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Transaction</span>
                    <button
                      onClick={() => handleCopy('0x7f9a3b2c1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a')}
                      className="flex items-center gap-1 font-mono text-sm text-primary hover:text-primary/80"
                    >
                      {MOCK_NFT.txHash}
                      <Copy className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button onClick={handleReset} variant="outline" className="flex-1 gap-2">
                    <RotateCcw className="h-4 w-4" />
                    Try Again
                  </Button>
                  <Button variant="gradient" className="flex-1 gap-2" asChild>
                    <Link href="/">
                      Connect Wallet
                      <Wallet className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                <p className="mt-4 text-center text-xs text-muted-foreground">
                  This was a demo. Connect your wallet to mint real NFTs.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Bottom Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 grid gap-4 md:grid-cols-3"
      >
        {[
          {
            icon: Shield,
            title: 'DKIM Verified',
            desc: 'Cryptographic email authentication',
          },
          {
            icon: Sparkles,
            title: 'ZK Proof',
            desc: 'Zero-knowledge privacy protection',
          },
          {
            icon: Wallet,
            title: 'On-Chain NFT',
            desc: 'Permanent blockchain record',
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <item.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold">{item.title}</h4>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
