import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kitchen Lords",
  description: "A dinner chef planner for your favourite rommies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="emerald">
      <body className={inter.className}>
        <Providers>
            {children}
        </Providers>
      </body>
    </html>
  );
}
