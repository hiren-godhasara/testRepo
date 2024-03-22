const information = require('../../data/details.json')


export const metadata = {
    title: information?.login?.title,
    description: information?.login?.description,
    openGraph: {
        title: information?.login?.ogTitle,
        description: information?.login?.ogDescription,
        images: {
            url: information?.login?.ogImage,
            height: "630px",
            width: "1200px",
        },
    },
};

export default function LoginLayout({
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
