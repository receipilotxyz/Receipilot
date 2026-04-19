import type { Metadata } from 'next';
import { Bricolage_Grotesque } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from '@/components/ui/toaster';
import { SiteLayout } from '@/components/SiteLayout';

const heroLight = localFont({
  src: [
    {
      path: '../components/ui/HeroLight-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../components/ui/HeroLight-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../components/ui/HeroLight-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-hero',
  display: 'swap',
});

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
  weight: ['400', '600', '700', '800'],
});


export const metadata: Metadata = {
  title: 'Receipilot - Turn Receipts into Verified NFTs',
  description:
    'Turn any online purchase email into a beautiful, cryptographically verified NFT in seconds. Impossible to fake. Powered by vlayer ZK technology.',
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${heroLight.variable} ${bricolage.variable} font-sans antialiased`}>
        <Providers>
          <SiteLayout>{children}</SiteLayout>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
