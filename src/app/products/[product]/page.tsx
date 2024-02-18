'use client'
import React, { useEffect, useState } from 'react';
import { DryFruitSliderForOrder } from '@/component/orderingDryFruits/OrderingDryFruits';
import Footer from '@/component/footer/Footer';
import Header from '@/component/headerSection/Header';
import CopyRight from '@/component/copyRight/CopyRight';
import { useSearchParams } from 'next/navigation';
import { getToken } from '@/getLocalStroageToken';

export interface Product {
    _id: any;
    name: any;
    displayName: any;
    hsncode: any;
    imageUrl: any;
    price: any;
    weight: any;
    productCode: any;
    productDescription: any;

}

const Cart = () => {


    const [productDetails, setProductDetails] = useState<Product | null>(null);
    const paramId = useSearchParams().get('id');
    const token = getToken()
    useEffect(() => {
        getProductDetails();
    }, [paramId]);

    const getProductDetails = async () => {
        if (!paramId) return; // If paramId is not available, exit function

        try {
            const response = await fetch(`${process.env.BASE_URL}/s/product/${paramId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setProductDetails(data.data);
        } catch (error) {
            console.error('There was a problem fetching the data:', error);
        }
    };

    return (
        <div>
            <div id='header'><Header /></div>
            {productDetails && <DryFruitSliderForOrder data={productDetails} />}
            <Footer />
            <CopyRight />
        </div>
    );
};

export default Cart;
