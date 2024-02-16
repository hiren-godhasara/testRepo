'use client'
import ReturnPolicy from '@/component/GeneralPages/ReturnPolicy';
import CopyRight from '@/component/copyRight/CopyRight';
import Footer from '@/component/footer/Footer';
import Header from '@/component/headerSection/Header';
import React from 'react';

export default function Cart() {
    return (
        <div>
            <Header />
            <ReturnPolicy />
            <Footer />
            <CopyRight />

        </div>
    );
}



