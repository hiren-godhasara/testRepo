'use client'
import CopyRight from '@/component/copyRight/CopyRight';
import Footer from '@/component/footer/Footer';
import Header from '@/component/headerSection/Header';
import OrderList from '@/component/orderList/OrderList';
import TagLine from '@/component/tagLine/TagLine';
import React from 'react';



export default function Home() {
    return (
        <div>
            <TagLine />

            <Header />
            <OrderList />
            <Footer />
            <CopyRight />
        </div >
    );
}
