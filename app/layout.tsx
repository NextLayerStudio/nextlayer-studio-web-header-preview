import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
