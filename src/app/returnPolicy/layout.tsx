const information = require('../../data/details.json')

export const metadata = {
    title: information?.returnPolicy?.title,
    description: information?.returnPolicy?.description,
    openGraph: {
        title: information?.returnPolicy?.ogTitle,
        description: information?.returnPolicy?.ogDescription,
        images: {
            url: information?.returnPolicy?.ogImage,
            height: 340,
            width: 640,
        },
    },
};

export default function returnPolicyLayout({
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
