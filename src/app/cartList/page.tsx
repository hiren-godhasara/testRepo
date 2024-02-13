'use client'
import React from 'react';
import CartList from '@/component/addToCartList/CartList';
import Header from '@/component/headerSection/Header';
import Footer from '@/component/footer/Footer';
import CopyRight from '@/component/copyRight/CopyRight';

export default function CartLists() {
    return (
        <div>
            <Header />
            {/* <Header /> */}

            <CartList />
            <Footer />
            <CopyRight />
        </div >
    );
}
