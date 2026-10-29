import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import CookieConsent from "./components/CookieConsent";
import MetaPixel from "./components/MetaPixel";
import GoogleAnalytics from "./components/GoogleAnalytics";

export const metadata: Metadata = {
  title: "NextLayer Studio",
  description: "Formujeme budúcnosť digitálnych zážitkov",
  icons: {
    icon: '/fonts/logoajksn.png',
    shortcut: '/fonts/logoajksn.png',
    apple: '/fonts/logoajksn.png',
  },
  verification: {
    // Meta Business Manager → Brand Safety → Domains → nextlayer.studio
    other: {
      "facebook-domain-verification": "2kspx6g08gtcgdjczrk72etou92jb0",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <body className="font-sans antialiased">
        {children}
        <CookieConsent />
        <MetaPixel />
        <GoogleAnalytics />
        <Analytics />
      </body>
    </html>
  );
}
