import React from 'react';
import TermsOfUse from '@/component/GeneralPages/TermsOfUse';
const information = require('../../data/details.json')

export const metadata = {
    title: information?.termsOfUses?.title,
    description: information?.termsOfUses?.description,
};
export default function Cart() {
    return (
        <div style={{ backgroundColor: 'white' }}>
            <TermsOfUse />
        </div>
    );
}



