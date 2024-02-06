'use client'
import CartPistachio from '@/component/cartPistachio/CartPistachio';
import CopyRight from '@/component/copyRight/CopyRight';
import Footer from '@/component/footer/Footer';
import Header from '@/component/headerSection/Header';
import React from 'react';

export default function Cart() {
    return (
        <div>
            <div id='header'><Header /></div>
            <CartPistachio />
            <Footer />
            <CopyRight />
        </div>
    );
}



