import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import Script from "next/script";
import Head from "next/head";
import TagLine from "@/component/tagLine/TagLine";
import Header from "@/component/headerSection/Header";
import Footer from '@/component/footer/Footer';



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Dry Fruit",
  description: "Indulge in the exquisite taste of our natural premium California almonds, whole cashew nuts (kaju), and freshly roasted & salted pistachios (pista) available exclusively on our online shopping website. Our range offers the perfect combination of flavor, crunch, and nutrition. Choose from our wide selection of individual packs, including 200gm, 300gm, 500gm, and 1 kg, to suit your snacking needs. Looking for variety? Explore our tantalizing combos such as almond-cashew, almond-pistachio, cashew-pistachio, and the ultimate trifecta of almond-cashew-pistachio.Elevate your snacking experience with our premium dry fruits, carefully sourced and packed to retain their freshness and goodness. Shop now and treat yourself to the finest quality nuts delivered right to your doorstep.",
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
        {/* <body style={{ backgroundColor: 'white', fontFamily: ' "Montserrat", sans-serif' }} className={inter.className}> */}
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
