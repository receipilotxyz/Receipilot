import { http } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID?.trim() || 'local-dev-walletconnect';

if (!process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID?.trim()) {
  console.warn(
    'WalletConnect Project ID not found. Using a local development fallback; wallet features may be limited.'
  );
}

export const config = getDefaultConfig({
  appName: 'Receipilot',
  projectId,
  chains: [base, baseSepolia],
  ssr: true,
  transports: {
    [base.id]: http(process.env.NEXT_PUBLIC_BASE_RPC_URL),
    [baseSepolia.id]: http(process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL),
  },
});
