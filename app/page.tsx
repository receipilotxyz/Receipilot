import { Hero } from '@/components/Hero';
import { PartnersCarousel } from '@/components/PartnersCarousel';
import { UploadFlow } from '@/components/UploadFlow';
import { FAQ } from '@/components/FAQ';
import { CTASection } from '@/components/CTASection';
import { siteConfig } from '@/lib/site-config';

export default function Home() {
  return (
    <div className="relative overflow-hidden dot-grid">
      <Hero />
      
      <section id="upload" className="container mx-auto px-4 py-20">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            {siteConfig.howItWorks.title.split(' ').slice(0, -1).join(' ')}{' '}
            <span className="text-primary">{siteConfig.howItWorks.title.split(' ').slice(-1)}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {siteConfig.howItWorks.subtitle}
          </p>
        </div>
        <UploadFlow />
      </section>

      <PartnersCarousel />

      <section className="container mx-auto px-4 py-20">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            Why <span className="text-primary">{siteConfig.name}</span>?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {siteConfig.whySection.subtitle}
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {siteConfig.features.map((feature, index) => (
            <div
              key={index}
              className="clean-card card-hover p-8"
            >
              <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <FAQ />
      <CTASection />
    </div>
  );
}
