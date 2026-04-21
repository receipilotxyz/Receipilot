import type { Metadata } from 'next';
import { Bricolage_Grotesque, Inter, Space_Grotesk } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from '@/components/ui/toaster';
import { SiteLayout } from '@/components/SiteLayout';
import { FontLoader } from '@/components/FontLoader';
import { siteConfig } from '@/lib/site-config';

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

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
  weight: ['400', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
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

function buildServerFontHead(
  bodyFont: { type: string; family: string; url: string },
  logoFont: { type: string; family: string; url: string },
) {
  const styles: string[] = [];
  const googleLinks: string[] = [];

  if (bodyFont.type === 'upload' && bodyFont.url) {
    styles.push(`@font-face{font-family:'CustomBodyFont';src:url('${bodyFont.url}');font-display:block;}`);
    styles.push(`:root{--font-body-dynamic:'CustomBodyFont',system-ui,sans-serif;}`);
  } else if (bodyFont.type === 'google' && bodyFont.family) {
    const enc = bodyFont.family.replace(/ /g, '+');
    googleLinks.push(`https://fonts.googleapis.com/css2?family=${enc}:wght@300;400;500;600;700;800&display=block`);
    styles.push(`:root{--font-body-dynamic:'${bodyFont.family}',system-ui,sans-serif;}`);
  }

  if (logoFont.type === 'upload' && logoFont.url) {
    styles.push(`@font-face{font-family:'CustomLogoFont';src:url('${logoFont.url}');font-display:block;}`);
    styles.push(`:root{--font-logo-dynamic:'CustomLogoFont',system-ui,sans-serif;}`);
  } else if (logoFont.type === 'google' && logoFont.family) {
    const enc = logoFont.family.replace(/ /g, '+');
    googleLinks.push(`https://fonts.googleapis.com/css2?family=${enc}:wght@300;400;500;600;700;800&display=block`);
    styles.push(`:root{--font-logo-dynamic:'${logoFont.family}',system-ui,sans-serif;}`);
  }

  return { cssText: styles.join(''), googleLinks };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { cssText, googleLinks } = buildServerFontHead(
    siteConfig.fonts.bodyFont,
    siteConfig.fonts.logoFont,
  );

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {googleLinks.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
        {cssText && <style dangerouslySetInnerHTML={{ __html: cssText }} />}
      </head>
      <body className={`${heroLight.variable} ${bricolage.variable} ${spaceGrotesk.variable} ${inter.variable} font-sans antialiased`}>
        <FontLoader logoFont={siteConfig.fonts.logoFont} bodyFont={siteConfig.fonts.bodyFont} />
        <Providers>
          <SiteLayout>{children}</SiteLayout>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
