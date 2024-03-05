'use client'
import React, { useEffect, useState } from 'react';
import { DryFruitSliderForOrder } from '@/component/orderingDryFruits/OrderingDryFruits';
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
    const productIdFromLocal = typeof window !== 'undefined' ? localStorage.getItem('productId') : null;

    useEffect(() => {
        getProductDetails();
    }, []);

    const getProductDetails = async () => {
        const isOrderRedirecting = typeof window !== 'undefined' ? localStorage.getItem("isOrderRedirecting") : null;
        if (isOrderRedirecting === "true") {
            window.location.reload()
            localStorage.removeItem("isOrderRedirecting")
        }
        if (!productIdFromLocal) return;
        try {
            const response = await fetch(`${process.env.BASE_URL}/s/product/${productIdFromLocal}`, {
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
        <div style={{ backgroundColor: 'white' }}>
            {productDetails && <DryFruitSliderForOrder data={productDetails} />}
        </div>
    );
};

export default Cart;
