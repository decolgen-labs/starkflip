import Head from 'next/head';
import { NextSeo, NextSeoProps } from 'next-seo';

import Favicon from '@/public/favicon.ico';
export type SEOHeadType = {
  title?: string;
  siteName?: string;
  description?: string;
  favicon?: string;
  image?: string;
};

export default function SEOHead({
  description,
  favicon,
  siteName,
  title,
  image,
  ...rest
}: SEOHeadType & NextSeoProps) {
  const defaultSiteData: SEOHeadType = {
    favicon: Favicon.src,
    title: 'Starknet Coinflip | Decolgen Labs',
    siteName: 'Starknet Coinflips',
    description:
      'Starknet Arcade Hub is a tribute to our NFT community and one of the largest mini-games hub for the Starknet Degens. The first product with upcominng Beta will be a CoinFlip game, allowing folks to place bets and multiply their $ETH holdings on Starknet.',
    image: 'https://coinflip.decolgenlabs.com/banner/banner.jpg',
  };
  const meta = {
    favicon: favicon || Favicon.src,
    title: title || 'Starknet Coinflip | Decolgen Labs',
    siteName: siteName || 'Starknet Coinflips',
    description:
      description ||
      'Starknet Arcade Hub is a tribute to our NFT community and one of the largest mini-games hub for the Starknet Degens. The first product with upcominng Beta will be a CoinFlip game, allowing folks to place bets and multiply their $ETH holdings on Starknet.',
    image: image || 'https://coinflip.decolgenlabs.com/banner/banner.jpg',
  };
  return (
    <>
      <Head>
        <link rel="icon" href={favicon || defaultSiteData.favicon} />
        <link rel="apple-touch-icon" type="image/png" href="/favicon.ico" />
        <meta property="twitter:image" content={meta.image} />
        <meta property="twitter:description" content={meta.description} />
      </Head>
      <NextSeo
        title={meta.title}
        titleTemplate={`%s | ${meta.siteName}`}
        description={meta.description}
        openGraph={{
          description: meta.description,
          images: [
            {
              url: meta.image || '',
            },
          ],
          type: 'website',
          locale: 'en_IE',
          siteName: meta.siteName,
          title: meta.title,
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
        {...rest}
      />
    </>
  );
}
