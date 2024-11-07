import type { Metadata } from "next";
import '@/app/styles/globals.css';
import Navbar from "@/app/ui/navbar";
import { inter } from "@/app/fonts/fonts";

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
