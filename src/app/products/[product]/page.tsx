'use client'
import React from 'react';
import { usePathname } from 'next/navigation';
import { DryFruitSliderForOrder } from '@/component/orderingDryFruits/OrderingDryFruits';

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


    const desiredPart = usePathname();
    const parts = desiredPart.split('/products/');
    const paramId = parts[1];
    console.log(paramId);

    // const [productDetails, setProductDetails] = useState<Product | null>(null);

    // const token = getToken()

    // useEffect(() => {
    //     getProductDetails();
    // }, []);

    // const getProductDetails = async () => {
    //     const isOrderRedirecting = typeof window !== 'undefined' ? localStorage.getItem("isOrderRedirecting") : null;
    //     if (isOrderRedirecting === "true") {
    //         window.location.reload()
    //         localStorage.removeItem("isOrderRedirecting")
    //     }
    //     if (!paramId) return;
    //     try {
    //         const response = await fetch(`${process.env.BASE_URL}/s/product/${paramId}`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${token}`,
    //             },
    //         });

    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }

    //         const data = await response.json();
    //         setProductDetails(data.data[0]);
    //     } catch (error) {
    //         console.error('There was a problem fetching the data:', error);
    //     }
    // };

    return (
        <div style={{ backgroundColor: 'white' }}>
            {paramId && <DryFruitSliderForOrder data={paramId} />}
        </div>
    );
};

export default Cart;
