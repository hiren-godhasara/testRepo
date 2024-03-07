'use client'
import React, { useEffect, useState } from 'react';
import { DryFruitSliderForOrder } from '@/component/orderingDryFruits/OrderingDryFruits';
import { useSearchParams, usePathname } from 'next/navigation';
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
    const desiredPart = usePathname();
    const parts = desiredPart.split('/products/');
    const paramId = parts[1];

    const token = getToken()

    useEffect(() => {
        getProductDetails();
    }, []);

    const getProductDetails = async () => {
        const isOrderRedirecting = typeof window !== 'undefined' ? localStorage.getItem("isOrderRedirecting") : null;
        if (isOrderRedirecting === "true") {
            window.location.reload()
            localStorage.removeItem("isOrderRedirecting")
        }
        if (!paramId) return;
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
            setProductDetails(data.data[0]);
        } catch (error) {
            console.error('There was a problem fetching the data:', error);
        }
    };

    return (
        <div style={{ backgroundColor: 'white' }}>
            {productDetails && <DryFruitSliderForOrder data={productDetails} />}
        </div>
    );
};

export default Cart;
