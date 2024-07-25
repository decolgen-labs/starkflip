import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Favicon from "@/app/favicon.ico";
import ProviderApp from "@/provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Starkflip Game | StarkArcade Hub",
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
    siteName: "Starkflip Game",
  },
  twitter: {
    title: "Starkflip Game | StarkArcade Hub",
    description:
      "Starknet Arcade Hub is a tribute to our NFT community and one of the largest mini-games hub for the Starknet Degens. The first product with upcominng Beta will be a CoinFlip game, allowing folks to place bets and multiply their $ETH holdings on Starknet",
    images: {
      url: "https://starkflip.starkarcade.com/assets/banner/banner.png",
      alt: "Tetris Banner",
    },
    site: "https://starkflip.starkarcade.com",
    card: "player",
    creator: "@karas_builder",
    players: {
      playerUrl: "https://starkflip.starkarcade.com",
      streamUrl: "https://starkflip.starkarcade.com",
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
        <meta name="twitter:card" content="player" />
        <meta name="twitter:site" content="@starkarcade" />
        <meta name="twitter:title" content="Starkflip | StarkArcade Hub" />
        <meta
          name="twitter:description"
          content="Starknet Arcade Hub is a tribute to our NFT community and one of the largest mini-games hub for the Starknet Degens. The first product with upcominng Beta will be a CoinFlip game, allowing folks to place bets and multiply their $ETH holdings on Starknet"
        />
        <meta
          name="twitter:player"
          content="https://starkflip.starkarcade.com/"
        />
        <meta name="twitter:player:width" content="360" />
        <meta name="twitter:player:height" content="560" />
        <meta
          name="twitter:image"
          content="https://starkflip.starkarcade.com/banner/banner.jpg"
        />
      </head>
      <body className={inter.className}>
        <ProviderApp>{children}</ProviderApp>
      </body>
    </html>
  );
}
