import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { siteMeta } from "@/data/socials";
import { JsonLd } from "@/components/seo/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const titleDefault = `${siteMeta.name} — ${siteMeta.role}`;
const description = siteMeta.tagline;

export const metadata: Metadata = {
  metadataBase: new URL(siteMeta.url),
  title: {
    default: titleDefault,
    template: `%s · ${siteMeta.name}`,
  },
  description,
  applicationName: `${siteMeta.name} Portfolio`,
  keywords: [
    "Tay Shofer",
    "software developer",
    "junior software engineer",
    "C++",
    "C",
    "React",
    "Next.js",
    "portfolio",
    "Computer Science",
  ],
  authors: [{ name: siteMeta.name, url: siteMeta.url }],
  creator: siteMeta.name,
  publisher: siteMeta.name,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: siteMeta.url,
    siteName: `${siteMeta.name} — Portfolio`,
    title: titleDefault,
    description,
    locale: siteMeta.locale,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteMeta.name} — ${siteMeta.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: titleDefault,
    description,
    images: ["/opengraph-image"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#070709",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bg text-fg">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:inline-flex focus:items-center focus:gap-2 focus:rounded-full focus:border focus:border-white/20 focus:bg-bg-elevated focus:px-4 focus:py-2 focus:text-sm focus:text-fg"
        >
          Skip to content
        </a>
        {children}
        <JsonLd />
      </body>
    </html>
  );
}
