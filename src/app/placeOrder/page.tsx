'use client'
import CopyRight from '@/component/copyRight/CopyRight';
import Footer from '@/component/footer/Footer';
import Header from '@/component/headerSection/Header';
import PlaceOrder from '@/component/orderAddress/PalceOrder';
import TagLine from '@/component/tagLine/TagLine';
import React from 'react';



export default function Home() {
    return (
        <div>
            {/* <TagLine /> */}
            <Header />
            <PlaceOrder />
            <Footer />
        </div >
    );
}
