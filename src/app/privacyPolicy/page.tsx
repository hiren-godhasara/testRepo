'use client'
import PrivacyPolicy from '@/component/GeneralPages/PrivacyPolicy';
import CopyRight from '@/component/copyRight/CopyRight';
import Footer from '@/component/footer/Footer';
import NutritionalGuide from '@/component/headerSection/Header';
import Header from '@/component/headerSection/Header';
import TagLine from '@/component/tagLine/TagLine';
import React from 'react';

export default function Cart() {
    return (
        <div>
            <TagLine />
            <Header />
            <PrivacyPolicy />
            <Footer />
            <CopyRight />

        </div>
    );
}



