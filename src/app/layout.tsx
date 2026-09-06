import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";

import { getSiteSettings } from "@/sanity/lib/fetch";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const shortName = settings?.shortName || "ISDRC";
  const fullName = settings?.fullName || shortName;
  const description = settings?.description || undefined;

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
    ),
    title: {
      default: `${shortName} — ${fullName}`,
      template: `%s | ${shortName}`,
    },
    description,
    keywords: [
      "think tank",
      "inclusive development",
      "sustainable development",
      "policy research",
      "global south",
      shortName,
    ],
    authors: [{ name: shortName }],
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "en_GB",
      siteName: shortName,
      title: {
        default: `${shortName} — ${fullName}`,
        template: `%s | ${shortName}`,
      },
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: {
        default: `${shortName} — ${fullName}`,
        template: `%s | ${shortName}`,
      },
      description,
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#002d56",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="bg-background text-foreground flex min-h-full flex-col">
        {children}
      </body>
    </html>
  );
}
