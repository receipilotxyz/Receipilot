'use client';

import { motion } from 'framer-motion';
import { siteConfig } from '@/lib/site-config';

export function PartnersCarousel() {
  const { heading, headingHighlight, subheading, note, brands } = siteConfig.partners;

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-5xl">
          {heading} <span className="text-primary">{headingHighlight}</span>
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{subheading}</p>
      </div>

      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-8"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          {[...brands, ...brands].map((brand, index) => (
            <div
              key={`${brand.id}-${index}`}
              className="clean-card relative flex h-24 w-40 flex-shrink-0 items-center justify-center rounded-xl p-4"
            >
              {brand.isComingSoon && (
                <div className="absolute right-2 top-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  Soon
                </div>
              )}
              <div className="flex h-full w-full items-center justify-center text-center">
                {brand.logo ? (
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-10 w-auto max-w-full object-contain"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'block';
                    }}
                  />
                ) : null}
                <span
                  className="text-sm font-semibold text-muted-foreground"
                  style={{ display: brand.logo ? 'none' : 'block' }}
                >
                  {brand.name}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {note && (
        <p className="mt-8 text-center text-sm text-muted-foreground">{note}</p>
      )}
    </section>
  );
}
