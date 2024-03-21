import React from 'react';
const products = require('../../../data/products.json')
export async function generateMetadata({ params }: Props) {
    return {

        title: products[params?.product].title,
        description: products[params?.product].description,
        openGraph: {
            title: products[params?.product].ogTitle,
            description: products[params?.product].ogDescription,
            keywords: products[params?.product].keywords,
            images: {
                url: products[params?.product].image,
                height: 340,
                width: 640,
            },
        },
    }
}

type Props = {
    params: {
        product: any; id: string
    }
}

export default function ProductLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            {children}
        </div>
    );
}
