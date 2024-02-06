'use client'
import CartMedjoolDates from '@/component/cartMedjoolDates/CartMedjool';
import CopyRight from '@/component/copyRight/CopyRight';
import Footer from '@/component/footer/Footer';
import Header from '@/component/headerSection/Header';
import React from 'react';

export default function Cart() {
    return (
        <div>
            <div id='header'><Header /></div>
            <CartMedjoolDates />
            <Footer />
            <CopyRight />
        </div>
    );
}



