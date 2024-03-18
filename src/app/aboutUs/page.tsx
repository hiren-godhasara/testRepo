import AboutUs from '@/component/GeneralPages/AboutUs';
import React from 'react';


const information = require('../../data/details.json')

export const metadata = {
    title: information?.aboutUs?.title,
    description: information?.aboutUs?.description,
};

export default function Cart() {
    return (
        <div style={{ backgroundColor: 'white' }}>
            <AboutUs />
        </div>
    );
}



