'use client'
import PrivacyPolicy from '@/component/GeneralPages/PrivacyPolicy';
import CopyRight from '@/component/copyRight/CopyRight';
import Footer from '@/component/footer/Footer';
import Header from '@/component/headerSection/Header';
import React from 'react';

export default function Cart() {
    return (
        <div>
            <Header />
            <PrivacyPolicy />
            <Footer />
            <CopyRight />

        </div>
    );
}



