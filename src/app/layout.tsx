import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import Script from "next/script";
import Head from "next/head";
import TagLine from "@/component/tagLine/TagLine";
import Header from "@/component/headerSection/Header";
import Footer from '@/component/footer/Footer';
const information = require('../data/details.json');

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL('https://mydryfruit.com'),
  title: information?.homePage?.title,
  description: information?.homePage?.description,
  openGraph: {
    title: information?.homePage?.ogTitle,
    description: information?.homePage?.ogDescription,
    images: information?.homePage?.ogImage,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap" rel="stylesheet" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap" rel="stylesheet" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Protest+Riot&display=swap" rel="stylesheet" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&family=Protest+Riot&display=swap" rel="stylesheet" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Cedarville+Cursive&family=Dancing+Script:wght@400..700&family=Kalam:wght@300;400;700&family=Protest+Riot&display=swap" rel="stylesheet" />
          <meta name="viewport" content="initial-scale=1, maximum-scale=1" />
        </Head>
        <body style={{ backgroundColor: 'white' }} className={inter.className}>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <Script async src="https://cdn.jsdelivr.net/gh/stevenschobert/instafeed.js@2.0.0rc1/src/instafeed.min.js" />
      <Script src="https://accounts.google.com/gsi/client" async defer />


    </>


  );
}
