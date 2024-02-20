'use client'
import ReturnPolicy from '@/component/GeneralPages/ReturnPolicy';
import CopyRight from '@/component/copyRight/CopyRight';
import Footer from '@/component/footer/Footer';
import Header from '@/component/headerSection/Header';
import TagLine from '@/component/tagLine/TagLine';
import React from 'react';

export default function Cart() {
    return (
        <div>
            <TagLine />
            <Header />
            <ReturnPolicy />
            <Footer />
            <CopyRight />

        </div>
    );
}



