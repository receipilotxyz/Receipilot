// ─────────────────────────────────────────────────────────────
// Site Configuration — Edit this file to change site content
// No code knowledge needed. Just change the text between quotes.
// After saving, push to GitHub and Vercel/Railway will redeploy.
// ─────────────────────────────────────────────────────────────

export const siteConfig = {
  "name": "Receipilot",
  "tagline": "Turn Receipts into Verified NFTs",
  "description": "Turn any online purchase email into a beautiful, cryptographically verified NFT in seconds. Impossible to fake. Powered by vlayer ZK technology.",
  "receiptImage": "/receipt-card.png",
  "logoImage": "/Untitled_design__11_.png",
  "favicon": "/favicon.ico",
  "ogImage": "/og-image.png",
  "hero": {
    "badge": "Powered by vlayer ZK Technology",
    "headlineStart": "Turn Receipts into",
    "headlineHighlight": "Verified NFTs",
    "subheadline": "Transform any online purchase email into a cryptographically verified NFT in seconds. Impossible to fake, forever on-chain.",
    "pills": [
      "DKIM Verified",
      "Instant Mint",
      "On-Chain Forever"
    ],
    "stats": [
      {
        "value": "2 Free",
        "label": "mints per week"
      },
      {
        "value": "100%",
        "label": "verified"
      },
      {
        "value": "$0",
        "label": "gas fees"
      }
    ]
  },
  "features": [
    {
      "title": "Impossible to Fake",
      "description": "Powered by vlayer's ZK Email technology with DKIM verification. Every receipt is cryptographically proven authentic."
    },
    {
      "title": "Earn Real Money",
      "description": "When product prices rise or items become discontinued, your verified receipt NFT becomes valuable proof of authenticity."
    },
    {
      "title": "Enterprise Ready",
      "description": "We're partnering with major e-commerce platforms to eliminate receipt forgery and streamline warranty claims."
    }
  ],
  "howItWorks": {
    "title": "How It Works",
    "subtitle": "Three simple steps to transform your purchase emails into verified digital assets"
  },
  "whySection": {
    "title": "Why Receipilot?",
    "subtitle": "The future of verified purchases starts here"
  },
  "cta": {
    "badge": "Limited Time Offer",
    "title": "Ready to Get Started?",
    "subtitle": "Join thousands of users protecting their purchases with cryptographic proof. Start minting your receipt NFTs today.",
    "perks": [
      "No credit card",
      "2 free mints/week",
      "Zero gas fees"
    ]
  },
  "faqs": [
    {
      "question": "How is this different from just taking a screenshot?",
      "answer": "Screenshots can be easily faked using Photoshop or inspect element. Our NFTs are cryptographically verified using vlayer's ZK Email technology with DKIM signatures, making them mathematically impossible to forge. The blockchain proves the email came from the actual store."
    },
    {
      "question": "What can I do with these receipt NFTs?",
      "answer": "Receipt NFTs serve as permanent proof of purchase that can appreciate in value. Use them for warranty claims, prove authenticity when reselling items, or hold them as collectibles. When products become discontinued or rise in price, your verified receipt becomes valuable proof."
    },
    {
      "question": "Is my email data safe?",
      "answer": "Absolutely. We never store your full email content. When you forward an email, it's parsed client-side or on a serverless function that deletes the content within 5 seconds. Only the cryptographic proof hash goes on-chain. See our Privacy Policy for complete details."
    },
    {
      "question": "How does the free tier work?",
      "answer": "Every wallet gets 2 free mints per week, tracked on-chain. This resets every Sunday at midnight UTC. If you need more, upgrade to Premium ($9/month or $79/year) for unlimited mints, batch processing, and custom NFT designs."
    },
    {
      "question": "Which stores are supported?",
      "answer": "We currently support major e-commerce platforms including Amazon, eBay, Nike, Adidas, Steam, Epic Games, Apple, and many more. We're constantly adding partners and have preliminary agreements with several major retailers to integrate directly."
    },
    {
      "question": "Do I pay gas fees?",
      "answer": "No! We use a gas paymaster on Base network to sponsor all transaction fees. Minting is completely free for users (within the free tier limits)."
    }
  ],
  "footer": {
    "description": "Transform online purchase emails into cryptographically verified NFTs. Impossible to fake, forever on-chain.",
    "email": "hello@receipilot.xyz",
    "forwardEmail": "prove@receipilot.xyz",
    "copyright": "© {year} Receipilot. Powered by vlayer",
    "copyrightLinkText": "vlayer",
    "copyrightLinkUrl": "https://vlayer.xyz",
    "social": {
      "github": "https://github.com/BeroNac/Receipilot",
      "twitter": "https://twitter.com/receipilot"
    }
  },
  "demo": {
    "merchant": "Apple Store",
    "orderId": "W2847395628",
    "product": "MacBook Pro 14\" M3 Pro",
    "date": "2026-03-10",
    "total": "$2,499.00",
    "email": "customer@example.com"
  }
};

export type SiteConfig = typeof siteConfig;
