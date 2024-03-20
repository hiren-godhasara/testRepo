import React from 'react';
import Head from 'next/head';
const information = require('../../data/details.json');

export const metadata = {
    title: information?.aboutUs?.title,
    description: information?.aboutUs?.description,
    image: information?.aboutUs?.image,
    openGraph: {
        title: information?.aboutUs?.ogTitle,
        description: information?.aboutUs?.ogDescription,
        image: information?.aboutUs?.ogImage,
    },
};




export default function AboutUsLayout({
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
