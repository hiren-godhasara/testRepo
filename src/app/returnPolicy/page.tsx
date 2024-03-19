import React from 'react';
import ReturnPolicy from '@/component/GeneralPages/ReturnPolicy';
const information = require('../../data/details.json')

export const metadata = {
    title: information?.returnPolicy?.title,
    description: information?.returnPolicy?.description,
};
export default function Cart() {
    return (
        <div style={{ backgroundColor: 'white' }}>
            <ReturnPolicy />
        </div>
    );
}



