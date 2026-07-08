import './globals.css';
import type { Metadata } from 'next';
import { siteConfig } from '@/data/config';

const title       = `${siteConfig.name} | ${siteConfig.title}`;
const description = siteConfig.siteDescription;

export const metadata: Metadata = {
  title,
  description,
  keywords: siteConfig.keywords,
  authors:  [{ name: siteConfig.name }],
  creator:  siteConfig.name,
  openGraph: {
    type:        'website',
    locale:      'en_US',
    url:         siteConfig.url,
    title,
    description,
    siteName:    `${siteConfig.name} Portfolio`,
  },
  twitter: {
    card:        'summary_large_image',
    title,
    description: siteConfig.siteDescription,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Core typography styling from Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&family=Noto+Serif+JP:wght@400;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
