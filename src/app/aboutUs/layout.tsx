import React from 'react';
const information = require('../../data/details.json');

export const metadata = {
    title: information?.aboutUs?.title,
    description: information?.aboutUs?.description,
    openGraph: {
        title: information?.aboutUs?.ogTitle,
        description: information?.aboutUs?.ogDescription,
        images: information?.aboutUs?.ogImage,
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
