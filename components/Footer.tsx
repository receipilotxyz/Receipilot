import Link from 'next/link';
import { Github, Twitter, Mail } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              {siteConfig.logoImage ? (
                <img src={siteConfig.logoImage} alt={siteConfig.name} className="h-6 w-auto mix-blend-multiply dark:mix-blend-screen translate-y-[2px]" />
              ) : (
                <svg viewBox="0 0 36 36" className="h-6 w-6 translate-y-[2px]" fill="none">
                  <rect x="2" y="2" width="32" height="32" rx="4" stroke="hsl(152 76% 42%)" strokeWidth="2.5" />
                  <line x1="2" y1="18" x2="34" y2="18" stroke="hsl(152 76% 42%)" strokeWidth="2" />
                  <line x1="18" y1="2" x2="18" y2="34" stroke="hsl(152 76% 42%)" strokeWidth="2" />
                  <line x1="6" y1="6" x2="30" y2="30" stroke="hsl(152 76% 42%)" strokeWidth="1.5" opacity="0.5" />
                  <line x1="30" y1="6" x2="6" y2="30" stroke="hsl(152 76% 42%)" strokeWidth="1.5" opacity="0.5" />
                </svg>
              )}
              <span className="font-logo text-2xl font-extrabold tracking-tight bg-gradient-to-r from-sky-600 to-blue-400 bg-clip-text text-transparent underline decoration-sky-500/40 underline-offset-[3px] decoration-[1.5px] dark:from-sky-400 dark:to-blue-300">
                receipilot
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Transform online purchase emails into cryptographically verified NFTs.
              Impossible to fake, forever on-chain.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Product</h3>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/demo', label: 'Live Demo' },
                { href: '/my-receipts', label: 'My Receipts' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-foreground/70 transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-sm text-foreground/70 transition-colors hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a href="mailto:hello@receipilot.xyz" className="text-sm text-foreground/70 transition-colors hover:text-primary">
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/receipilot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground/70 transition-colors hover:text-primary"
                >
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Connect</h3>
            <div className="flex space-x-3">
              {[
                { href: 'https://twitter.com/receipilot', icon: Twitter, label: 'Twitter' },
                { href: 'https://github.com/receipilot', icon: Github, label: 'GitHub' },
                { href: 'mailto:hello@receipilot.xyz', icon: Mail, label: 'Email' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground transition-all hover:border-primary/50 hover:text-primary"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Mobile app coming soon
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
            <p>
              {(() => {
                const text = (siteConfig.footer?.copyright || `© {year} ${siteConfig.name}. All rights reserved.`).replace('{year}', String(currentYear));
                const linkText = siteConfig.footer?.copyrightLinkText;
                const linkUrl = siteConfig.footer?.copyrightLinkUrl;
                if (linkText && linkUrl && text.includes(linkText)) {
                  const parts = text.split(linkText);
                  return <>{parts[0]}<a href={linkUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{linkText}</a>{parts[1]}</>;
                }
                return text;
              })()}
            </p>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                All systems operational
              </span>
              <span>Base · IPFS · ZK</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
