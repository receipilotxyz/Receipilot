'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const STEPS: Step[] = [
  { label: 'Parsing email headers', duration: 15 },
  { label: 'Extracting receipt data', duration: 20 },
  { label: 'Verifying DKIM signature', duration: 25 },
  { label: 'Generating zero-knowledge proof', duration: 30 },
  { label: 'Preparing NFT metadata', duration: 15 },
  { label: 'Uploading to IPFS', duration: 20 },
  { label: 'Minting on Base blockchain', duration: 25 },
  { label: 'Finalizing transaction', duration: 10 },
];

interface ProofAnimationProps {
  isOpen: boolean;
  onComplete: () => void;
  emailSource: string;
}

interface Step {
  label: string;
  duration: number;
}

export function ProofAnimation({
  isOpen,
  onComplete,
  emailSource: _emailSource,
}: ProofAnimationProps) {
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    if (!isOpen) {
      if (progress !== 0) setProgress(0);
      if (currentStepIndex !== 0) setCurrentStepIndex(0);
      if (completedSteps.length > 0) setCompletedSteps([]);
      return;
    }

    const totalDuration = 8000; // 8 seconds total
    const interval = 20; // Update every 20ms
    const increment = (100 / totalDuration) * interval;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = Math.min(prev + increment, 100);
        
        // Calculate current step based on progress
        const _cumulativeDuration = STEPS.reduce((acc, step, idx) => {
          if (idx < currentStepIndex) return acc + step.duration;
          return acc;
        }, 0);
        
        const totalStepsDuration = STEPS.reduce((acc, step) => acc + step.duration, 0);
        const progressInSteps = (newProgress / 100) * totalStepsDuration;
        
        let stepIndex = 0;
        let cumulative = 0;
        for (let i = 0; i < STEPS.length; i++) {
          cumulative += STEPS[i].duration;
          if (progressInSteps <= cumulative) {
            stepIndex = i;
            break;
          }
        }
        
        if (stepIndex > currentStepIndex) {
          setCurrentStepIndex(stepIndex);
          setCompletedSteps(prev => [...prev, currentStepIndex]);
        }

        if (newProgress >= 100) {
          setTimeout(() => {
            onComplete();
          }, 500);
        }

        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isOpen, currentStepIndex, onComplete]);

  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-2xl border-none bg-black/95 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Generating Cryptographic Proof
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center py-12">
          {/* Circular Progress */}
          <div className="relative mb-12">
            <svg className="h-64 w-64 -rotate-90 transform">
              {/* Background circle */}
              <circle
                cx="128"
                cy="128"
                r={radius}
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="8"
                fill="none"
              />
              {/* Progress circle */}
              <motion.circle
                cx="128"
                cy="128"
                r={radius}
                stroke="url(#gradient)"
                strokeWidth="8"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(0, 240, 255, 0.6))',
                }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1db870" />
                  <stop offset="50%" stopColor="#0d9488" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>

            {/* Center percentage */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <div className="mb-2 text-6xl font-bold text-primary">
                  {Math.round(progress)}%
                </div>
                <div className="text-sm text-muted-foreground">
                  {progress < 100 ? 'Processing...' : 'Complete!'}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Steps */}
          <div className="w-full max-w-md space-y-3">
            <AnimatePresence>
              {STEPS.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: index <= currentStepIndex ? 1 : 0.3,
                    x: 0,
                  }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`flex items-center gap-3 rounded-lg p-3 ${
                    index === currentStepIndex
                      ? 'bg-blue-500/10 border border-blue-500/30'
                      : completedSteps.includes(index)
                      ? 'bg-green-500/10 border border-green-500/30'
                      : 'bg-white/5'
                  }`}
                >
                  <div
                    className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${
                      completedSteps.includes(index)
                        ? 'bg-green-500'
                        : index === currentStepIndex
                        ? 'bg-blue-500'
                        : 'bg-white/10'
                    }`}
                  >
                    {completedSteps.includes(index) ? (
                      <Check className="h-4 w-4 text-white" />
                    ) : (
                      <span className="text-xs font-bold text-white">
                        {index + 1}
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-sm ${
                      index === currentStepIndex
                        ? 'text-blue-500 font-semibold'
                        : completedSteps.includes(index)
                        ? 'text-green-500'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {step.label}
                  </span>
                  {index === currentStepIndex && (
                    <motion.div
                      className="ml-auto"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <div className="h-4 w-4 rounded-full border-2 border-blue-500 border-t-transparent" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <motion.p
            className="mt-8 text-center text-sm text-muted-foreground"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Powered by vlayer ZK technology
          </motion.p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
