'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { ThemeProvider } from 'next-themes';
import { config, isWalletConnectEnabled } from '@/lib/wagmi-config';
import '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          {isWalletConnectEnabled ? (
            <RainbowKitProvider
              theme={darkTheme({
                accentColor: '#00f0ff',
                accentColorForeground: 'black',
                borderRadius: 'medium',
              })}
            >
              {children}
            </RainbowKitProvider>
          ) : (
            children
          )}
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
}
