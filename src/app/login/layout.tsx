const information = require('../../data/details.json')


export const metadata = {
    title: information?.login?.title,
    description: information?.login?.description,
    openGraph: {
        title: information?.login?.ogTitle,
        description: information?.login?.ogDescription,
        images: {
            url: information?.login?.ogImage,
            height: "200px",
            width: "200px",
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
