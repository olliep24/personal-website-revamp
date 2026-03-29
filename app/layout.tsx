import type { Metadata } from "next";
import "./globals.css";
import Nav from "./ui/nav";
import { inter } from '@/app/ui/fonts';

export const metadata: Metadata = {
  title: "oliverpetrick.me",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <Nav />
        <main className="mx-auto max-w-5xl px-6 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
