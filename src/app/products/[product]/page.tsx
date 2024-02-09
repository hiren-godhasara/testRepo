'use client'
import React from 'react';
import { DryFruitSliderForOrder } from '@/component/orderingDryFruits/OrderingDryFruits';
import { productData } from '@/data/CartDataForOrder';
import Footer from '@/component/footer/Footer';
import Header from '@/component/headerSection/Header';
import CopyRight from '@/component/copyRight/CopyRight';

export interface Product {
    name: string;
    origin: string;
    description: string;
    uniqueCharacteristic: string;
    nutritionalBenefits: string;
    distinctQualities: string;
}

interface CartProps {
    params: {
        product: keyof typeof productData;
    };
}

const Cart: React.FC<CartProps> = ({ params }) => {
    const product: any = productData[params.product];

    return (
        <div>
            <div id='header'><Header /></div>
            <DryFruitSliderForOrder data={product} />
            <Footer />
            <CopyRight />
        </div>
    );
}

export default Cart;


