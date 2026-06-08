import type { Metadata } from "next";
import "./globals.css";
import CookieConsent from "./components/CookieConsent";

export const metadata: Metadata = {
  title: "NextLayer Studio",
  description: "Formujeme budúcnosť digitálnych zážitkov",
  icons: {
    icon: '/fonts/logoajksn.png',
    shortcut: '/fonts/logoajksn.png',
    apple: '/fonts/logoajksn.png',
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
      </body>
    </html>
  );
}
