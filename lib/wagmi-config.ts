import { createConfig, http } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { base, baseSepolia } from 'wagmi/chains';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';

const rawProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID?.trim();
const projectId =
  rawProjectId && !rawProjectId.toLowerCase().includes('your_walletconnect_project_id')
    ? rawProjectId
    : undefined;
const baseRpcUrl = process.env.NEXT_PUBLIC_BASE_RPC_URL?.trim() || 'https://mainnet.base.org';
const sepoliaRpcUrl = process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL?.trim() || 'https://sepolia.base.org';

export const isWalletConnectEnabled = Boolean(projectId);

export const config = projectId
  ? getDefaultConfig({
      appName: 'Receipilot',
      projectId,
      chains: [base, baseSepolia],
      ssr: true,
      transports: {
        [base.id]: http(baseRpcUrl),
        [baseSepolia.id]: http(sepoliaRpcUrl),
      },
    })
  : createConfig({
      chains: [base, baseSepolia],
      connectors: [injected()],
      ssr: true,
      transports: {
        [base.id]: http(baseRpcUrl),
        [baseSepolia.id]: http(sepoliaRpcUrl),
      },
    });
