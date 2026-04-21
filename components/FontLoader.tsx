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

function buildFontFace(fontConfig: FontConfig, internalName: string): string {
  if (fontConfig.type === 'upload' && fontConfig.url) {
    return `@font-face{font-family:'${internalName}';src:url('${fontConfig.url}');font-display:swap;}`;
  }
  return '';
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
  const bodyFontFace = buildFontFace(bodyFont, 'CustomBodyFont');
  const logoFontFace = buildFontFace(logoFont, 'CustomLogoFont');
  const bodyGoogleLink = buildGoogleLink(bodyFont);
  const logoGoogleLink = buildGoogleLink(logoFont);

  // Build synchronous inline script to avoid FOUT
  const scriptContent = [
    bodyFontFace && `(function(){var s=document.createElement('style');s.textContent=${JSON.stringify(bodyFontFace)};document.head.appendChild(s);})();`,
    logoFontFace && `(function(){var s=document.createElement('style');s.textContent=${JSON.stringify(logoFontFace)};document.head.appendChild(s);})();`,
    bodyVar && `document.documentElement.style.setProperty('--font-body-dynamic',${JSON.stringify(bodyVar)});`,
    logoVar && `document.documentElement.style.setProperty('--font-logo-dynamic',${JSON.stringify(logoVar)});`,
  ].filter(Boolean).join('');

  // Inject Google Fonts preload links on client
  useEffect(() => {
    [bodyGoogleLink, logoGoogleLink].filter(Boolean).forEach((href) => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
      }
    });
  }, [bodyGoogleLink, logoGoogleLink]);

  return (
    <>
      {scriptContent && (
        // eslint-disable-next-line react/no-danger
        <script dangerouslySetInnerHTML={{ __html: scriptContent }} />
      )}
    </>
  );
}

