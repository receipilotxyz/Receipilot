'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Mail, Link2, AlertCircle, ChevronDown, ChevronUp, ShieldCheck, Wallet } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { ProofAnimation } from './ProofAnimation';
import { WalletConnectButton } from './WalletConnectButton';
import { useAccount } from 'wagmi';
import { useToast } from './ui/use-toast';

export function UploadFlow() {
  const [activeTab, setActiveTab] = useState('upload');
  const [isGeneratingProof, setIsGeneratingProof] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [receiptLink, setReceiptLink] = useState('');
  const [showEmlGuide, setShowEmlGuide] = useState(false);
  const [showFundingNotice, setShowFundingNotice] = useState(false);
  const [mintPending, setMintPending] = useState(false);
  const { isConnected } = useAccount();
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.name.endsWith('.eml')) {
        toast({
          title: 'Invalid file type',
          description: 'Please upload a .eml file',
          variant: 'destructive',
        });
        return;
      }
      setFile(selectedFile);
      toast({
        title: 'File uploaded',
        description: `${selectedFile.name} ready to process`,
      });
    }
  };

  const handleGenerateProof = async () => {
    if (activeTab === 'upload' && !file) {
      toast({
        title: 'No file selected',
        description: 'Please upload a .eml file',
        variant: 'destructive',
      });
      return;
    }

    if (activeTab === 'link' && !receiptLink.trim()) {
      toast({
        title: 'No link provided',
        description: 'Please paste your order confirmation link',
        variant: 'destructive',
      });
      return;
    }

    // Show funding notice before first mint (once per session)
    if (!mintPending) {
      setShowFundingNotice(true);
      return;
    }

    setIsGeneratingProof(true);
  };

  const handleFundingAck = () => {
    setShowFundingNotice(false);
    setMintPending(true);
    setIsGeneratingProof(true);
  };

  const handleProofComplete = () => {
    setIsGeneratingProof(false);
    setFile(null);
    setReceiptLink('');
    toast({
      title: 'NFT Minted Successfully!',
      description: 'Check your wallet or visit My Receipts to view it',
    });
  };

  return (
    <>
      <div id="upload" className="mx-auto max-w-4xl">
        {/* Wallet gate — show connect prompt when wallet is not connected */}
        {!isConnected ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="clean-card rounded-2xl p-12 text-center space-y-6"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-muted">
              <Wallet className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Connect Your Wallet to Start Minting</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                You need a Web3 wallet to generate cryptographic proofs and mint your verified receipt NFTs on Base.
              </p>
            </div>
            <WalletConnectButton label="Connect Wallet" size="lg" />
            <p className="text-xs text-muted-foreground">Receipilot is completely free — no subscription, no gas fees.</p>
          </motion.div>
        ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload" className="gap-1 px-2 text-xs sm:text-sm sm:gap-2">
              <Upload className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
              <span className="hidden xs:inline sm:inline">.eml</span>
              <span className="xs:hidden sm:hidden">EML</span>
            </TabsTrigger>
            <TabsTrigger value="link" className="gap-1 px-2 text-xs sm:text-sm sm:gap-2">
              <Link2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
              <span>Link</span>
            </TabsTrigger>
            <TabsTrigger value="forward" className="relative gap-1 px-2 text-xs sm:text-sm sm:gap-2">
              <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
              <span className="hidden sm:inline">Forward</span>
              <span className="sm:hidden">Fwd</span>
              <span className="ml-1 rounded-full bg-primary/15 px-1 py-0.5 text-[9px] font-semibold text-primary leading-none">Soon</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="clean-card rounded-2xl p-5 sm:p-8"
            >
              <div className="mb-6">
                <h3 className="mb-2 text-xl sm:text-2xl font-semibold">Upload Receipt Email</h3>
                <p className="text-sm text-muted-foreground">
                  Export your receipt email as a .eml file and upload it here for full DKIM
                  verification
                </p>
              </div>

              {/* EML Export Guide */}
              <div className="mb-6 rounded-xl border border-border bg-muted/40">
                <button
                  onClick={() => setShowEmlGuide(!showEmlGuide)}
                  className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-foreground"
                >
                  <span className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-primary" />
                    How to export a .eml file from your email client
                  </span>
                  {showEmlGuide ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                {showEmlGuide && (
                  <div className="border-t border-border px-4 pb-4 pt-3 text-sm text-muted-foreground space-y-3">
                    <div>
                      <p className="font-semibold text-foreground mb-1">Gmail</p>
                      <ol className="list-decimal list-inside space-y-1">
                        <li>Open the receipt email</li>
                        <li>Click the three-dot menu (⋮) in the top-right of the email</li>
                        <li>Select <strong>"Download message"</strong> — saves as <code className="rounded bg-muted px-1">.eml</code></li>
                      </ol>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">Apple Mail</p>
                      <ol className="list-decimal list-inside space-y-1">
                        <li>Open the receipt email</li>
                        <li>Go to <strong>File → Save As…</strong></li>
                        <li>Choose format: <strong>Raw Message Source</strong></li>
                      </ol>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">Outlook</p>
                      <ol className="list-decimal list-inside space-y-1">
                        <li>Open the receipt email</li>
                        <li>Go to <strong>File → Save As</strong></li>
                        <li>Select <strong>Outlook Message Format (.msg)</strong> or drag the email out of Outlook to your Desktop — it saves as <code className="rounded bg-muted px-1">.eml</code></li>
                      </ol>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">Thunderbird</p>
                      <ol className="list-decimal list-inside space-y-1">
                        <li>Open the receipt email</li>
                        <li>Go to <strong>File → Save As → File…</strong></li>
                        <li>It saves directly as <code className="rounded bg-muted px-1">.eml</code></li>
                      </ol>
                    </div>
                    <p className="mt-2 rounded-lg bg-primary/5 border border-primary/20 px-3 py-2 text-xs text-primary">
                      <ShieldCheck className="inline h-3 w-3 mr-1" />
                      Receipilot never reads your name, phone number, or address — only the receipt data and DKIM signature are processed.
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-border p-8 sm:p-12 transition-all hover:border-blue-500">
                  <Label
                    htmlFor="file-upload"
                    className="flex cursor-pointer flex-col items-center"
                  >
                    <Upload className="mb-4 h-12 w-12 text-muted-foreground" />
                    <span className="mb-2 text-lg font-semibold">
                      {file ? file.name : 'Click to upload or drag and drop'}
                    </span>
                    <span className="text-sm text-muted-foreground">.eml files only</span>
                    <Input
                      id="file-upload"
                      type="file"
                      accept=".eml"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </Label>
                </div>

                <Button
                  size="lg"
                  variant="gradient"
                  className="w-full"
                  onClick={handleGenerateProof}
                  disabled={!file}
                >
                  Generate Proof & Mint NFT
                </Button>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="link" className="mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="clean-card rounded-2xl p-5 sm:p-8"
            >
              <div className="mb-6">
                <h3 className="mb-2 text-xl sm:text-2xl font-semibold">Paste Order / Receipt Link</h3>
                <p className="text-sm text-muted-foreground">
                  Paste the direct link to your order confirmation page from a supported store.
                  We fetch only the order data — your account details stay private.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="receipt-link" className="mb-1.5 block">Order Confirmation URL</Label>
                  <Input
                    id="receipt-link"
                    type="url"
                    placeholder="https://www.amazon.com/gp/css/order-details?orderID=..."
                    value={receiptLink}
                    onChange={(e) => setReceiptLink(e.target.value)}
                    className="font-mono text-sm"
                  />
                </div>

                {/* Supported brands */}
                <div className="rounded-xl border border-border bg-muted/40 p-4">
                  <p className="mb-3 text-sm font-semibold flex items-center gap-2">
                    <Link2 className="h-4 w-4 text-primary" />
                    Brands we're working with to support this method
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    {['Amazon', 'Best Buy', 'eBay', 'Nike', 'Adidas', 'Apple', 'ASUS', 'Walmart', 'Steam'].map((b) => (
                      <span key={b} className="rounded-full border border-border bg-background px-2.5 py-1">{b}</span>
                    ))}
                    <span className="rounded-full border border-dashed border-primary/30 bg-primary/5 px-2.5 py-1 text-primary">+ many more</span>
                  </div>
                </div>

                <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm">
                  <p className="flex items-start gap-2 text-muted-foreground">
                    <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span>
                      We only read the receipt data from the page. We <strong className="text-foreground">never</strong> access your account, personal details, phone number, or shipping address.
                      All processing is end-to-end encrypted and data is permanently deleted once your NFT is minted.
                    </span>
                  </p>
                </div>

                <Button
                  size="lg"
                  variant="gradient"
                  className="w-full"
                  onClick={handleGenerateProof}
                  disabled={!receiptLink.trim()}
                >
                  Generate Proof & Mint NFT
                </Button>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="forward" className="mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="clean-card rounded-2xl p-5 sm:p-8"
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <h3 className="mb-2 text-xl sm:text-2xl font-semibold">Forward to Our Address</h3>
                  <p className="text-sm text-muted-foreground">
                    The most convenient method — just forward your receipt email directly.
                  </p>
                </div>
                <span className="flex-shrink-0 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">Coming Soon</span>
              </div>

              <div className="space-y-8 opacity-60 pointer-events-none select-none">
                <div className="rounded-xl bg-blue-50 p-6 text-center dark:bg-blue-900/20">
                  <p className="mb-2 text-sm text-muted-foreground">Forward your email to</p>
                  <div className="flex items-center justify-center gap-2">
                    <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    <span className="text-lg sm:text-2xl font-bold text-blue-600 dark:text-blue-400 break-all">
                      prove@receipilot.xyz
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">How it works:</h4>
                  <ol className="list-inside list-decimal space-y-3 text-sm text-muted-foreground">
                    <li>Forward your receipt email to prove@receipilot.xyz</li>
                    <li>Our secure serverless function parses the email and generates a ZK proof</li>
                    <li>The proof is verified and your NFT is minted automatically to your connected wallet</li>
                    <li><strong className="text-blue-600 dark:text-blue-400">The email content is permanently deleted within 5 seconds</strong></li>
                    <li>You receive a confirmation email and can view your NFT</li>
                  </ol>
                </div>
              </div>

              <div className="mt-6 rounded-lg border border-primary/20 bg-primary/5 p-4">
                <h4 className="mb-2 flex items-center gap-2 font-semibold text-primary">
                  <ShieldCheck className="h-5 w-5" />
                  Privacy Guarantee
                </h4>
                <p className="text-sm text-muted-foreground">
                  Receipilot <strong className="text-foreground">never</strong> reads or stores your name, phone number, or address — even if they appear in the email.
                  Only the receipt data and DKIM signature are processed. Everything is end-to-end encrypted, and your data is permanently deleted the moment your NFT is minted.
                </p>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
        )} {/* end wallet gate */}
      </div>

      {/* Pre-mint funding notice dialog */}
      <Dialog open={showFundingNotice} onOpenChange={setShowFundingNotice}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">A quick note before you mint 🌱</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">Receipilot is completely free</strong> for
              users, and we intend to keep it that way.
            </p>
            <p>
              Right now we&apos;re in our early funding phase — burning our own capital to build
              the infrastructure for global, zero-cost receipt verification. Every mint you make
              proves real demand and helps us raise the runway to keep going.
            </p>
            <p className="text-xs">
              Thank you for being an early user. Your support means everything. ❤️
            </p>
          </div>
          <Button onClick={handleFundingAck} className="mt-2 w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
            Got it — mint my receipt →
          </Button>
        </DialogContent>
      </Dialog>

      <ProofAnimation
        isOpen={isGeneratingProof}
        onComplete={handleProofComplete}
        emailSource={activeTab}
      />
    </>
  );
}
