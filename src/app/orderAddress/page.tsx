'use client'
import CopyRight from '@/component/copyRight/CopyRight';
import Footer from '@/component/footer/Footer';
import Header from '@/component/headerSection/Header';
import OrderAddress from '@/component/orderAddress/OrderAddress';
import React from 'react';



export default function Home() {
    return (
        <div>
            <Header />
            <OrderAddress />
            <Footer />
            <CopyRight />
        </div >
    );
}