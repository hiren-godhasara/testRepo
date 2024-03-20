// 'use client'
// import React, { useState, useEffect } from 'react';
// import { Helmet } from 'react-helmet';
// import { usePathname } from 'next/navigation';
// import DryFruitSliderForOrder from '@/component/orderingDryFruits/OrderingDryFruits';

// const productData = require('../../../data/products.json');

// const Cart = () => {
//     const path = usePathname();
//     const parts = path.split('/products/');
//     const paramId = parts[1];
//     console.log(paramId);

//     const product = productData[paramId];

//     const metadata = {
//         title: `MY DRY FRUIT-${paramId}`,
//         description: product.description,
//         keywords: product.keywords,
//     };
//     console.log(metadata);


//     return (
//         <div style={{ backgroundColor: 'white' }}>
//             <Helmet>
//                 <title>{metadata?.title}</title>
//                 <meta name="description" content={metadata?.description} />
//                 <meta name="keywords" content={metadata?.keywords} />
//             </Helmet>
//             <DryFruitSliderForOrder />
//         </div>
//     );
// };

// export default Cart;




'use client'
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Metadata } from 'next';
import { usePathname } from 'next/navigation';
import DryFruitSliderForOrder from '@/component/orderingDryFruits/OrderingDryFruits';

const getProductDescription = async (paramId: string): Promise<string | any> => {
    try {
        const productData = require('../../../data/products.json');
        const product = productData[paramId]
        console.log(product);

        if (product) {
            return product;
        } else {
            return "Product not found";
        }
    } catch (error) {
        console.error(error);
        return "An error occurred while fetching product description";
    }
};

const generateMetaData = async (desiredPart: string): Promise<Metadata | any> => {
    try {
        const parts = desiredPart.split('/products/');
        const paramId = parts[1];
        const products = await getProductDescription(paramId);
        console.log(products);

        return {
            title: `Mydryfruit-${products.title}`,
            description: products.description,
            keywords: products.keywords

        };
    } catch (error) {
        console.error('Error generating metadata:', error);
        return {
            title: '',
            description: '',
            keywords: ''
        };
    }
};

const Cart = () => {
    return (
        <div style={{ backgroundColor: 'white' }}>
            <DryFruitSliderForOrder />
        </div>
    );
};

const ProductPage = () => {
    const desiredPart = usePathname();
    const [metadata, setMetadata] = useState<Metadata | any>(null);

    useEffect(() => {
        generateMetaData(desiredPart).then(meta => {
            setMetadata(meta);
        });
    }, [desiredPart]);
    console.log(metadata);

    return (
        <div>
            <Helmet>
                <title>{metadata?.title}</title>
                <meta property="og:type" content="website" />
                <link rel="canonical" href={`https://mydryfruit.com/${desiredPart}`} />
                <meta name="description" content={metadata?.description} />
                <meta name="keywords" content={metadata?.keywords} />
            </Helmet>
            <Cart />
        </div>
    );
};

export default ProductPage;
