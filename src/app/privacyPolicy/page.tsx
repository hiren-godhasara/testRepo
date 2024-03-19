
import PrivacyPolicy from '@/component/GeneralPages/PrivacyPolicy';
import React from 'react';
const information = require('../../data/details.json')

export const metadata = {
    title: information?.privacyPolicy?.title,
    description: information?.privacyPolicy?.description,
};
export default function Cart() {
    return (
        <div style={{ backgroundColor: 'white' }}>
            <PrivacyPolicy />
        </div>
    );
}



