import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://your-domain.com"),
  title: {
    default: "CR0C Clan Portal",
    template: "%s | CR0C Clan Portal",
  },
  description:
    "Official CR0C World of Tanks clan website. Explore clan statistics, check player requirements, review clan vehicles, browse clan mods, and apply through Discord.",
  keywords: [
    "CR0C",
    "CR0C clan",
    "World of Tanks",
    "World of Tanks clan",
    "WoT clan",
    "clan statistics",
    "player requirements",
    "clan vehicles",
    "World of Tanks mods",
    "Discord application",
  ],
  applicationName: "CR0C Clan Portal",
  authors: [{ name: "CR0C Clan" }],
  creator: "CR0C Clan",
  publisher: "CR0C Clan",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CR0C Clan Portal",
    description:
      "Explore clan statistics, check player eligibility, see clan vehicles, browse mods, and join CR0C through Discord.",
    url: "/",
    images: [
      {
        url: "/croc.jpg",
        width: 1200,
        height: 630,
        alt: "CR0C Clan Portal",
      },
    ],
    siteName: "CR0C Clan Portal",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CR0C Clan Portal",
    description:
      "Clan statistics, player checks, clan vehicles, mods, and Discord applications for CR0C.",
    images: ["/croc.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable}`}
      >
        <Header />
        {children}
        {modal}
        <Footer />
      </body>
    </html>
  );
}
