import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '1Fi - Mutual Fund Backed EMIs | 1Fi Marketplace',
  description:
    'Shop smartphones, laptops and electronics with 0% No-Cost EMI backed by your mutual fund investments. Zero liquidation, continue earning returns.',
  icons: {
    icon: '/assets/1fi_logo.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#712CDC',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f3f4f8]">{children}</body>
    </html>
  );
}
