import "./globals.css";
import type { Metadata } from "next";
import { Inter, Archivo_Black, Playfair_Display, Caveat } from "next/font/google";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const archivoBl = Archivo_Black({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: "400",
  display: "swap",
});

const fontSerif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const fontCaveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Enable Incremental Static Regeneration (ISR) - Revalidate layout every 1 day (86,400 seconds)
export const revalidate = 86400;

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  metadataBase: new URL("https://milon.bro.bd"),
  title: "Milon Mia — Full-Stack Developer",
  description:
    "Backend-focused Full-Stack Developer specializing in AI-integrated systems, scalable backends, and international client delivery. Expert in React, Next.js, Node.js, PostgreSQL, and AWS.",
  keywords: [
    "Full-Stack Developer",
    "Backend Developer",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "AI Developer",
    "Bangladesh Developer",
    "Freelance Developer",
  ],
  authors: [{ name: "Milon Mia", url: "https://milon.bro.bd" }],
  creator: "Milon Mia",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://milon.bro.bd",
    title: "Milon Mia — Full-Stack Developer",
    description:
      "Backend-focused Full-Stack Developer specializing in AI-integrated systems and scalable infrastructure.",
    siteName: "Milon Mia Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Milon Mia — Full-Stack & AI Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Milon Mia — Full-Stack Developer",
    description:
      "Backend-focused Full-Stack Developer specializing in AI-integrated systems and scalable infrastructure.",
    images: ["/og-image.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: "Milon Mia",
    jobTitle: "Full-Stack Software Engineer",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jamalpur",
      addressCountry: "BD",
    },
    description:
      "Backend-focused Full-Stack Developer building AI-integrated systems, RAG pipelines, and scalable cloud infrastructure.",
    knowsAbout: [
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "TypeScript",
      "Docker",
      "AWS",
      "AI Integration",
      "RAG Architecture",
      "Backend-focused Full-Stack Development",
    ],
    sameAs: [
      "https://github.com/devmilon923",
      "https://www.linkedin.com/in/devmilon",
      "https://twitter.com/devmilon923",
      "https://www.facebook.com/devmilon923",
      "https://www.instagram.com/devmilon923",
      "https://www.fiverr.com/devmilon923",
      "https://www.upwork.com/freelancers/~01bd608f5c07cb250e?mp_source=share",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body
        className={`${inter.variable} ${archivoBl.variable} ${fontSerif.variable} ${fontCaveat.variable} font-sans antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
