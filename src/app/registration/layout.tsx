const information = require('../../data/details.json')


export const metadata = {
    title: information?.registration?.title,
    description: information?.registration?.description,
    openGraph: {
        title: information?.registration?.ogTitle,
        description: information?.registration?.ogDescription,
        images: {
            url: information?.registration?.ogImage,
            height: 340,
            width: 640,
        },
    },
};

export default function RegisterLayout({
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
