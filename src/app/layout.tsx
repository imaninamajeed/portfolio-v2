import type { Metadata } from "next";
import localFont from "next/font/local";
import '@/app/styles/globals.css';
import Navbar from "@/app/ui/navbar";
import { inter } from "@/app/fonts/fonts";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Imanina's Portfolio",
    default: "Imanina's Portfolio",
  },
  description: "A collection of projects and experiences.",
  metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Navbar />

        {children}
      </body>
    </html>
  );
}
