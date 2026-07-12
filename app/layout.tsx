import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-body",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Raj Reddy — Software Engineer",
  description:
    "Software engineer at L3Harris Technologies working on embedded signal processing and data infrastructure. Also a photographer.",
  openGraph: {
    title: "Raj Reddy — Software Engineer",
    description:
      "Software engineer at L3Harris Technologies working on embedded signal processing and data infrastructure. Also a photographer.",
    type: "website",
    images: ["/photos/wallpaper.jpg"],
  },
  icons: {
    icon: [
      { url: "/assets/icons/icons8-r-key-15.png", sizes: "15x15", type: "image/png" },
      { url: "/assets/icons/icons8-r-key-25.png", sizes: "25x25", type: "image/png" },
      { url: "/assets/icons/icons8-r-key-50.png", sizes: "50x50", type: "image/png" },
      { url: "/assets/icons/icons8-r-key-100.png", sizes: "100x100", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
