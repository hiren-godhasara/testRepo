// 'use client'
// import React, { useEffect } from 'react';
// import { DryFruitSliderForOrder } from '@/component/orderingDryFruits/OrderingDryFruits';
// import { productData } from '@/data/CartDataForOrder';
// import Footer from '@/component/footer/Footer';
// import Header from '@/component/headerSection/Header';
// import CopyRight from '@/component/copyRight/CopyRight';
// import { useSearchParams } from 'next/navigation';

// export interface Product {
//     name: string;
//     origin: string;
//     description: string;
//     uniqueCharacteristic: string;
//     nutritionalBenefits: string;
//     distinctQualities: string;
// }

// interface CartProps {
//     params: {
//         product: keyof typeof productData;
//     };
// }

// const Cart: React.FC<CartProps> = ({ params }) => {

//     const product: any = productData[params.product];
//     const paramId = useSearchParams().get('id')
//     console.log(paramId, 26);
//     useEffect(() => {
//         getProductDetails()
//     }, []);

//     const getProductDetails = async () => {
//         await fetch(`http://localhost:3001/s/product/${paramId}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },

//         })
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }


//                 return response.json();
//             })
//             .then(data => {
//                 console.log(data.data);

//             })

//             .catch(error => {
//                 console.error('There was a problem fetching the data:', error);
//             });
//     }


//     return (
//         <div>
//             <div id='header'><Header /></div>
//             <DryFruitSliderForOrder data={product} />
//             <Footer />
//             <CopyRight />
//         </div>
//     );
// }

// export default Cart;



















'use client'
import React, { useEffect, useState } from 'react';
import { DryFruitSliderForOrder } from '@/component/orderingDryFruits/OrderingDryFruits';
import Footer from '@/component/footer/Footer';
import Header from '@/component/headerSection/Header';
import CopyRight from '@/component/copyRight/CopyRight';
import { useSearchParams } from 'next/navigation';

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
    console.log("hi");

    const [productDetails, setProductDetails] = useState<Product | null>(null);
    const paramId = useSearchParams().get('id');

    useEffect(() => {
        getProductDetails();
    }, [paramId]);

    const getProductDetails = async () => {
        if (!paramId) return; // If paramId is not available, exit function

        try {
            const response = await fetch(`http://localhost:3001/s/product/${paramId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
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
