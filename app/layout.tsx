import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Favicon from "@/app/favicon.ico";
import ProviderApp from "@/provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Starkflip | StarkArcade Hub",
  metadataBase: new URL("https://starkflip.starkarcade.com/"),
  description:
    "Starknet Arcade Hub is a tribute to our NFT community and one of the largest mini-games hub for the Starknet Degens. The first product with upcominng Beta will be a CoinFlip game, allowing folks to place bets and multiply their $ETH holdings on Starknet",
  icons: {
    icon: Favicon.src,
    shortcut: Favicon.src,
    apple: Favicon.src,
    other: { rel: "apple-touch-icon-precomposed", url: Favicon.src },
  },

  keywords: ["Starkflip", "What is Starkflip", "StarkArcade Hub"],
  openGraph: {
    title: "Starkflip | StarkArcade Hub",
    description:
      "Starknet Arcade Hub is a tribute to our NFT community and one of the largest mini-games hub for the Starknet Degens. The first product with upcominng Beta will be a CoinFlip game, allowing folks to place bets and multiply their $ETH holdings on Starknet",
    images: [
      {
        url: "https://starkflip.starkarcade.com/assets/banner/banner.png",
        width: 1200,
        height: 600,
        type: "image/png",
      },
    ],
    locale: "en_US",
    url: "https://starkflip.starkarcade.com",
    type: "website",
    emails: "karasbuilder@gmail.com",
    siteName: "Starkflip",
  },
  twitter: {
    title: "Starkflip | StarkArcade Hub",
    description:
      "Starknet Arcade Hub is a tribute to our NFT community and one of the largest mini-games hub for the Starknet Degens. The first product with upcominng Beta will be a CoinFlip game, allowing folks to place bets and multiply their $ETH holdings on Starknet",
    images: {
      url: "https://starkflip.starkarcade.com/assets/banner/banner.png",
      alt: "Starkflip Banner",
    },
    card: "player",
    site: "@starkarcade",
    creator: "@starkarcade",
    players: {
      playerUrl: "https://starkflip.starkarcade.com",
      streamUrl: "https://starkflip.starkarcade.com/assets/video/technical.mp4",
      width: 600,
      height: 600,
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="twitter:player"
          content="https://starkflip.starkarcade.com"
        />
      </head>
      <body className={inter.className}>
        <ProviderApp>{children}</ProviderApp>
      </body>
    </html>
  );
}
