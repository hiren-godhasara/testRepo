import React from 'react';
const information = require('../../data/details.json');

export const metadata = {
    title: information?.aboutUs?.title,
    description: information?.aboutUs?.description,
    image: information?.aboutUs?.image,
};
export default function AboutUsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <meta property="og:title" content={metadata.title} />
            <meta property="og:description" content={metadata.description} />
            <meta property="og:image" content={metadata.image} />
            <meta property="fb:app_id" content="Dry Fruit" />
            {children}
        </div>
    );
}

