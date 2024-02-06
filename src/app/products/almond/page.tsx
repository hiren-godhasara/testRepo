'use client'
import Header from '@/component/headerSection/Header';
import CartAlmond from '../../../component/cartAlmond/CartAlmomd';
import React from 'react';
import Footer from '@/component/footer/Footer';
import CopyRight from '@/component/copyRight/CopyRight';

export default function Cart() {
    return (
        <div>
            <div id='header'><Header /></div>
            <CartAlmond />
            <Footer />
            <CopyRight />
        </div>
    );
}



