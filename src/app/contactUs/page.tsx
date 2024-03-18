import ContactUs from '@/component/GeneralPages/ContactUs';
import React from 'react';
const information = require('../../data/details.json')

export const metadata = {
    title: information?.contactUs?.title,
    description: information?.contactUs?.description,
};

export default function Cart() {
    return (
        <div>
            <ContactUs />
        </div>
    );
}



