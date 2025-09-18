import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arvind Ramachandran R - Data Engineer Portfolio",
  description: "Entry-level Data Engineer passionate about building scalable data solutions, analytics, and modern data pipelines. Experienced in Python, SQL, Kafka, and cloud platforms.",
  keywords: ["data engineer", "data analytics", "python", "sql", "kafka", "aws", "portfolio"],
  authors: [{ name: "Arvind Ramachandran R" }],
  openGraph: {
    title: "Arvind Ramachandran R - Data Engineer Portfolio",
    description: "Entry-level Data Engineer passionate about building scalable data solutions",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
