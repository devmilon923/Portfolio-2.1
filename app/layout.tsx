import "./globals.css";
import type { Metadata } from "next";
import { Inter, Archivo_Black } from "next/font/google";

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
  },
  twitter: {
    card: "summary_large_image",
    title: "Milon Mia — Full-Stack Developer",
    description:
      "Backend-focused Full-Stack Developer specializing in AI-integrated systems and scalable infrastructure.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${archivoBl.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
