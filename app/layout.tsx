import "./globals.css";
import type { Metadata } from "next";
import { Roboto, Archivo_Black, Caveat } from "next/font/google";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
  display: "swap",
});

const archivoBl = Archivo_Black({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: "400",
  display: "swap",
});

const fontCaveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  weight: ["500", "700"],
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
  alternates: {
    canonical: "https://milon.bro.bd",
  },
  title: "Milon Mia — Full-Stack & AI Systems Developer",
  description:
    "Backend-focused Full-Stack Engineer building high-performance SaaS platforms, AI RAG memory systems, and scalable APIs for clients worldwide.",
  keywords: [
    "Full-Stack Developer",
    "Backend Developer",
    "AI Developer",
    "SaaS Engineer",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "RAG Architecture",
    "AWS",
    "Docker",
    "Milon Mia",
    "Software Engineer Bangladesh",
    "Freelance Full-Stack Developer",
  ],
  authors: [{ name: "Milon Mia", url: "https://milon.bro.bd" }],
  creator: "Milon Mia",
  publisher: "Milon Mia",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://milon.bro.bd",
    title: "Milon Mia — Full-Stack & AI Systems Developer",
    description:
      "Backend-focused Full-Stack Engineer building high-performance SaaS platforms, AI RAG memory systems, and scalable APIs for clients worldwide.",
    siteName: "Milon Mia Developer Portfolio",
    images: [
      {
        url: "/og-image.png?v=2",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Milon Mia — Full-Stack & AI Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Milon Mia — Full-Stack & AI Systems Developer",
    description:
      "Backend-focused Full-Stack Engineer building high-performance SaaS platforms and AI memory systems.",
    images: ["/og-image.png?v=2"],
    creator: "@devmilon923",
  },
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Milon Mia",
    url: "https://milon.bro.bd",
    image: "https://milon.bro.bd/og-image.png?v=2",
    jobTitle: "Full-Stack & AI Systems Engineer",
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
      "Full-Stack Web Development",
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
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Milon Mia Portfolio",
    url: "https://milon.bro.bd",
    author: {
      "@type": "Person",
      name: "Milon Mia",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Milon Mia — Full-Stack Software Engineering Services",
    url: "https://milon.bro.bd",
    image: "https://milon.bro.bd/og-image.png?v=2",
    priceRange: "$$$",
    areaServed: ["United States", "United Kingdom", "Australia", "Bangladesh", "India"],
    description:
      "Full-stack SaaS development, AI system integration, performance speedups, and cloud architecture contracts.",
  },
];


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body
        className={`${roboto.variable} ${archivoBl.variable} ${fontCaveat.variable} font-sans antialiased relative`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        {/* <BackgroundParticles /> */}
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
