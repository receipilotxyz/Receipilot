'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface WalletConnectButtonProps {
  label?: string;
  hideWhenConnected?: boolean;
  fullWidth?: boolean;
  size?: 'default' | 'sm' | 'lg' | 'xl';
  className?: string;
}

export function WalletConnectButton({
  label = 'Connect Wallet',
  hideWhenConnected = false,
  fullWidth = false,
  size = 'lg',
  className,
}: WalletConnectButtonProps) {
  return (
    <ConnectButton.Custom>
      {({ account, chain, mounted, openAccountModal, openChainModal, openConnectModal }) => {
        const ready = mounted;
        const connected = ready && !!account && !!chain;

        if (!ready) {
          return (
            <Button
              type="button"
              variant="outline"
              size={size}
              className={cn(fullWidth && 'w-full', 'opacity-0 pointer-events-none', className)}
              aria-hidden
            >
              {label}
            </Button>
          );
        }

        if (connected && hideWhenConnected) {
          return null;
        }

        if (connected && chain?.unsupported) {
          return (
            <Button
              type="button"
              variant="outline"
              size={size}
              className={cn(fullWidth && 'w-full', className)}
              onClick={openChainModal}
            >
              Wrong network
            </Button>
          );
        }

        if (connected) {
          return (
            <Button
              type="button"
              variant="outline"
              size={size}
              className={cn(fullWidth && 'w-full', className)}
              onClick={openAccountModal}
            >
              {account.displayName}
            </Button>
          );
        }

        return (
          <Button
            type="button"
            variant="outline"
            size={size}
            className={cn(fullWidth && 'w-full', className)}
            onClick={openConnectModal}
          >
            {label}
          </Button>
        );
      }}
    </ConnectButton.Custom>
  );
}
