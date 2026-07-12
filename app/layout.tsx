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
  title: "Raj Reddy",
  description:
    "Portfolio of Raj Reddy — software engineer, photographer, and computer science student at the University of Utah.",
  icons: {
    icon: [
      { url: "/assets/icons/icons8-r-key-15.png", sizes: "15x15", type: "image/png" },
      { url: "/assets/icons/icons8-r-key-25.png", sizes: "15x15", type: "image/png" },
      { url: "/assets/icons/icons8-r-key-50.png", sizes: "48x48", type: "image/png" },
      { url: "/assets/icons/icons8-r-key-100.png", sizes: "96x96", type: "image/png" },
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
