import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from '@/components/ui/toaster';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';


export const metadata: Metadata = {
  title: 'Receipilot - Turn Receipts into Verified NFTs',
  description:
    'Turn any online purchase email into a beautiful, cryptographically verified NFT in seconds — impossible to fake. Powered by vlayer ZK technology.',
  keywords: [
    'NFT',
    'receipt',
    'blockchain',
    'verification',
    'vlayer',
    'ZK proof',
    'Web3',
    'Base',
    'cryptographic proof',
  ],
  authors: [{ name: 'Receipilot Team' }],
  openGraph: {
    title: 'Receipilot - Turn Receipts into Verified NFTs',
    description:
      'Turn any online purchase email into a beautiful, cryptographically verified NFT in seconds.',
    type: 'website',
    url: 'https://receipilot.xyz',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Receipilot - Turn Receipts into Verified NFTs',
    description:
      'Turn any online purchase email into a beautiful, cryptographically verified NFT in seconds.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className="font-sans antialiased">
        <Providers>
          <div className="flex min-h-screen flex-col bg-background">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
