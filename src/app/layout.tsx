import type { Metadata, Viewport } from "next";
import { Outfit, Oxanium } from "next/font/google";

import { Ambient } from "@/components/portfolio/ambient";
import { CaseDialog } from "@/components/portfolio/case-dialog";
import { Footer } from "@/components/portfolio/footer";
import { Header } from "@/components/portfolio/header";
import { MobileTabBar } from "@/components/portfolio/mobile-tab-bar";
import { PointerEffects } from "@/components/portfolio/pointer-effects";
import { ScrollEffects } from "@/components/portfolio/scroll-effects";
import { SITE, SKILLS } from "@/data/portfolio";
import { THEME_COLOR, THEME_INIT_SCRIPT } from "@/lib/theme";

import "./globals.css";

const oxanium = Oxanium({ subsets: ["latin"], variable: "--font-oxanium", display: "swap" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: `%s — ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "technology",
  keywords: [
    SITE.name,
    "Imanina",
    "frontend developer",
    "product engineer",
    "UI/UX developer",
    "React developer",
    "Next.js developer",
    "TypeScript",
    "dashboard design",
    "data visualisation",
    "portfolio",
    "Malaysia",
    "Kuala Lumpur",
    ...SKILLS.flatMap((g) => g.skills.map((s) => s.name)),
  ],
  alternates: { canonical: "/" },
  formatDetection: { telephone: false, email: false, address: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    type: "profile",
    locale: "en_MY",
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    url: "/",
    firstName: "Imanina",
    lastName: "Majeed",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
};

export const viewport: Viewport = {
  themeColor: THEME_COLOR.dark,
  colorScheme: "dark light",
  viewportFit: "cover", // lets the mobile tab bar respect the home-indicator area
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${oxanium.variable} ${outfit.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* Applies a saved theme before first paint, so there is no flash */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Ambient />
        <Header />
        {children}
        <Footer />
        <MobileTabBar />
        <CaseDialog />
        <PointerEffects />
        <ScrollEffects />
      </body>
    </html>
  );
}
