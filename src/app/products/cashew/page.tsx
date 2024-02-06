'use client'
import Header from '@/component/headerSection/Header';
import CartCashew from '../../../component/cartCashew/CartCashew';
import React from 'react';
import Footer from '@/component/footer/Footer';
import CopyRight from '@/component/copyRight/CopyRight';

export default function Cart() {

    return (
        <div>
            <div id='header'><Header /></div>
            <CartCashew />
            <Footer />
            <CopyRight />
        </div>
    );
}



