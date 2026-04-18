'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { sanityClient } from '@/sanity/lib/client';

interface Partner {
  _id: string;
  name: string;
  logo: {
    asset: {
      url: string;
    };
  };
  isComingSoon: boolean;
}

export function PartnersCarousel() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPartners() {
      const isLocalPreview =
        typeof window !== 'undefined' && ['localhost', '127.0.0.1'].includes(window.location.hostname);

      if (isLocalPreview) {
        setPartners(getDefaultPartners());
        setIsLoading(false);
        return;
      }

      try {
        const data = await sanityClient.fetch<Partner[]>(
          `*[_type == "partner"] | order(order asc) {
            _id,
            name,
            logo {
              asset-> {
                url
              }
            },
            isComingSoon
          }`
        );
        setPartners(data);
      } catch {
        setPartners(getDefaultPartners());
      } finally {
        setIsLoading(false);
      }
    }

    fetchPartners();
  }, []);

  function getDefaultPartners(): Partner[] {
    return [
      {
        _id: '1',
        name: 'Amazon',
        logo: { asset: { url: '/partners/amazon.svg' } },
        isComingSoon: false,
      },
      {
        _id: '2',
        name: 'eBay',
        logo: { asset: { url: '/partners/ebay.svg' } },
        isComingSoon: false,
      },
      {
        _id: '3',
        name: 'Nike',
        logo: { asset: { url: '/partners/nike.svg' } },
        isComingSoon: false,
      },
      {
        _id: '4',
        name: 'Adidas',
        logo: { asset: { url: '/partners/adidas.svg' } },
        isComingSoon: false,
      },
      {
        _id: '5',
        name: 'Steam',
        logo: { asset: { url: '/partners/steam.svg' } },
        isComingSoon: false,
      },
      {
        _id: '6',
        name: 'Apple',
        logo: { asset: { url: '/partners/apple.svg' } },
        isComingSoon: false,
      },
      {
        _id: '7',
        name: 'Best Buy',
        logo: { asset: { url: '/partners/bestbuy.svg' } },
        isComingSoon: true,
      },
      {
        _id: '8',
        name: 'Target',
        logo: { asset: { url: '/partners/target.svg' } },
        isComingSoon: true,
      },
      {
        _id: '9',
        name: 'Walmart',
        logo: { asset: { url: '/partners/walmart.svg' } },
        isComingSoon: true,
      },
      {
        _id: '10',
        name: 'More Coming',
        logo: { asset: { url: '/partners/placeholder.svg' } },
        isComingSoon: true,
      },
    ];
  }

  if (isLoading) {
    return (
      <section className="container mx-auto px-4 py-20">
        <div className="text-center">
          <div className="mx-auto h-8 w-48 animate-pulse rounded-lg bg-muted" />
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-5xl">
          Trusted by <span className="gradient-text">Leading Brands</span>
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          We&rsquo;re partnering with major e-commerce platforms to bring verified receipts to
          everyone
        </p>
      </div>

      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-8"
          animate={{
            x: ['0%', '-50%'],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={`${partner._id}-${index}`}
              className="glass-effect relative flex h-24 w-40 flex-shrink-0 items-center justify-center rounded-xl p-4"
            >
              {partner.isComingSoon && (
                <div className="absolute right-2 top-2 rounded-full bg-violet-100 px-2 py-0.5 text-xs font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
                  Soon
                </div>
              )}
              <div className="flex h-full w-full items-center justify-center text-center">
                <span className="text-sm font-semibold text-muted-foreground">{partner.name}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Preliminary agreements in motion with major e-commerce giants. More partners
        announced soon.
      </p>

      <div className="mt-6 text-center">
        <Link
          href="/"
          className="text-sm font-medium text-violet-400 transition-colors hover:text-violet-300"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
