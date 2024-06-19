'use client';
import Script from 'next/script';

const GoogleAnalytics = () => (
  <>
    <Script
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-F2272H29ZH"
    ></Script>

    <Script id="google-analytics" strategy="afterInteractive">
      {`     
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-F2272H29ZH');
        gtag('send', 'pageview');
        `}
    </Script>
  </>
);
export default GoogleAnalytics;
