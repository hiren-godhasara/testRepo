'use client'
import React from 'react';
import BestSelling from "../component/bestSellingSection/BestSellingProducts";
import Header from "../component/headerSection/Header";
import HomePage from "../component/homePageSection/HomePage";
import cardStyles from '../component/card/Card.module.scss'
import Card from "../component/card/Card";
import AllProductSlider from "../component/allProductsSlider/AllProductsSlider";
import Storing from "../component/storeDetails/StoreDetails";
import Info from "../component/outletInfo/OutletInfo";
import ReviewSlider from "../component/customerReviews/CustomerReviews";
import GiftCombo from "../component/giftCombos/GiftCombo";
import InstagramFeeds from "../component/instagramFeed/InstagramFeed";
import HashtagInstagramFeeds from "../component/instagramFeed/HashtagInstagramFeed";
import Footer from '../component/footer/Footer';
import RegisterForm from '@/component/registrationUser/Register';
import LoginForm from '@/component/registrationUser/Login';
import OrderAddress from '@/component/orderAddress/OrderAddress';
import Invoices from '@/component/invoice/Invoice';
import products from '@/data/CardData';
import CartList from '@/component/addToCartList/CartList';

export default function Home() {
  return (
    <div>
      <div id='header'><Header /></div>
      <HomePage />
      <div id='products'><BestSelling /></div>
      <Card />

      {/* <div id='allProductSlider'><AllProductSlider /></div> */}

      <div id='about'><Info /></div>

      {/* <div id='store'><Storing /></div> */}

      {/* <div id='reviews'><ReviewSlider /></div> */}
      <div id='gifting'> <GiftCombo /></div>

      <InstagramFeeds />
      <HashtagInstagramFeeds />
      <Footer />
      <OrderAddress />
      <Invoices />
      <CartList />
    </div >
  );
}