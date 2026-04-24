import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Script from "next/script"; // ✅ ADDED (Google Analytics)

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "PKR Writes – Books That Inspire & Educate",
  description: "Official author website of PKR. Explore books, self-publishing insights, and powerful ideas that drive growth and success.",
  keywords: ["PKR Writes", "self publishing", "amazon kdp", "writing tips", "books", "author"],

  // ✅ EXISTING GOOGLE VERIFICATION (UNCHANGED)
  verification: {
    google: "2T8hTwiUMq2lU3POpe_r9XmtUqNBv7lI31YFIjXhhUo",
  },

  openGraph: {
    title: "PKR Writes",
    description: "Books That Inspire & Educate",
    url: "https://pkrwrites.com",
    siteName: "PKR Writes",
    images: [
      {
        url: "/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "PKR Writes - Books That Inspire & Educate",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PKR Writes",
    description: "Books That Inspire & Educate",
    images: ["/images/og-home.jpg"],
    creator: "@pkrwrites",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" }
    ],
    apple: [
      { url: "/icon.png" }
    ]
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ✅ GOOGLE ANALYTICS START */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-X3ZS08H14F"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-X3ZS08H14F');
          `}
        </Script>
        {/* ✅ GOOGLE ANALYTICS END */}
      </head>

      <body className={`${inter.variable} ${playfair.variable}`}>
        {children}
      </body>
    </html>
  );
}