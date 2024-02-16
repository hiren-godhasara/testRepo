'use client'
import CopyRight from '@/component/copyRight/CopyRight';
import Footer from '@/component/footer/Footer';
import Header from '@/component/headerSection/Header';
import PlaceOrder from '@/component/orderAddress/PalceOrder';
import React from 'react';



export default function Home() {
    return (
        <div>
            <Header />
            <PlaceOrder />
            <Footer />
            <CopyRight />
        </div >
    );
}
