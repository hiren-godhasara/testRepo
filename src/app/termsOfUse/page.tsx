'use client'
import TermsOfUse from '@/component/GeneralPages/TermsOfUse';
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
            <TermsOfUse />
            <Footer />
        </div>
    );
}



