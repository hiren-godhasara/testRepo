
'use client'
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Metadata } from 'next';
import { usePathname } from 'next/navigation';
import DryFruitSliderForOrder from '@/component/orderingDryFruits/OrderingDryFruits';
import productList from '../../../data/products.json'

const getProductDescription = async (paramId: string): Promise<string | any> => {
    try {
        const product = productList.productList.find((item: any) => item.displayName === paramId);
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
        console.log(products, 'products');
        const ogImages = products.imageUrl.map((imageUrl: any) => ({
            url: imageUrl.location,
            alt: products.name
        }));
        return {
            title: `My Dry Fruit-${paramId}`,
            description: products.productDescription,
            og: {
                title: `My Dry Fruit-${products.name}`,
                images: ogImages
            }
        };
    } catch (error) {
        console.error('Error generating metadata:', error);
        return {
            title: '',
            description: ''
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
                {metadata?.og?.images.slice(0, 4).map((image: any, index: any) => (
                    <meta key={index} property="og:image" content={image.url} />
                ))}
                <meta property="og:image:alt" content={metadata?.og?.title} />
            </Helmet>
            <Cart />
        </div>
    );
};

export default ProductPage;
