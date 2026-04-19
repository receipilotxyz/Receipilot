import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: Request) {
  try {
    const config = await request.json();

    // Build the TypeScript config file content
    const fileContent = `// ─────────────────────────────────────────────────────────────
// Site Configuration — Edit this file to change site content
// No code knowledge needed. Just change the text between quotes.
// After saving, push to GitHub and Vercel/Railway will redeploy.
// ─────────────────────────────────────────────────────────────

export const siteConfig = ${JSON.stringify(config, null, 2)};

export type SiteConfig = typeof siteConfig;
`;

    const configPath = join(process.cwd(), 'lib', 'site-config.ts');
    await writeFile(configPath, fileContent, 'utf-8');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Config save error:', error);
    return NextResponse.json({ error: 'Failed to save config' }, { status: 500 });
  }
}
