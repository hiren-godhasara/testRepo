import React from 'react';
import BestSelling from "../component/bestSellingSection/BestSellingProducts";
import HomePage from "../component/homePageSection/HomePage";
import Card from "../component/card/Card";
import Info from "../component/outletInfo/OutletInfo";
import ReviewSlider from "../component/customerReviews/CustomerReviews";
import GiftCombo from "../component/giftCombos/GiftCombo";
import GoogleLogin from '@/component/googleLogin/GoogleLogin';
import { GoogleOAuthProvider } from '@react-oauth/google';
import InstagramFeeds from '@/component/instagramFeed/InstagramFeed';
import HashtagInstagramFeeds from '@/component/instagramFeed/HashtagInstagramFeed';


export default function Home() {

  return (
    <div style={{ backgroundColor: 'white' }}>

      <GoogleOAuthProvider clientId="1027485564712-nm6m9eifqopa3eqq2pnmj83vljb0e74c.apps.googleusercontent.com">
        <GoogleLogin />
        <HomePage />
        <div id='products'><BestSelling /></div>
        <Card />
        <div id='about'><Info /></div>
        <div id='reviews'><ReviewSlider /></div>
        <div id='gifting'> <GiftCombo /></div>

        {/* <InstagramFeeds />
        <HashtagInstagramFeeds /> */}
        {/* <Invoices /> 
        {/* <SlidingCarousel /> */}
      </GoogleOAuthProvider>
    </div >
  );
}