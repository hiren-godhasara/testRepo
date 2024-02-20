'use client'
import ContactUs from '@/component/GeneralPages/ContactUs';
import Footer from '@/component/footer/Footer';
import Header from '@/component/headerSection/Header';
import TagLine from '@/component/tagLine/TagLine';
import React from 'react';

export default function Cart() {
    return (
        <div>
            <TagLine />

            <Header />
            <ContactUs />
            <Footer />
        </div>
    );
}


