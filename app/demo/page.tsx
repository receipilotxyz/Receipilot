import { Demo } from '@/components/Demo';

export const metadata = {
  title: 'Live Demo - Receipilot',
  description: 'Experience Receipilot in action. Try our interactive demo to see how receipt verification and NFT minting works.',
};

export default function DemoPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Dot Grid Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 dot-grid" />

      <div className="container mx-auto px-4 py-12">
        {/* Minimal Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-2 text-sm text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
            </span>
            Interactive Demo
          </div>
          <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
            Experience <span className="text-primary">Receipilot</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Watch the complete flow from email verification to NFT minting
          </p>
        </div>

        {/* Demo Component */}
        <Demo />
      </div>
    </div>
  );
}
