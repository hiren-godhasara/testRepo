const information = require('../../data/details.json')

export const metadata = {
    title: information?.contactUs?.title,
    description: information?.contactUs?.description,
    keywords: information?.contactUs?.keywords,

    openGraph: {
        title: information?.contactUs?.ogTitle,
        description: information?.contactUs?.ogDescription,
        images: {
            url: information?.contactUs?.ogImage,
            height: 340,
            width: 640,
        },
    },
};

export default function contactUsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
        </>
    );
}
