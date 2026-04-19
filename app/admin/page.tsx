'use client';

import { useState, useRef } from 'react';
import { siteConfig } from '@/lib/site-config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save, Upload, Eye, Lock, Image, Type, FileText, Settings } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [config, setConfig] = useState(siteConfig);
  const [activeTab, setActiveTab] = useState<'brand' | 'hero' | 'content' | 'images' | 'faq'>('brand');
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogin = () => {
    // Password is checked client-side for simplicity — this is an internal tool
    const adminPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'receipilot2026';
    if (password === adminPass) {
      setAuthenticated(true);
    } else {
      toast({ title: 'Wrong password', description: 'Try again', variant: 'destructive' });
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
      if (res.ok) {
        toast({ title: 'Config saved', description: 'Changes saved. Redeploy to apply in production.' });
      } else {
        toast({ title: 'Save failed', description: 'Could not save config file', variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Save failed', description: 'Could not save config file', variant: 'destructive' });
    }
    setSaving(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('target', target);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        if (target === 'receipt') {
          setConfig({ ...config, receiptImage: data.path });
        }
        toast({ title: 'Image uploaded', description: `Saved as ${data.path}` });
      } else {
        toast({ title: 'Upload failed', description: data.error, variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Upload failed', variant: 'destructive' });
    }
  };

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="w-full max-w-sm space-y-6 rounded-2xl border border-border bg-card p-8">
          <div className="text-center">
            <Lock className="mx-auto mb-3 h-10 w-10 text-primary" />
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <p className="mt-1 text-sm text-muted-foreground">Enter password to continue</p>
          </div>
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
            <Button onClick={handleLogin} className="w-full">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'brand' as const, label: 'Brand', icon: Type },
    { id: 'hero' as const, label: 'Hero', icon: FileText },
    { id: 'images' as const, label: 'Images', icon: Image },
    { id: 'content' as const, label: 'Content', icon: Settings },
    { id: 'faq' as const, label: 'FAQ', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold">Receipilot Admin</h1>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              Config Editor
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link href="/" target="_blank">
                <Eye className="mr-2 h-4 w-4" />
                Preview Site
              </Link>
            </Button>
            <Button size="sm" onClick={handleSave} disabled={saving}>
              <Save className="mr-2 h-4 w-4" />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          {/* Sidebar */}
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}

            <div className="mt-6 rounded-xl border border-border bg-muted/50 p-4">
              <h3 className="mb-2 text-xs font-semibold uppercase text-muted-foreground">How It Works</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Edit the fields here and click Save. Changes are saved to the config file.
                Push to GitHub and your site auto-redeploys on Vercel/Railway.
              </p>
            </div>
          </nav>

          {/* Content */}
          <div className="space-y-6">
            {/* Brand Tab */}
            {activeTab === 'brand' && (
              <div className="space-y-6">
                <SectionCard title="Brand Identity">
                  <Field label="Site Name" value={config.name} onChange={(v) => setConfig({ ...config, name: v })} />
                  <Field label="Tagline" value={config.tagline} onChange={(v) => setConfig({ ...config, tagline: v })} />
                  <FieldTextarea label="Site Description (SEO)" value={config.description} onChange={(v) => setConfig({ ...config, description: v })} />
                </SectionCard>

                <SectionCard title="Contact">
                  <Field label="Contact Email" value={config.footer.email} onChange={(v) => setConfig({ ...config, footer: { ...config.footer, email: v } })} />
                  <Field label="Forward Email" value={config.footer.forwardEmail} onChange={(v) => setConfig({ ...config, footer: { ...config.footer, forwardEmail: v } })} />
                  <Field label="GitHub URL" value={config.footer.social.github} onChange={(v) => setConfig({ ...config, footer: { ...config.footer, social: { ...config.footer.social, github: v } } })} />
                  <Field label="Twitter URL" value={config.footer.social.twitter} onChange={(v) => setConfig({ ...config, footer: { ...config.footer, social: { ...config.footer.social, twitter: v } } })} />
                </SectionCard>
              </div>
            )}

            {/* Hero Tab */}
            {activeTab === 'hero' && (
              <div className="space-y-6">
                <SectionCard title="Hero Section">
                  <Field label="Badge Text" value={config.hero.badge} onChange={(v) => setConfig({ ...config, hero: { ...config.hero, badge: v } })} />
                  <Field label="Headline Start" value={config.hero.headlineStart} onChange={(v) => setConfig({ ...config, hero: { ...config.hero, headlineStart: v } })} />
                  <Field label="Headline Highlight (green text)" value={config.hero.headlineHighlight} onChange={(v) => setConfig({ ...config, hero: { ...config.hero, headlineHighlight: v } })} />
                  <FieldTextarea label="Subheadline" value={config.hero.subheadline} onChange={(v) => setConfig({ ...config, hero: { ...config.hero, subheadline: v } })} />
                </SectionCard>

                <SectionCard title="Feature Pills">
                  {config.hero.pills.map((pill, i) => (
                    <Field
                      key={i}
                      label={`Pill ${i + 1}`}
                      value={pill}
                      onChange={(v) => {
                        const pills = [...config.hero.pills];
                        pills[i] = v;
                        setConfig({ ...config, hero: { ...config.hero, pills } });
                      }}
                    />
                  ))}
                </SectionCard>

                <SectionCard title="Stats">
                  {config.hero.stats.map((stat, i) => (
                    <div key={i} className="grid grid-cols-2 gap-4">
                      <Field
                        label={`Stat ${i + 1} Value`}
                        value={stat.value}
                        onChange={(v) => {
                          const stats = [...config.hero.stats];
                          stats[i] = { ...stats[i], value: v };
                          setConfig({ ...config, hero: { ...config.hero, stats } });
                        }}
                      />
                      <Field
                        label={`Stat ${i + 1} Label`}
                        value={stat.label}
                        onChange={(v) => {
                          const stats = [...config.hero.stats];
                          stats[i] = { ...stats[i], label: v };
                          setConfig({ ...config, hero: { ...config.hero, stats } });
                        }}
                      />
                    </div>
                  ))}
                </SectionCard>
              </div>
            )}

            {/* Images Tab */}
            {activeTab === 'images' && (
              <div className="space-y-6">
                <SectionCard title="Receipt Card Image">
                  <p className="mb-4 text-sm text-muted-foreground">
                    This image shows in the hero section and after demo minting completes.
                  </p>
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 rounded-xl border border-border bg-muted p-2">
                      <img src={config.receiptImage} alt="Current receipt" className="h-48 w-auto rounded-lg" />
                    </div>
                    <div className="space-y-3">
                      <p className="text-sm font-medium">Current: <code className="rounded bg-muted px-2 py-0.5 text-xs">{config.receiptImage}</code></p>
                      <div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e, 'receipt')}
                        />
                        <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                          <Upload className="mr-2 h-4 w-4" />
                          Upload New Image
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Use a PNG with transparent background for best results. Recommended size: 400×500px.
                      </p>
                    </div>
                  </div>
                </SectionCard>

                <SectionCard title="Logo & Favicon">
                  <p className="mb-4 text-sm text-muted-foreground">
                    The logo is an SVG icon in the code. To change it:
                  </p>
                  <div className="space-y-3 rounded-xl bg-muted/50 p-4">
                    <p className="text-sm"><strong>Logo Icon:</strong> Edit the SVG in <code className="rounded bg-muted px-2 py-0.5 text-xs">components/Navigation.tsx</code> and <code className="rounded bg-muted px-2 py-0.5 text-xs">components/Footer.tsx</code></p>
                    <p className="text-sm"><strong>Favicon:</strong> Replace <code className="rounded bg-muted px-2 py-0.5 text-xs">public/favicon.ico</code> with your own .ico file (32×32px)</p>
                    <p className="text-sm"><strong>OG Image:</strong> Add <code className="rounded bg-muted px-2 py-0.5 text-xs">public/og-image.png</code> (1200×630px) for social sharing previews</p>
                  </div>
                </SectionCard>
              </div>
            )}

            {/* Content Tab */}
            {activeTab === 'content' && (
              <div className="space-y-6">
                <SectionCard title="How It Works Section">
                  <Field label="Section Title" value={config.howItWorks.title} onChange={(v) => setConfig({ ...config, howItWorks: { ...config.howItWorks, title: v } })} />
                  <FieldTextarea label="Subtitle" value={config.howItWorks.subtitle} onChange={(v) => setConfig({ ...config, howItWorks: { ...config.howItWorks, subtitle: v } })} />
                </SectionCard>

                <SectionCard title="Features">
                  {config.features.map((feature, i) => (
                    <div key={i} className="space-y-3 rounded-xl border border-border p-4">
                      <Field label={`Feature ${i + 1} Title`} value={feature.title} onChange={(v) => {
                        const features = [...config.features];
                        features[i] = { ...features[i], title: v };
                        setConfig({ ...config, features });
                      }} />
                      <FieldTextarea label={`Feature ${i + 1} Description`} value={feature.description} onChange={(v) => {
                        const features = [...config.features];
                        features[i] = { ...features[i], description: v };
                        setConfig({ ...config, features });
                      }} />
                    </div>
                  ))}
                </SectionCard>

                <SectionCard title="CTA Section">
                  <Field label="Badge" value={config.cta.badge} onChange={(v) => setConfig({ ...config, cta: { ...config.cta, badge: v } })} />
                  <Field label="Title" value={config.cta.title} onChange={(v) => setConfig({ ...config, cta: { ...config.cta, title: v } })} />
                  <FieldTextarea label="Subtitle" value={config.cta.subtitle} onChange={(v) => setConfig({ ...config, cta: { ...config.cta, subtitle: v } })} />
                </SectionCard>

                <SectionCard title="Demo Mock Data">
                  <Field label="Merchant Name" value={config.demo.merchant} onChange={(v) => setConfig({ ...config, demo: { ...config.demo, merchant: v } })} />
                  <Field label="Order ID" value={config.demo.orderId} onChange={(v) => setConfig({ ...config, demo: { ...config.demo, orderId: v } })} />
                  <Field label="Product" value={config.demo.product} onChange={(v) => setConfig({ ...config, demo: { ...config.demo, product: v } })} />
                  <Field label="Total" value={config.demo.total} onChange={(v) => setConfig({ ...config, demo: { ...config.demo, total: v } })} />
                </SectionCard>
              </div>
            )}

            {/* FAQ Tab */}
            {activeTab === 'faq' && (
              <div className="space-y-6">
                <SectionCard title="Frequently Asked Questions">
                  {config.faqs.map((faq, i) => (
                    <div key={i} className="space-y-3 rounded-xl border border-border p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground">FAQ #{i + 1}</span>
                        <button
                          onClick={() => {
                            const faqs = config.faqs.filter((_, idx) => idx !== i);
                            setConfig({ ...config, faqs });
                          }}
                          className="text-xs text-red-500 hover:text-red-600"
                        >
                          Remove
                        </button>
                      </div>
                      <Field label="Question" value={faq.question} onChange={(v) => {
                        const faqs = [...config.faqs];
                        faqs[i] = { ...faqs[i], question: v };
                        setConfig({ ...config, faqs });
                      }} />
                      <FieldTextarea label="Answer" value={faq.answer} onChange={(v) => {
                        const faqs = [...config.faqs];
                        faqs[i] = { ...faqs[i], answer: v };
                        setConfig({ ...config, faqs });
                      }} />
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => setConfig({
                      ...config,
                      faqs: [...config.faqs, { question: '', answer: '' }],
                    })}
                  >
                    + Add FAQ
                  </Button>
                </SectionCard>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Helper Components ────────────────────────────────────────

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h2 className="mb-5 text-lg font-bold">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <Label className="mb-1.5 text-sm text-muted-foreground">{label}</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function FieldTextarea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <Label className="mb-1.5 text-sm text-muted-foreground">{label}</Label>
      <textarea
        className="mt-1 w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm"
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
