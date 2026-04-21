'use client';

import { useEffect } from 'react';

interface FontConfig {
  type: string;
  family: string;
  url: string;
}

function buildCssVar(fontConfig: FontConfig, internalName: string): string | null {
  if (!fontConfig) return null;
  if (fontConfig.type === 'upload' && fontConfig.url) {
    return `'${internalName}', system-ui, sans-serif`;
  }
  if (fontConfig.type === 'google' && fontConfig.family) {
    return `'${fontConfig.family}', system-ui, sans-serif`;
  }
  return null;
}

function buildGoogleLink(fontConfig: FontConfig): string {
  if (fontConfig.type === 'google' && fontConfig.family) {
    const encoded = fontConfig.family.replace(/ /g, '+');
    return `https://fonts.googleapis.com/css2?family=${encoded}:wght@300;400;500;600;700;800&display=swap`;
  }
  return '';
}

export function FontLoader({
  logoFont,
  bodyFont,
}: {
  logoFont: FontConfig;
  bodyFont: FontConfig;
}) {
  const bodyVar = buildCssVar(bodyFont, 'CustomBodyFont');
  const logoVar = buildCssVar(logoFont, 'CustomLogoFont');
  const bodyGoogleLink = buildGoogleLink(bodyFont);
  const logoGoogleLink = buildGoogleLink(logoFont);

  // Update CSS vars and Google font links when admin changes fonts at runtime
  useEffect(() => {
    if (bodyVar) document.documentElement.style.setProperty('--font-body-dynamic', bodyVar);
    if (logoVar) document.documentElement.style.setProperty('--font-logo-dynamic', logoVar);

    [bodyGoogleLink, logoGoogleLink].filter(Boolean).forEach((href) => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
      }
    });
  }, [bodyVar, logoVar, bodyGoogleLink, logoGoogleLink]);

  // Server already injects font CSS vars in <head> for zero-FOUT on initial load.
  // This component only handles live updates when admin changes fonts.
  return null;
}

