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
  "logoImage": "/logo.png",
  "favicon": "/favicon.ico",
  "ogImage": "/og-image.png",
  "hero": {
    "badge": "Early Funding Phase — Free for Users",
    "headlineStart": "Turn Receipts into",
    "headlineHighlight": "Verified NFTs",
    "subheadline": "Transform any online purchase email into a cryptographically verified NFT in seconds. Impossible to fake, forever on-chain — and completely free.",
    "pills": [
      "DKIM Verified",
      "Instant Mint",
      "100% Free"
    ],
    "stats": [
      {
        "value": "100%",
        "label": "free, always"
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
    "badge": "We're Fundraising — Receipilot Stays Free",
    "title": "Free for Everyone, Forever",
    "subtitle": "We're building Receipilot on our own capital to bring verified receipt NFTs to users globally at zero cost. Every mint proves real demand and helps us raise the runway to make that happen.",
    "perks": [
      "No credit card",
      "Always free for users",
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
      "answer": "Receipilot is completely free for users — no subscription, no hidden fees. We're currently in our early funding phase, burning our own capital to build the infrastructure that makes this globally accessible. Mint as many receipts as you like."
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
    "product": "Macbook Neo 14\"",
    "date": "2026-02-25",
    "total": "$549.00",
    "email": "customer@example.com"
  },
  "fonts": {
    "logoFont": {
      "type": "google",
      "family": "Raleway",
      "url": ""
    },
    "bodyFont": {
      "type": "upload",
      "family": "HeroLight-Regular",
      "url": "/fonts/herolight-regular.otf"
    }
  },
  "partners": {
    "heading": "Trusted by",
    "headingHighlight": "Leading Brands",
    "subheading": "We're partnering with major e-commerce platforms to bring verified receipts to everyone",
    "note": "Preliminary agreements in motion with major e-commerce giants. More partners announced soon.",
    "brands": [
      {
        "id": "1",
        "name": "Amazon",
        "logo": "/partners/amazon.svg",
        "isComingSoon": false
      },
      {
        "id": "2",
        "name": "eBay",
        "logo": "/partners/ebay.svg",
        "isComingSoon": false
      },
      {
        "id": "3",
        "name": "Nike",
        "logo": "/partners/nike.png",
        "isComingSoon": true
      },
      {
        "id": "4",
        "name": "Adidas",
        "logo": "/partners/adidas.svg",
        "isComingSoon": false
      },
      {
        "id": "5",
        "name": "Steam",
        "logo": "/partners/steam.svg",
        "isComingSoon": false
      },
      {
        "id": "6",
        "name": "Apple",
        "logo": "/partners/apple.svg",
        "isComingSoon": false
      },
      {
        "id": "7",
        "name": "Best Buy",
        "logo": "/partners/bestbuy.svg",
        "isComingSoon": true
      },
      {
        "id": "8",
        "name": "Target",
        "logo": "/partners/target.svg",
        "isComingSoon": true
      },
      {
        "id": "9",
        "name": "Walmart",
        "logo": "/partners/walmart.svg",
        "isComingSoon": true
      }
    ]
  }
};

export type SiteConfig = typeof siteConfig;
