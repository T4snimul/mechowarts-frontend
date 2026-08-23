import type { Metadata } from "next";
import { Geist_Mono, Playfair_Display, Inter } from "next/font/google";
import "@/styles/index.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";

const playfairDisplayHeading = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mechowarts",
  description: "A students portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={cn(
          "h-full",
          "antialiased",
          inter.variable,
          geistMono.variable,
          "font-sans",
          playfairDisplayHeading.variable,
        )}
      >
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
