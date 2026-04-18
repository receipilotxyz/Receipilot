'use client';

import { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { sanityClient } from '@/sanity/lib/client';
import { HelpCircle } from 'lucide-react';

interface FAQItem {
  _id: string;
  question: string;
  answer: string;
}

const defaultFAQs: FAQItem[] = [
  {
    _id: '1',
    question: 'How is this different from just taking a screenshot?',
    answer:
      'Screenshots can be easily faked using Photoshop or inspect element. Our NFTs are cryptographically verified using vlayer\'s ZK Email technology with DKIM signatures, making them mathematically impossible to forge. The blockchain proves the email came from the actual store.',
  },
  {
    _id: '2',
    question: 'What can I do with these receipt NFTs?',
    answer:
      'Receipt NFTs serve as permanent proof of purchase that can appreciate in value. Use them for warranty claims, prove authenticity when reselling items, or hold them as collectibles. When products become discontinued or rise in price, your verified receipt becomes valuable proof.',
  },
  {
    _id: '3',
    question: 'Is my email data safe?',
    answer:
      'Absolutely. We never store your full email content. When you forward an email, it\'s parsed client-side or on a serverless function that deletes the content within 5 seconds. Only the cryptographic proof hash goes on-chain. See our Privacy Policy for complete details.',
  },
  {
    _id: '4',
    question: 'How does the free tier work?',
    answer:
      'Every wallet gets 2 free mints per week, tracked on-chain. This resets every Sunday at midnight UTC. If you need more, upgrade to Premium ($9/month or $79/year) for unlimited mints, batch processing, and custom NFT designs.',
  },
  {
    _id: '5',
    question: 'Which stores are supported?',
    answer:
      'We currently support major e-commerce platforms including Amazon, eBay, Nike, Adidas, Steam, Epic Games, Apple, and many more. We\'re constantly adding partners and have preliminary agreements with several major retailers to integrate directly.',
  },
  {
    _id: '6',
    question: 'Do I pay gas fees?',
    answer:
      'No! We use a gas paymaster on Base network to sponsor all transaction fees. Minting is completely free for users (within the free tier limits).',
  },
];

export function FAQ() {
  const [faqs, setFaqs] = useState<FAQItem[]>(defaultFAQs);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFAQs() {
      const isLocalPreview =
        typeof window !== 'undefined' && ['localhost', '127.0.0.1'].includes(window.location.hostname);

      if (isLocalPreview) {
        setIsLoading(false);
        return;
      }

      try {
        const data = await sanityClient.fetch<FAQItem[]>(
          `*[_type == "faq"] | order(order asc) {
            _id,
            question,
            answer
          }`
        );
        if (data && data.length > 0) {
          setFaqs(data);
        }
      } catch {
        // Keep local fallback FAQs without logging noisy preview errors.
      } finally {
        setIsLoading(false);
      }
    }

    fetchFAQs();
  }, []);

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="mb-12 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
          <HelpCircle className="h-4 w-4" />
          Got Questions?
        </div>
        <h2 className="mb-4 text-3xl font-bold md:text-5xl">
          Frequently Asked <span className="gradient-text">Questions</span>
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Everything you need to know about Receipilot
        </p>
      </div>

      <div className="mx-auto max-w-3xl">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 animate-pulse rounded-lg bg-muted" />
            ))}
          </div>
        ) : (
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq._id}
                value={faq._id}
                className="glass-effect rounded-xl border-none px-6 data-[state=open]:shadow-lg"
              >
                <AccordionTrigger className="text-left text-base font-semibold hover:text-blue-600 hover:no-underline dark:hover:text-blue-400">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </section>
  );
}
